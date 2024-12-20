const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection()
    .then(() => {
        console.log('Connected to MySQL database');
    })
    .catch((err) => {
        console.error('Error connecting to MySQL database:', err);
    });

module.exports = db;
