import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import config from './config'
import initDB, { pool } from './config/db'
dotenv.config()

const app = express()

initDB();

app.post('/user', async (req: Request, res: Response) => {

  const result = await pool.query(`
    INSERT INTO users (name, email, password, phone) VALUES ('ASHIK', 'mdaashikur2@gmail.com', 'password123', '1234567890')
    RETURNING *
    `)

  res.send({ 
    status: 'success',
    message: 'User created successfully', 
    data: result.rows[0] })
})



app.get('/', (req: Request, res: Response) => {
  res.send('Our Server is up and running!')
})

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`)
})
