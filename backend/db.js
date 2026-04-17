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
			gameId VARCHAR(100) UNIQUE NOT NULL,
			name VARCHAR(500) NOT NULL,
			released VARCHAR(100),
			rating VARCHAR(100),
			ratingTop VARCHAR(100),
			added VARCHAR(100) NOT NULL,
			updated VARCHAR(100)
			);
		`);
		console.log("Table created");
		} catch (error) {
			throw new Error(error);
		}
}

async function seedInTable(element) {
	const gameId = element.id;
	const name = element.name;
	const released = element.released;
	const rating = element.rating;
	const ratingTop = element.rating_top;
	const added = element.added;
	const updated = element.updated;
	try {
		await pool.query(`
			INSERT INTO games (gameId, name, released, rating, ratingTop, added, updated)
			VALUES ($1, $2, $3, $4, $5, $6, $7)
			ON CONFLICT (gameId) DO NOTHING
		`, [gameId, name, released, rating, ratingTop, added, updated]);
	} catch (error) {
		throw new Error(error);
	}
};

async function seedTable() {
	let hasCursor = true;
	let cursorValue = "";
	let pages = 0;

	while (hasCursor && pages < 700) {
		try {
			const data = await fetchData(cursorValue);
			if (data === "error")
				break;
			cursorValue = "";

			data.results.forEach(async(element) => {
				await seedInTable(element);
			});
			if (data.next !== null)
			{
				cursorValue = data.next;
				console.log("more to come");
				pages++;
			}
			else
			{
				hasCursor = false;
				console.log("last!");
			}
		} catch (error) {
			throw new Error(error);
		}
	}
};

export default { pool, initTable, seedTable };
