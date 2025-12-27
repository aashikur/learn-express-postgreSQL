import { Request, Response, Router } from 'express'
import { UserController } from './user.controller'

const router = Router()


// app.use("/user", userRouter )
router.post('/', async (req: Request, res: Response) => {
  await UserController.createUser(req, res)
})

router.get('/', async (req: Request, res: Response) => {
    await UserController.getAllUsers(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
    await UserController.getUserById(req, res)
})

router.put('/:id', async (req: Request, res: Response) => {
    await UserController.updateUserById(req, res);
})

router.delete('/:id', async (req: Request, res: Response) => {
   await UserController.deleteUserById(req, res);
})

export const userRouter = router