import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: config.connection_string
})

const initDB = async () => {
  try {
    const client =  await pool.query(`
      
      CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      address VARCHAR(255) DEFAULT NULL,
      password VARCHAR(100) NOT NULL,
      phone VARCHAR(15) DEFAULT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )`)

      await pool.query(`
        ALTER TABLE users
        ADD COLUMN IF NOT EXISTS address VARCHAR(255) DEFAULT NULL
        `)




    // todo 
    const client2 = await pool.query(`
        CREATE TABLE IF NOT EXISTS tasks (
        
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT, 
        status VARCHAR(50) DEFAULT 'pending', -- pending, in-progress, completed
        priority VARCHAR(50) DEFAULT 'medium', -- low, medium, high
        is_active BOOLEAN DEFAULT true,
        due_date TIMESTAMP DEFAULT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )`)



  } catch (error){
    console.error('Error connecting to the database', (error as Error).message);
  }
}

export default initDB;