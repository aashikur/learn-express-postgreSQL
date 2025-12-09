import { Request, Response } from "express";
import { pool } from "../../config/db";


const postTodos = async (req: Request, res: Response) => {
    const { id, title } = req.body;
    const result = await pool.query(`
          INSERT INTO todos (id, title) VALUES ($1, $2) RETURNING *`, [id, title]);
    return result
}

const getTodosById = async (req: Request, res: Response) => {
    const result = await pool.query(`SELECT * FROM  todos WHERE id = $1`, [req.params.id]);

    return result;
}

const getAllTodos = async (req: Request, res: Response) => {
    const result = await pool.query(`SELECT * FROM todos`);
    return result;
}

const updateTodos = async (req: Request, res: Response) => {
    const result = await pool.query(`
      UPDATE todos SET title = $1 WHERE id = $2 RETURNING *`, [req.body.title, req.params.id]);
    return result;
}

const deleteTodos = async (req: Request, res: Response) => {
    const result = await pool.query(`
      DELETE FROM todos WHERE id = $1 RETURNING *`, [req.params.id]);
    return result;
}

export const todosService = {
    postTodos,
    getTodosById,
    getAllTodos,
    updateTodos,
    deleteTodos,
}