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

export const userRouter = router;