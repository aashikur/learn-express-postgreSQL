import express from 'express'
import { Pool } from "pg";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), ".env") })
const app = express()
const port = 5000


// parser
app.use(express.json());
// for form data
// app.use(express.urlencoded());
const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STRING}`
})


const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT,
    phone VARCHAR(15),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(), 
    updated_at TIMESTAMP DEFAULT NOW()
    )
    `);

  await pool.query(`
      CREATE TABLE IF NOT EXISTS todos(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON
        DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        due_date TIMESTAMP
      )
      `)
}

initDB();


app.get('/', (req, res) => {
  res.send('Server Created!')
})


app.post('/users', async (req, res) => {
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`, [name, email]
    );

    console.log(result);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result.rows[0],
    })

  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: 'Duplicate email not allowed',
    })
  }

})

app.get('/users', async (req, res) => {
  try {
    const request = await pool.query(`SELECT * FROM users`)
    res.status(200).json({
      success: true,
      data: request.rows,
    })
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
    })
  }
})

app.get('/users/:id', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [req.params.id]);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      }
      )
    } else {
      res.status(200).json({
        success: true,
        MESSAGE: 'USER FETCH SUCCESSFULLY',
        data: result.rows[0],
      })
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
    })
  }
})

app.put('/users/:id', async (req, res) => {
  try {
    
    const result = await pool.query(
    `UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *`, [req.body.name, req.body.email, req.params.id]);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      }
      )
    } else {
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: result.rows[0],
      })
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update user',
    })
  }
})

app.delete('/users/:id', async (req, res) => {
  try {
    
    const result = await pool.query(
    `DELETE FROM users WHERE id = $1 RETURNING *`, [req.params.id]);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      }
      )
    } else {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
        data: result.rows,
      })
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
    })
  }
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
