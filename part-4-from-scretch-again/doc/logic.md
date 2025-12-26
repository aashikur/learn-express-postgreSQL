# 🧠 Business Logic & Methods

## **User Business Logic**

### 1. Create User with Validation

```typescript
export class UserService {
  static async createUser(payload: CreateUserRequest) {
    // Validate input
    if (!payload.name || !payload.email || !payload.password) {
      throw new Error('Name, email, and password are required')
    }

    // Check if email already exists
    const existingUser = await UserModel.getUserByEmail(payload.email)
    if (existingUser) {
      throw new Error('Email already registered')
    }

    // Hash password (in real app)
    const hashedPassword = await bcrypt.hash(payload.password, 10)

    // Create user
    const user = await UserModel.createUser({
      ...payload,
      password: hashedPassword
    })

    return {
      status: 'success',
      message: 'User created successfully',
      data: user
    }
  }
}
```

### 2. Delete User (Soft Delete - Recommended)

```typescript
static async deactivateUser(userId: number) {
  try {
    // Check if user exists
    const user = await UserModel.getUserById(userId)
    if (!user) {
      return { status: 'error', message: 'User not found' }
    }

    // Soft delete - just mark as inactive
    const result = await pool.query(
      `UPDATE users SET is_active = false, updated_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [userId]
    )

    return {
      status: 'success',
      message: 'User deactivated successfully',
      data: result.rows[0]
    }
  } catch (error) {
    return { status: 'error', message: (error as Error).message }
  }
}
```

### 3. Delete User (Hard Delete - CASCADE)

```typescript
static async deleteUserPermanently(userId: number) {
  try {
    // Hard delete - removes user and all related orders/todos
    const result = await pool.query(
      `DELETE FROM users WHERE id = $1`,
      [userId]
    )

    if (result.rowCount === 0) {
      return { status: 'error', message: 'User not found' }
    }

    return {
      status: 'success',
      message: 'User deleted permanently',
      data: { deletedId: userId }
    }
  } catch (error) {
    return { status: 'error', message: (error as Error).message }
  }
}
```

### 4. Activate/Deactivate User

```typescript
static async toggleUserStatus(userId: number) {
  try {
    // Get current user
    const user = await UserModel.getUserById(userId)
    if (!user) {
      return { status: 'error', message: 'User not found' }
    }

    // Toggle is_active status
    const newStatus = !user.is_active
    const result = await pool.query(
      `UPDATE users SET is_active = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING *`,
      [newStatus, userId]
    )

    return {
      status: 'success',
      message: `User ${newStatus ? 'activated' : 'deactivated'}`,
      data: result.rows[0]
    }
  } catch (error) {
    return { status: 'error', message: (error as Error).message }
  }
}
```

---

## **Order Business Logic**

### 1. Create Order with Auto-calculated Total

```typescript
static async createOrder(userId: number, items: OrderItem[]) {
  try {
    // Validate user exists
    const user = await UserModel.getUserById(userId)
    if (!user) {
      return { status: 'error', message: 'User not found' }
    }

    // Generate unique order number
    const orderNumber = `ORD-${Date.now()}`

    // Calculate total price
    const totalPrice = items.reduce((sum, item) => 
      sum + (item.quantity * item.unitPrice), 0
    )

    // Create order
    const orderResult = await pool.query(
      `INSERT INTO orders (user_id, order_number, total_price, status)
       VALUES ($1, $2, $3, 'pending')
       RETURNING *`,
      [userId, orderNumber, totalPrice]
    )

    const order = orderResult.rows[0]

    // Add items to order
    for (const item of items) {
      const itemTotal = item.quantity * item.unitPrice
      await pool.query(
        `INSERT INTO order_items (order_id, product_name, quantity, unit_price, total_price)
         VALUES ($1, $2, $3, $4, $5)`,
        [order.id, item.productName, item.quantity, item.unitPrice, itemTotal]
      )
    }

    return {
      status: 'success',
      message: 'Order created successfully',
      data: order
    }
  } catch (error) {
    return { status: 'error', message: (error as Error).message }
  }
}
```

### 2. Recalculate Order Total

```typescript
static async recalculateOrderTotal(orderId: number) {
  try {
    // Calculate sum of all items
    const result = await pool.query(
      `UPDATE orders 
       SET total_price = (
         SELECT COALESCE(SUM(total_price), 0) FROM order_items 
         WHERE order_id = $1
       ),
       updated_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [orderId]
    )

    return {
      status: 'success',
      message: 'Order total updated',
      data: result.rows[0]
    }
  } catch (error) {
    return { status: 'error', message: (error as Error).message }
  }
}
```

### 3. Auto-Update Order Status (Time-based)

```typescript
// Run this as a scheduled job (every hour)
static async autoCompleteOrders() {
  try {
    // Complete orders that were created 7 days ago
    const result = await pool.query(
      `UPDATE orders 
       SET status = 'completed', updated_at = NOW()
       WHERE status = 'pending' 
       AND created_at < NOW() - INTERVAL '7 days'
       AND is_active = true
       RETURNING *`
    )

    console.log(`✅ Auto-completed ${result.rowCount} orders`)
    return result.rows
  } catch (error) {
    console.error('❌ Error auto-completing orders:', error)
  }
}
```

### 4. Cancel Order if Not Completed

```typescript
static async cancelOrder(orderId: number) {
  try {
    // Check if order is pending
    const order = await pool.query(
      `SELECT * FROM orders WHERE id = $1`,
      [orderId]
    )

    if (!order.rows[0]) {
      return { status: 'error', message: 'Order not found' }
    }

    if (order.rows[0].status !== 'pending') {
      return { 
        status: 'error', 
        message: 'Can only cancel pending orders' 
      }
    }

    // Cancel the order
    const result = await pool.query(
      `UPDATE orders SET status = 'cancelled', updated_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [orderId]
    )

    return {
      status: 'success',
      message: 'Order cancelled successfully',
      data: result.rows[0]
    }
  } catch (error) {
    return { status: 'error', message: (error as Error).message }
  }
}
```

---

## **Todo Business Logic**

### 1. Create Todo with Auto Date

```typescript
static async createTodo(userId: number, title: string, description?: string, dueDate?: Date) {
  try {
    // Set default due date to 7 days from now if not provided
    const defaultDueDate = dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const result = await pool.query(
      `INSERT INTO todos (user_id, title, description, due_date)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, title, description || null, defaultDueDate]
    )

    return {
      status: 'success',
      message: 'Todo created successfully',
      data: result.rows[0]
    }
  } catch (error) {
    return { status: 'error', message: (error as Error).message }
  }
}
```

### 2. Auto-Mark Overdue Todos

```typescript
static async markOverdueTodos() {
  try {
    // Get all overdue incomplete todos
    const result = await pool.query(
      `UPDATE todos 
       SET is_active = false, updated_at = NOW()
       WHERE completed = false 
       AND due_date < NOW()
       AND is_active = true
       RETURNING *`
    )

    console.log(`⚠️ Marked ${result.rowCount} todos as overdue`)
    return result.rows
  } catch (error) {
    console.error('❌ Error marking overdue:', error)
  }
}
```

### 3. Complete Todo

```typescript
static async completeTodo(todoId: number) {
  try {
    const result = await pool.query(
      `UPDATE todos SET completed = true, updated_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [todoId]
    )

    if (!result.rows[0]) {
      return { status: 'error', message: 'Todo not found' }
    }

    return {
      status: 'success',
      message: 'Todo completed',
      data: result.rows[0]
    }
  } catch (error) {
    return { status: 'error', message: (error as Error).message }
  }
}
```

### 4. Get User Stats

```typescript
static async getUserStats(userId: number) {
  try {
    const [
      totalTodos,
      completedTodos,
      overdueTodos,
      totalOrders,
      completedOrders
    ] = await Promise.all([
      pool.query(`SELECT COUNT(*) FROM todos WHERE user_id = $1 AND is_active = true`, [userId]),
      pool.query(`SELECT COUNT(*) FROM todos WHERE user_id = $1 AND completed = true`, [userId]),
      pool.query(`SELECT COUNT(*) FROM todos WHERE user_id = $1 AND due_date < NOW() AND completed = false`, [userId]),
      pool.query(`SELECT COUNT(*) FROM orders WHERE user_id = $1`, [userId]),
      pool.query(`SELECT COUNT(*) FROM orders WHERE user_id = $1 AND status = 'completed'`, [userId])
    ])

    return {
      status: 'success',
      data: {
        totalTodos: parseInt(totalTodos.rows[0].count),
        completedTodos: parseInt(completedTodos.rows[0].count),
        overdueTodos: parseInt(overdueTodos.rows[0].count),
        totalOrders: parseInt(totalOrders.rows[0].count),
        completedOrders: parseInt(completedOrders.rows[0].count)
      }
    }
  } catch (error) {
    return { status: 'error', message: (error as Error).message }
  }
}
```

---

## **Scheduled Jobs (Use node-cron)**

```typescript
import cron from 'node-cron'

