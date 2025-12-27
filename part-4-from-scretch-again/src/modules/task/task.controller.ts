import { Request, Response } from "express";
import { TaskServices } from "./task.service";


const createTask = async (req: Request, res: Response) => {
    const result = await TaskServices.createTask(req.body as any);

    return res.status(201).send({
        status: 'success',
        message: 'Task Created Successfully',
        data: result.rows[0]
    });
}



export const taskController = {
    createTask,
}