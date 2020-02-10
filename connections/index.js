const mysql = require('mysql');

module.exports = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'gatauu123',
	database: 'movieindoxxi'
});
