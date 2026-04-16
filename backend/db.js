import pg from 'pg';
import dotenv from 'dotenv';
import fetchData from './apiCaller.js'

dotenv.config({quiet: true});

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.on('connect', () => {
	console.log('✓ Connected to PostgreSQL database');
  });
  
pool.on('error', (err) => {
	console.error('Unexpected error on idle client', err);
	process.exit(-1);
});

async function initTable() {
	try {
		const result = await pool.query(`
			CREATE TABLE IF NOT EXISTS games (
			id SERIAL PRIMARY KEY,
			name VARCHAR(500) UNIQUE NOT NULL,
			released VARCHAR(100) NOT NULL,
			rating VARCHAR(100) NOT NULL,
			ratingTop VARCHAR(100) NOT NULL,
			added VARCHAR(100) NOT NULL,
			updated VARCHAR(100) NOT NULL
			);
		`);
		console.log("Table created");
		} catch (error) {
			throw new Error(error);
		}
}

async function seedInTable(element) {
	const name = element.name;
	const released = element.released;
	const rating = element.rating;
	const ratingTop = element.rating_top;
	const added = element.added;
	const updated = element.updated;
	try {
		await pool.query(`
			INSERT INTO games (name, released, rating, ratingTop, added, updated)
			VALUES ($1, $2, $3, $4, $5, $6)
		`, [name, released, rating, ratingTop, added, updated]);
	} catch (error) {
		throw new Error(error);
	}
};

async function seedTable() {
	let hasCursor = true;
	let cursorValue = "";

	while (hasCursor) {
		try {
			const data = await fetchData(cursorValue);
			if (data === "error")
				break;
			cursorValue = "";

			data.data.forEach(async(element) => {
				await seedInTable(element);
			});
			if (data.next && data.next !== "" && data.next !== null)
				cursorValue = data.next;
			else
				hasCursor = false;
		} catch (error) {
			throw new Error(error);
		}
	}
};

export default { pool, initTable, seedTable };