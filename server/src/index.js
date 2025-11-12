
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

let db;
const connectAndStart = async () => {
    try{
        // 1. Establish Database Connection
        db = await mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.DB_PASS
        });
        await db.query('SELECT 1');
        console.log('Connected to database');

        // 2. Define API Routes
        app.get('/api/products', async (req,res) => {
            try{
                const [rows] = await db.query('SELECT * FROM products');
                res.json(rows);
            }catch (err){
                console.error(err);
                res.status(502).json({ error: 'Database query failed.'});
            }
        });

        app.post('/api/contact', (req, res) => {
                const { name, phone, email, comment } = req.body;

                // 1. Simple backend validation check
                if (!name || !email) {
                    console.error('❌ Contact form submission failed: Missing name or email.');
                    return res.status(400).json({ error: 'Missing required fields (Name or Email).' });
                }

                console.log(`
                    ========================================
                    ✅ NEW CONTACT FORM SUBMISSION RECEIVED
                    ----------------------------------------
                    Name: ${name}
                    Email: ${email}
                    Phone: ${phone}
                    Message: ${comment || 'No message provided.'}
                    ========================================
                `);

            // 3. Send success response back to the frontend
                res.status(200).json({ message: 'Submission received and logged successfully!' });
            });

        app.use(express.static(BUILD_PATH));

        app.get(/.*/, (req,res) =>{
            res.sendFile(path.join(BUILD_PATH, 'index.html'));
        });

        // 4. Start Server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

    }catch (err){
        console.error('Database connection failed:', err);
        process.exit(1); // Exit if connection fails
    }
};

connectAndStart();



