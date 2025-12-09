import express, { NextFunction, Request, Response } from 'express'
import { config } from './config'
import initDB, {pool} from './config/db'
import logger from './middleware/logger';
import { userRouter } from './modules/user/user.routes';

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


// user routes
app.use('/users', userRouter);



app.get('/users/:id', userRouter);

app.put('/users/:id', async (req, res) => {
  try {
    
    const result = await pool.query(
    `UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *`, [req.body.name, req.body.email, req.params.id]);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      }
      )
    } else {
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: result.rows[0],
      })
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update user',
    })
  }
})

app.delete('/users/:id', async (req, res) => {
  try {
    
    const result = await pool.query(
    `DELETE FROM users WHERE id = $1 RETURNING *`, [req.params.id]);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      }
      )
    } else {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
        data: result.rows,
      })
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
    })
  }
})





// todo routes will go here
app.post('/todos', async (req, res) => {
  const {id, title} = req.body;
  try {
    const result = await pool.query(`
      INSERT INTO todos (id, title) VALUES ($1, $2) RETURNING *`, [id, title]);
      res.status(201).json({
        success: true,
        message: 'Todo created successfully',
        data: result.rows[0]
      })
  }
  catch(error){
    res.status(500).json({
      success: false,
      message: 'Failed to create todo',
    })
  }
});


// Get all todos
app.get('/todos', async (req, res) => {
  try{
    const result = await pool.query(`SELECT * FROM todos`);
    res.status(200).json({
      success: true,
      data: result.rows
    })
  } 
  catch(error){
    res.status(500).json(
      {
        success: false,
        message: 'Fail to get the todos'
      }
    )
  }
})

// get todo by id
app.get('/todos/:id', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM  todos WHERE id = $1`, [req.params.id]);

    if(result.rows.length === 0){
      res.status(404).json({
        success: false,
        message: 'Todo not found',
      })
    } else {
      res.status(200).json({
        success: true,
        message: 'Todo fetched successfully',
        data: result.rows[0]
      })
    }
  }
  catch(error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch todo',
    })
  }
})


// update todo
app.put('/todos/:id', async (req, res) => {
  try {
    const result = await pool.query(`
      UPDATE todos SET title = $1 WHERE id = $2 RETURNING *`, [req.body.title, req.params.id]);

      if(result.rows.length === 0){
        res.status(404).json({
          success: false,
          message: 'Todo not found'
        })
      } else {
        res.status(200).json({
          success: true,
          message: 'Todo updated successfully',
          data: result.rows[0]
        })
      }
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update todo'
    })
  }
})



// delete todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const result = await pool.query(`
      DELETE FROM todos WHERE id = $1 RETURNING *`, [req.params.id]);

      if(result.rowCount === 0) {
        res.status(404).json({
          success: false,
          message: 'Todo not found'
        })
      } else {
        res.status(200).json({
          success: true,
          message: 'Todo deleted successfully',
          data: result.rows[0]
        })
      }

      
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete todo'
    })
  }
})




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
