import { Request, Response } from "express";
import { TaskServices } from "./task.service";


const createTask = async (req: Request, res: Response) => {
    try {
        const result = await TaskServices.createTask(req.body as any);

        return res.status(201).send({
            status: 'success',
            message: 'Task Created Successfully',
            data: result.rows[0]
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: (error as Error).message
        });
    }
}


const getAllTasks = async (req: Request, res: Response) => {
    try {
        const result = await TaskServices.getAllTask();

        return res.status(200).send({
            status: 'success',
            meta: `Total Tasks: ${result.rowCount}`,
            data: result.rows
        })
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: (error as Error).message
        });
    }
}



const getTasksByUserId = async (req: Request, res: Response) => {
    try {
        const user_id = req.params.userId as string;
        const result = await TaskServices.getAllTaskByUserId(user_id);

        return res.status(200).send({
            status: 'success',
            meta: `Total Tasks By User: ${result.rowCount}`,
            data: result.rows
        })
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: (error as Error).message
        });
    }
}



const getTaskById = async (req: Request, res: Response) => {
    try {

        const id = req.params.id as string;
        const result = await TaskServices.getTaskById(id);

        if (result === null) {
            return res.status(400).send({
                status: 'error',
                message: 'Task not found',
                data: []
            })
        }

        return res.status(200).send({
            status: 'success',
            data: result.rows[0]
        })
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: (error as Error).message
        });
    }
}



const updateTaskById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const result = await TaskServices.updateTaskById(id, req.body);


        if (result === null) {
            return res.status(400).send({
                status: 'error',
                message: 'Task not found',
                data: []
            })
        }

        return res.status(200).send({
            status: 'success',
            message: 'Task Updated Successfully',
            data: result.rows[0]
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: (error as Error).message
        });
    }

}



const deleteTaskById = async (req: Request, res: Response) => {

    try {
        const id = req.params.id as string;
        const result = await TaskServices.deleteTaskById(id);

        if (result === null) {
            return res.status(400).send({
                status: 'error',
                message: 'Task not found',
                data: []
            })
        }

        return res.status(200).send({
            status: 'success',
            message: 'Task Deleted Successfully',
            data: result.rows[0]
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: (error as Error).message
        });
    }

}


export const taskController = {
    createTask,
    getAllTasks,
    getTasksByUserId,
    getTaskById,
    updateTaskById,
    deleteTaskById
}