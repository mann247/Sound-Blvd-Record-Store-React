import express from 'express'
const router = express.Router()
import { pool } from './db.js'



router.get('/', async (req, res) => {
  try{
    const { type, min, max, searcg, page = 1, limit = 12 } = req.query
    const where = [], params = [];

    if (type)    { where.push('product_type = ?'); params.push(type); }
    if (min)     { where.push('price >= ?'); params.push(Number(min)); }
    if (max)     { where.push('price <= ?'); params.push(Number(max)); }
    if (search)  { where.push('(name LIKE ? OR artist LIKE ?)'); params.push(`%${search}%`); }
    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
    const off = (Number(page)-1) * (Number(limit));

    const [rows] = await pool.query(
        `SELECT id, album_title, artist, product_type, price, description, image_url
            FROM products${whereSql}
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?`,
            [...params, Number(limit), off]
    );
    const [[{count}]] = await pool.query(
        `SELECT COUNT(*) as count FROM products ${whereSql}`, params
    );
    res.json({data: rows, total: count, page: Number(page), pageSize: Number(limit) });
  }catch(err){
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router;