// Run every day at 2 AM
cron.schedule('0 2 * * *', async () => {
  console.log('Running scheduled jobs...')
  await OrderService.autoCompleteOrders()
  await TodoService.markOverdueTodos()
})
```

---

## **Error Handling Pattern**

```typescript
static async safeOperation(operation: () => Promise<any>) {
  try {
    const result = await operation()
    return {
      status: 'success',
      data: result
    }
  } catch (error) {
    return {
      status: 'error',
      message: (error as Error).message
    }
  }
}
```

---

## **Summary**

| Operation | Method | Details |
|-----------|--------|---------|
| Create User | `createUser()` | Validates, hashes password |
| Delete User | `deactivateUser()` | Soft delete (recommended) |
| Delete User | `deleteUserPermanently()` | Hard delete (cascades) |
| Toggle Status | `toggleUserStatus()` | Active ↔ Inactive |
| Create Order | `createOrder()` | Auto-calculates total |
| Recalculate Total | `recalculateOrderTotal()` | Sum all items |
| Auto-Complete | `autoCompleteOrders()` | Time-based automation |
| Cancel Order | `cancelOrder()` | Only pending orders |
| Create Todo | `createTodo()` | Auto-date: +7 days |
| Mark Overdue | `markOverdueTodos()` | Auto-deactivate expired |
| Complete Todo | `completeTodo()` | Mark as done |
| User Stats | `getUserStats()` | Get summary metrics |
