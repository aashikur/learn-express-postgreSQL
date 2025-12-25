import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import config from './config'
dotenv.config()

const app = express()


app.post('/user', (req : Request, res : Response) => {
  res.send('User endpoint')
})


app.get('/', (req : Request, res : Response) => {
  res.send('Our Server is up and running!')
})

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`)
})
