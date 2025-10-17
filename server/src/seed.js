import fs from 'fs';
import path from 'path';
import url from 'url';
import { pool } from './db.js';


const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const inputPath = path.join(__dirname, 'vinyl.json');

async function ensureSchema() {
await pool.query(`
CREATE TABLE IF NOT EXISTS products (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
artist VARCHAR(255),
type ENUM('Album','Single','EP','Merch') DEFAULT 'Album',
description TEXT,
price DECIMAL(10,2) NOT NULL,
image_url VARCHAR(1024),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`);
}


async function seed() {
await ensureSchema();
const raw = fs.readFileSync(inputPath, 'utf-8');
const items = JSON.parse(raw);
for (const v of items) {
const name = v.title || v.name;
const price = Number(v.price ?? 0);
const description = v.description || '';
const image = v.image || v.image_url || '';


await pool.query(
`INSERT INTO products (name, artist, type, description, price, image_url)
VALUES (?, ?, ?, ?, ?, ?)`,
[name, artist, type, description, price, image]
);
}
console.log('Seed complete');
process.exit(0);
}


seed().catch(err => { console.error(err); process.exit(1); });