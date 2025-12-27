import { Request, Response } from "express"
import { pool } from "../../config/db"


const createUser = async (payload: Record<string, unknown>) => {

    const { name, email, password, phone } = payload;
    const hashPassword = '##Pass-' + password; // In real application, hash the password before storing

    const request = await pool.query(`
    INSERT INTO users (name, email, password, phone)
    VALUES ($1, $2, $3, $4) RETURNING * `, [name, email, hashPassword, phone]);

    return request;
}


const getAllUsers = async () => {
    // const request = await pool.query(`SELECT id, name, email, phone FROM users`)
    const request = await pool.query(`SELECT * FROM users`)
    return request;
}

const getUserById = async (id: string) => {
    // const request = await pool.query(`SELECT id, name, email, phone FROM users WHERE id = $1`, [id])
    const request = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
    return request;
}

const updateUserById = async (id: string, payload: Record<string, unknown>) => {
    const { name, phone, address } = payload;
    const request = await pool.query(`
        UPDATE users
        SET name = $1, phone = $2, address = $3, updated_at = NOW()
        WHERE id = $4
        RETURNING *`, [name, phone, address, id]);
    return request;
}

const deleteUserById = async (id: string) => {
    const isExist = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    if (isExist.rowCount === 0) {
       return null;
    }

    const request = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id]);
    return request;
}

export const UserServices = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
}
