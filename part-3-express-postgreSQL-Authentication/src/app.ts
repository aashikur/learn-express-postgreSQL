import express, { NextFunction, Request, Response } from 'express'
import { config } from './config'
import initDB, { pool } from './config/db'
import { todosRoutes } from './modules/todo/todos.routes';
import { userRoutes } from './modules/user/user.routes';
import { authRoutes } from './modules/auth/auth.router';

const app = express()
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


app.use('/users', userRoutes);
app.use('/todos', todosRoutes);
app.use('/auth', authRoutes)


// 404 route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path
  })
})


export default app;