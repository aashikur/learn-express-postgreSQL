# 📋 Database Table Structure

## **Users Table**

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  phone VARCHAR(15),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Column Details:
- **id** - Auto-incrementing primary key
- **name** - User's full name (required)
- **email** - Unique email address (required)
- **password** - Hashed password (required)
- **phone** - Optional phone number
- **is_active** - User status (true = active, false = inactive)
- **created_at** - Account creation timestamp (auto-set)
- **updated_at** - Last update timestamp (auto-set)

---

## **Orders Table**

```sql
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  total_price DECIMAL(10, 2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'pending', -- pending, completed, cancelled
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Column Details:
- **id** - Auto-incrementing primary key
- **user_id** - Links to users table (delete order if user deleted)
- **order_number** - Unique order ID (e.g., ORD-001)
- **total_price** - Calculated from order items
- **status** - Order state (pending/completed/cancelled)
- **is_active** - Can deactivate orders
- **created_at** - Order creation time
- **updated_at** - Last modification time

---

## **Order Items Table**

```sql
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id) ON DELETE CASCADE,
  product_name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL, -- quantity * unit_price
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Column Details:
- **id** - Auto-incrementing primary key
- **order_id** - Links to orders table
- **product_name** - Name of product
- **quantity** - How many items ordered
- **unit_price** - Price per item
- **total_price** - quantity × unit_price (calculated)
- **created_at** - Item creation time
- **updated_at** - Last update time

---

## **Todos Table**

```sql
CREATE TABLE IF NOT EXISTS todos (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  due_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Column Details:
- **id** - Auto-incrementing primary key
- **user_id** - Links to users table
- **title** - Todo title (required)
- **description** - Detailed description
- **completed** - Is task done? (true/false)
- **is_active** - Can be deactivated
- **due_date** - When todo is due
- **created_at** - Creation timestamp
- **updated_at** - Last update timestamp

---

## **Table Relationships**

```
users (1) ──→ (many) orders
users (1) ──→ (many) todos
orders (1) ──→ (many) order_items
```

### Cascade Rules:
- If user is **deleted** → All their orders & todos are **deleted**
- If order is **deleted** → All order items are **deleted**

---

## **Creating All Tables Together**

```typescript
const initDB = async () => {
  try {
    // Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone VARCHAR(15),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)

    // Orders table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        order_number VARCHAR(50) UNIQUE NOT NULL,
        total_price DECIMAL(10, 2) DEFAULT 0,
        status VARCHAR(20) DEFAULT 'pending',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)

    // Order items table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INT REFERENCES orders(id) ON DELETE CASCADE,
        product_name VARCHAR(255) NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        unit_price DECIMAL(10, 2) NOT NULL,
        total_price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)

    // Todos table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT false,
        is_active BOOLEAN DEFAULT true,
        due_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)

    console.log('✅ All tables created successfully!')
  } catch (error) {
    console.error('❌ Error creating tables:', error)
  }
}
```

---

## **Quick Reference**

| Table | Purpose | Key Column |
|-------|---------|-----------|
| users | Store user accounts | id, email |
| orders | Store customer orders | id, user_id |
| order_items | Store items in orders | id, order_id |
| todos | Store tasks/reminders | id, user_id |
