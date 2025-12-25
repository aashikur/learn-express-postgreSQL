import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

// localhost:3000/auth/register
router.post('/login',authController.loginUser);



export const authRoutes = router;