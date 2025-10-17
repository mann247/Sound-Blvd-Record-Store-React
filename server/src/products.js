import express from 'express';
import { pool } from './db.js';


const router = express.Router();


router.get('/', async (req, res) => {
try {
const { priceMin, priceMax, type, q, page = 1, limit = 12 } = req.query;
const offset = (Number(page) - 1) * Number(limit);


const where = [];
const args = [];


if (priceMin) { where.push('price >= ?'); args.push(Number(priceMin)); }
if (priceMax) { where.push('price <= ?'); args.push(Number(priceMax)); }
if (type) { where.push('type = ?'); args.push(type); }
if (q) { where.push('(name LIKE ? OR artist LIKE ?)'); args.push(`%${q}%`, `%${q}%`); }


const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';


const [rows] = await pool.query(
`SELECT SQL_CALC_FOUND_ROWS id, name, artist, type, description, price, image_url
FROM products
${whereSql}
ORDER BY created_at DESC
LIMIT ? OFFSET ?`,
[...args, Number(limit), offset]
);


const [[{ 'FOUND_ROWS()': total }]] = await pool.query('SELECT FOUND_ROWS()');


res.json({ data: rows, total, page: Number(page), limit: Number(limit) });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Failed to fetch products' });
}
});


export default router;