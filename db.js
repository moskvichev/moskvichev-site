const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost:3306',
  user: 'moskvichev',
  password: '123456zxC',
  database: 'moskvichev',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

module.exports = db;
