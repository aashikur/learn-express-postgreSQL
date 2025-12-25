import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import config from './config'
import initDB, { pool } from './config/db'
import { userRouter } from './modules/user/user.routes'
dotenv.config()

const app = express()
app.use(express.json());


initDB();


app.use('/user', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Our Server is up and running!')
})

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`)
})


