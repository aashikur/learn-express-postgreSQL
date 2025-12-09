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

const getAllUsers =  async (req: Request, res: Response) => {
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

export const userController = {
    createUser,
    getAllUsers,
}