import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env')});


const app = express();
const PORT = process.env.PORT || 5000;
// const BUILD_PATH = path.join(__dirname, '../build');
const BUILD_PATH = path.join(__dirname, '../../soundblvd/build');

app.use(cors());
app.use(express.json());
app.use(express.static(BUILD_PATH));

let dbPool;
const initializeDbPool = async () => {
    if (!dbPool) {
        try {
            dbPool = await mysql.createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                database: process.env.DB_NAME,
                password: process.env.DB_PASS
            });
            console.log('✅ Database Pool Initialized');
        } catch (err) {
            console.error('❌ Database connection failed:', err);
            throw new Error('Database connection failed.');
        }
    }
};

// Middleware to ensure DB pool is ready before processing the request
app.use(async (req, res, next) => {
    try {
        await initializeDbPool();
        req.db = dbPool; // Attach the pool to the request object
        next();
    } catch (error) {
        res.status(500).json({ error: 'Server initialization error.' });
    }
});

// Define API Route (Uses the attached pool)
app.get('/api/products', async (req, res) => {
    try {
        const [rows] = await req.db.query('SELECT * FROM products');
        res.json(rows);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(502).json({ error: 'Database query failed.' });
    }
});

// 💡 CRITICAL: Export the app instance for Vercel
export default app;



