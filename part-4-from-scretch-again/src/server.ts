import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import config from './config'
import initDB, { pool } from './config/db'
import { userRouter } from './modules/user/user.routes'
import { taskRouter } from './modules/task/task.routes'
dotenv.config()

const app = express()
app.use(express.json());


initDB();


app.use('/user', userRouter);
app.use('/task', taskRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Our Server is up and running!')
})



app.use((req: Request, res: Response) => {
  res.status(404).send({
    status: '404',
    route: req.originalUrl,
    message: 'Route not found'
  })
})

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`)
})


