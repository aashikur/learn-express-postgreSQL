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

  } catch (error){
    console.error('Error connecting to the database', (error as Error).message);
  }
}

export default initDB;