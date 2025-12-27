import { pool } from "../../config/db"

const createTask = async (payload: Record<string, unknown>) => {

    const { title, description, status, user_id, due_date } = payload;

    const result = await pool.query(`
        INSERT INTO Tasks (title, description, status, user_id, due_date)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING * `, [title, description, status, user_id, due_date]);

        console.log('New Task Created:', result.rows[0]);


    return result;
}


export const TaskServices = {
    createTask,
}