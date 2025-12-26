# 📝 SQL Queries Reference

## **USER QUERIES**

### 1. Create User
```sql
INSERT INTO users (name, email, password, phone)
VALUES ($1, $2, $3, $4)
RETURNING *
```

```typescript
const createUser = async (name, email, password, phone) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, password, phone)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, email, password, phone]
  )
  return result.rows[0]
}
```

### 2. Get All Users
```sql
SELECT * FROM users WHERE is_active = true
```

```typescript
const getAllUsers = async () => {
  const result = await pool.query(
    `SELECT * FROM users WHERE is_active = true`
  )
  return result.rows
}
```

### 3. Get User by ID
```sql
SELECT * FROM users WHERE id = $1
```

```typescript
const getUserById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE id = $1`,
    [id]
  )
  return result.rows[0]
}
```

### 4. Get User by Email
```sql
SELECT * FROM users WHERE email = $1
```

```typescript
const getUserByEmail = async (email) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  )
  return result.rows[0]
}
```

### 5. Update User
```sql
UPDATE users SET name = $1, phone = $2, updated_at = NOW()
WHERE id = $3
RETURNING *
```

```typescript
const updateUser = async (id, name, phone) => {
  const result = await pool.query(
    `UPDATE users SET name = $1, phone = $2, updated_at = NOW()
     WHERE id = $3
     RETURNING *`,
    [name, phone, id]
  )
  return result.rows[0]
}
```

### 6. Deactivate User (Soft Delete)
```sql
UPDATE users SET is_active = false, updated_at = NOW()
WHERE id = $1
RETURNING *
```

```typescript
const deactivateUser = async (id) => {
  const result = await pool.query(
    `UPDATE users SET is_active = false, updated_at = NOW()
     WHERE id = $1
     RETURNING *`,
    [id]
  )
  return result.rows[0]
}
```

### 7. Activate User
```sql
UPDATE users SET is_active = true, updated_at = NOW()
WHERE id = $1
RETURNING *
```

### 8. Delete User (Hard Delete - CASCADE)
```sql
DELETE FROM users WHERE id = $1
```

```typescript
const deleteUser = async (id) => {
  const result = await pool.query(
    `DELETE FROM users WHERE id = $1`,
    [id]
  )
  return result.rowCount // 0 = not found, 1 = deleted
}
```

---

## **ORDER QUERIES**

### 1. Create Order
```sql
INSERT INTO orders (user_id, order_number, total_price, status)
VALUES ($1, $2, $3, $4)
RETURNING *
```

```typescript
const createOrder = async (userId, orderNumber, totalPrice) => {
  const result = await pool.query(
    `INSERT INTO orders (user_id, order_number, total_price, status)
     VALUES ($1, $2, $3, 'pending')
     RETURNING *`,
    [userId, orderNumber, totalPrice]
  )
  return result.rows[0]
}
```

### 2. Get All Orders for User
```sql
SELECT * FROM orders WHERE user_id = $1 AND is_active = true
ORDER BY created_at DESC
```

```typescript
const getUserOrders = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM orders 
     WHERE user_id = $1 AND is_active = true
     ORDER BY created_at DESC`,
    [userId]
  )
  return result.rows
}
```

### 3. Get Order with Items
```sql
SELECT 
  o.*,
  json_agg(json_build_object('id', oi.id, 'product_name', oi.product_name, 'quantity', oi.quantity, 'unit_price', oi.unit_price, 'total_price', oi.total_price)) as items
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
WHERE o.id = $1
GROUP BY o.id
```

### 4. Update Order Status
```sql
UPDATE orders SET status = $1, updated_at = NOW()
WHERE id = $2
RETURNING *
```

```typescript
const updateOrderStatus = async (orderId, status) => {
  const result = await pool.query(
    `UPDATE orders SET status = $1, updated_at = NOW()
     WHERE id = $2
     RETURNING *`,
    [status, orderId]
  )
  return result.rows[0]
}
```

### 5. Deactivate Order
```sql
UPDATE orders SET is_active = false, updated_at = NOW()
WHERE id = $1
RETURNING *
```

### 6. Calculate Order Total (Auto-calculate)
```sql
UPDATE orders SET total_price = (
  SELECT SUM(total_price) FROM order_items WHERE order_id = $1
), updated_at = NOW()
WHERE id = $1
RETURNING *
```

---

## **ORDER ITEMS QUERIES**

### 1. Add Item to Order
```sql
INSERT INTO order_items (order_id, product_name, quantity, unit_price, total_price)
VALUES ($1, $2, $3, $4, $5)
RETURNING *
```

```typescript
const addOrderItem = async (orderId, productName, quantity, unitPrice) => {
  const totalPrice = quantity * unitPrice
  const result = await pool.query(
    `INSERT INTO order_items (order_id, product_name, quantity, unit_price, total_price)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [orderId, productName, quantity, unitPrice, totalPrice]
  )
  return result.rows[0]
}
```

### 2. Get Order Items
```sql
SELECT * FROM order_items WHERE order_id = $1
```

```typescript
const getOrderItems = async (orderId) => {
  const result = await pool.query(
    `SELECT * FROM order_items WHERE order_id = $1`,
    [orderId]
  )
  return result.rows
}
```

### 3. Update Item
```sql
UPDATE order_items 
SET quantity = $1, total_price = $1 * unit_price, updated_at = NOW()
WHERE id = $2
RETURNING *
```

### 4. Delete Item
```sql
DELETE FROM order_items WHERE id = $1
```

---

## **TODO QUERIES**

### 1. Create Todo
```sql
INSERT INTO todos (user_id, title, description, due_date)
VALUES ($1, $2, $3, $4)
RETURNING *
```

### 2. Get User Todos
```sql
SELECT * FROM todos 
WHERE user_id = $1 AND is_active = true
ORDER BY due_date ASC
```

### 3. Mark Todo Complete
```sql
UPDATE todos SET completed = true, updated_at = NOW()
WHERE id = $1
RETURNING *
```

### 4. Get Overdue Todos
```sql
SELECT * FROM todos
WHERE user_id = $1 AND completed = false AND due_date < NOW()
ORDER BY due_date ASC
```

---

## **AGGREGATE QUERIES**

### Count Active Users
```sql
SELECT COUNT(*) as total FROM users WHERE is_active = true
```

### Total Revenue
```sql
SELECT SUM(total_price) as revenue FROM orders WHERE status = 'completed'
```

### User Order Count
```sql
SELECT user_id, COUNT(*) as order_count 
FROM orders 
GROUP BY user_id
ORDER BY order_count DESC
```

### Top Products
```sql
SELECT product_name, SUM(quantity) as total_sold
FROM order_items
GROUP BY product_name
ORDER BY total_sold DESC
```
