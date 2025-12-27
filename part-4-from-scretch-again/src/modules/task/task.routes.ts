import { Request, Response, Router } from "express";
import { taskController } from "./task.controller";

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    await taskController.createTask(req, res);
});

router.get('/', async (req: Request, res: Response) => {
   await taskController.getAllTasks(req, res);
})

router.get('/user/:userId', async (req: Request, res: Response) => {
    await taskController.getTasksByUserId(req, res);
})


router.get('/:id', async (req: Request, res: Response) => {
    await taskController.getTaskById(req, res);
});


router.patch('/:id', async (req: Request, res: Response) => {
    await taskController.updateTaskById(req, res);
});

router.delete('/:id', async (req: Request, res: Response) => {
    await taskController.deleteTaskById(req, res);
});


export const taskRouter = router;