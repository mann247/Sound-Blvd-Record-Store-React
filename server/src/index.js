//post request
//use postman to save the db
// manually put in there
//Use that database to render products to the products page
    //get request or post request 

// Create const

// create connection for express and port # your using

// app.use for your middleware

// give the call for what your route is to fetch from front end
// app.use + listen 
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import {Server} from 'http';
import { pool } from './db.js';

// dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env')});


const app = express();
const PORT = process.env.PORT || 3306;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../soundblvd')));

let db;
(async () => {
    try{
        db = await mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.DB_PASS
        });

        console.log('Loaded ENV:', {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.DB_PASS ? 'hidden' : 'missing'
        });

    //Test connection
    await db.query('SELECT 1');
    console.log('Connected to database');
    }catch (err){
        console.error('Database connection failed:', err);
        process.exit(1);
    }
})();


app.get('/api/products', async (req,res) => {
    //test with response 200
    //res.json >> success: true
    console.log('Hello');
    try{
        const [rows] = await db.query('SELECT * FROM products');
        // const rows = await db.query('SELECT * FROM products');
        res.json(rows);
    }catch (err){
        console.error(err);
        res.status(502).json({ error: 'Database query failed.'});
    }
});

app.get(/.*/, (req,res) =>{
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
});

app.listen(PORT, () => {
    // console.log(`Server running at ${PORT}`);
    console.log(`Server is running on http://localhost:${PORT}`);
});
