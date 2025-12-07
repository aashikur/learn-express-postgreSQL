import express from 'express'
import {Pool} from "pg";
const app = express()
const port = 5000

const pool = new Pool({
  connectionString: `postgresql://neondb_owner:npg_t5E4KqlfFSwA@ep-dark-sun-ah7v9k1e-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
})

// parser
app.use(express.json());
// for form data
// app.use(express.urlencoded());


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
