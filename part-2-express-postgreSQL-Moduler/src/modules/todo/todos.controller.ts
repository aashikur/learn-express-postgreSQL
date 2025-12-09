import { Request, Response } from "express";
import { pool } from "../../config/db";
import { todosService } from "./todos.service";
import { app } from "../../server";

const postTodos = async (req: Request, res: Response) => {
  try {

    const result = await todosService.postTodos(req, res);

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: result.rows[0]
    })
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create todo',
    })
  }
}


const getTodosById = async (req: Request, res: Response) => {
  try {
    const result = await todosService.getTodosById(req, res);

    if (result.rows.length === 0) {
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
  catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch todo',
    })
  }
}

const getAllTodos = async (req: Request, res: Response) => {
  try {
    const result = await todosService.getAllTodos(req, res);

    res.status(200).json({
      success: true,
      data: result.rows
    })
  }
  catch (error) {
    res.status(500).json(
      {
        success: false,
        message: 'Fail to get the todos'
      }
    )
  }
}

const updateTodos = async (req: Request, res: Response) => {
  try {
    const result = await todosService.updateTodos(req, res);

    if (result.rows.length === 0) {
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
}

const deleteTodos = async (req: Request, res: Response) => {
  try {
    const result = await todosService.deleteTodos(req, res);
    if (result.rowCount === 0) {
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
}

export const todosController = {
  postTodos,
  getTodosById,
  getAllTodos,
  updateTodos,
  deleteTodos,
}

