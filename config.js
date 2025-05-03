const fs = require('fs');
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.PORT, 10),
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.CA_CERTIFICATE, // read the .pem file
  },
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database.');
});

module.exports = db;
