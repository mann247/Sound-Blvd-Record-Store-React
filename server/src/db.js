import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config()

export const pool = await mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database:process.env.DB_NAME
})