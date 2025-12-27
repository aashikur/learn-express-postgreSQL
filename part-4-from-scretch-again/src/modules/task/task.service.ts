import { pool } from "../../config/db"

const createTask = async (payload: Record<string, unknown>) => {

    const { title, description, status, user_id, due_date } = payload;


    let AutoDueDate = due_date;
    if (!due_date) {
        const due = new Date();
        due.setDate(due.getDate() + 7);
        AutoDueDate = due;
    }

    const result = await pool.query(`
        INSERT INTO Tasks (title, description, status, user_id, due_date)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING * `, [title, description, status, user_id, AutoDueDate]);

    console.log('New Task Created:', result.rows[0]);


    return result;
}

const getAllTask = async () => {
    const result = await pool.query(`SELECT * FROM tasks ORDER BY due_date ASC`);
    return result;
}

const getAllTaskByUserId = async (user_id: string) => {
    const result = await pool.query(`
        SELECT * FROM tasks WHERE user_id = $1
    `, [user_id]);
    return result;
}


const getTaskById = async (id: string) => {
    const result = await pool.query(`
    SELECT * FROM tasks WHERE id = $1`, [id]);

    if (result.rowCount === 0) {
        return null;
    }

    return result;
}




const updateTaskById = async (id: string, payload: Record<string, unknown>) => {
    const { title, description, status, priority, due_date } = payload;


    let flg = 0;

    if (payload?.title) {
        await pool.query(`UPDATE tasks SET title = $1 WHERE id = $2 RETURNING *`, [title, id]);
        flg++;
    }
    if (payload?.description) {
        await pool.query(`UPDATE tasks SET description = $1 WHERE id = $2`, [description, id]);
        flg++;

    }
    if (payload?.status) {
        await pool.query(`UPDATE tasks SET status = $1 WHERE id = $2`, [status, id]);
        flg++;
    }
    if (payload?.priority) {
        await pool.query(`UPDATE tasks SET priority = $1 WHERE id = $2`, [priority, id]);
        flg++;
    }
    if (payload?.due_date) {
        await pool.query(`UPDATE tasks SET due_date = $1 WHERE id = $2`, [due_date, id]);
        flg++;
    }

    if (flg === 0) return null;
    const result = await pool.query(`SELECT * FROM tasks WHERE id = $1`, [id]);
    return result;
}





const deleteTaskById = async (id: string) => {

    const isExist = await pool.query(`SELECT * FROM tasks WHERE id = $1`, [id]);
    if (isExist.rowCount === 0) return null;

    const request = await pool.query(`DELETE FROM tasks WHERE id = $1 RETURNING *`, [id]);
    return request;
}

export const TaskServices = {
    createTask,
    getAllTask,
    getAllTaskByUserId,
    getTaskById,
    updateTaskById,
    deleteTaskById
}