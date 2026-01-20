import { Request, Response } from "express";
import { userServices } from "./user.service";


const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.createUser(req.body);

    console.log(result);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result.rows[0],
    })
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: 'Duplicate email not allowed',
    })
  }

}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const request = await userServices.getAllUsers();

    res.status(200).json({
      success: true,
      data: request.rows,
    })
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
    })
  }
}


const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getSingleUser(req.params.id as string); // type assertion

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      }
      )
    } else {
      res.status(200).json({
        success: true,
        MESSAGE: 'USER FETCH SUCCESSFULLY',
        data: result.rows[0],
      })
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
    })
  }
}


const updateUser = async (req: Request, res: Response) => {
  try {

    const result = await userServices.updateUser(
      req.body.name,
      req.body.email,
      req.params.id as string
    );

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
}


const deleteUser = async (req: Request, res: Response) => {
  try {

    const result = await userServices.deleteUser(
      req.params.id as string
    );

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
}

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
}