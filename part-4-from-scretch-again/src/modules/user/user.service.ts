import { Request, Response } from "express"
import { pool } from "../../config/db"


const createUser = async (payload : Record<string, unknown>) => {

    const { name, email, password, phone } = payload;
    const hashPassword = '##Pass-'+password; // In real application, hash the password before storing

    const request = await pool.query(`
    INSERT INTO users (name, email, password, phone)
    VALUES ($1, $2, $3, $4) RETURNING * `, [name, email, hashPassword, phone])
  return request;
}



export const UserServices = {
    createUser,

}