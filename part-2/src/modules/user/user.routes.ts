import { Router } from "express";
import { pool } from "../../config/db";
import { userController } from "./user.controller";

const router = Router();

router.post('/', userController.createUser)

router.get('/', async (req, res) => {
    try {
        const request = await pool.query(`SELECT * FROM users`)
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
});


export const userRouter = router;