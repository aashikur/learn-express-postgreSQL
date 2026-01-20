import express, { NextFunction, Request, Response } from 'express'
import { config } from './config'
import initDB, { pool } from './config/db'
import { userRouter } from './modules/user/user.routes';
import { todosRoutes } from './modules/todo/todos.routes';

export const app = express()
const port = config.port;

// parser
app.use(express.json());
// for form data
// app.use(express.urlencoded());

// Initialize Database
initDB();

// routes
app.get('/', (req, res) => {
  res.send('Server Created!')
})

// user routes
 app.use('/users', userRouter);

// app.get('/users/:id', userRouter);
// app.put('/users/:id',)
// app.delete('/users/:id',)
// app.use('/todos', todosRouter)

// todo routes
app.use('/todos', todosRoutes);



// 404 route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
