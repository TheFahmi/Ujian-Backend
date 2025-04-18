import mysql from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const connection = mysql.createConnection({
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASS || 'gatauu123',
	database: process.env.DB_NAME || 'movieindoxxi'
});

// Test connection
connection.connect((err) => {
	if (err) {
		console.error('Error connecting to database:', err);
		return;
	}
	console.log('Connected to MySQL database');
});

export default connection; 