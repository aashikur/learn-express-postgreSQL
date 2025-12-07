import express from 'express'
import {Pool} from "pg";
const app = express()
const port = 5000


// parser
app.use(express.json());
// for form data
// app.use(express.urlencoded());
const pool = new Pool({
  connectionString: `postgresql://neondb_owner:npg_t5E4KqlfFSwA@ep-dark-sun-ah7v9k1e-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
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
    `)
}

initDB();

app.get('/', (req, res) => {
  res.send('Server Created!')
})


app.post('/', (req, res) =>{
  console.log(req.body);

  res.status(201).json({
    success: true,
    message: 'post request successful'
  })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
