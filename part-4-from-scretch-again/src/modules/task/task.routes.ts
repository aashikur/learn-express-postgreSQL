import { Request, Response, Router } from "express";
import { taskController } from "./task.controller";

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    await taskController.createTask(req, res);
});


export const taskRouter = router;