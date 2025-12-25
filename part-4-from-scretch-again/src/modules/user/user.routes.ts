import { Request, Response, Router } from 'express'
import { UserController } from './user.controller'

const router = Router()

// POST /user - Create a new user
router.post('/', async (req: Request, res: Response) => {
  await UserController.createUser(req, res)
})


export const userRouter = router