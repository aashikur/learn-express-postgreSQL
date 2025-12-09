import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";


const createUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;

    try {
        const result = await userServices.createUser(name, email);

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
        const result = await userServices.getSingleUser(req.params.id as string ); // type assertion

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


export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
}