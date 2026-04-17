import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.js';
import db from './db.js';

const app = express();
const port = 3000;
let isLoadingData = true;

app.use(express.json());
app.use(cors());
app.use('/api', apiRoutes);

app.listen(port, async() => {
	console.log(`Server is running on port ${port}`);

	try {
		await db.initTable();
		await db.seedTable();
		isLoadingData = false;
		console.log("Database successfully initialised and seeded");
	} catch (error) {
		console.error('Failed to initialise database:', error);
		process.exit(1);
	}
});
