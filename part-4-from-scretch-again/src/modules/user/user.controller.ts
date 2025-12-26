import { Request, Response } from 'express'
import { UserServices } from './user.service';



const createUser = async (req: Request, res: Response) => {
    // Logic to create a new user
    const result = await UserServices.createUser(req.body);

    if(!result) {
        res.status(500).send({
            status: 'error',
            message: 'Failed to create user'
        })
    } else {
        res.status(201).send({
            status: 'success',
            message: 'User created successfully',
            data: result.rows[0]
        })
    }

}

const getAllUsers = async (req: Request, res: Response) => {
    // Logic to get all users
    res.send('Get all users endpoint')
}

export const UserController = {
    createUser,
    getAllUsers,
}