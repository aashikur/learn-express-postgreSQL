import { Router } from "express";
import { pool } from "../../config/db";

const router = Router();

router.post('/', async (req, res) => {
    const { name, email } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`, [name, email]
        );

        console.log(result);
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: result.rows[0],
        })

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Duplicate email not allowed',
        })
    }

})

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