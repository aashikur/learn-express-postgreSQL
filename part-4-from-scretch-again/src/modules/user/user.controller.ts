import { Request, Response } from 'express'
import { UserServices } from './user.service';



const createUser = async (req: Request, res: Response) => {
    // Logic to create a new user
    try {
        const result = await UserServices.createUser(req.body);
        console.log('Created User:', result.rows[0]);

        if (!result) {
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
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: "Duplicate email not allowed"
        })
    }

}

const getAllUsers = async (req: Request, res: Response) => {
    const request = await UserServices.getAllUsers();
    console.log('All Users:', request.rows);
    // Logic to get all users
    res.status(200).send({
        status: 'success',
        data: request.rows,
        meta: {
            totalUser: request.rowCount,
        }
    });
}

const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id as string;

    const result = await UserServices.getUserById(userId);
    res.status(200).send({
        status: 'success',
        data: result.rows[0]
    })
}

const updateUserById = async (req: Request, res: Response) => {
    const result = await UserServices.updateUserById(req.params.id as string, req.body);
    res.status(200).send({
        status: 'success',
        data: result.rows[0]
    })
}

const deleteUserById = async (req: Request, res: Response) => {
    const request  = await UserServices.deleteUserById(req.params.id as string);

    if (request === null) {
        return res.status(404).send({
            status: 'error',
            message: 'User not found'
        });
    }

    res.status(200).send({
        status: 'User Deleted Successfully.',
        data: request.rows[0]
    });
}

export const UserController = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
}