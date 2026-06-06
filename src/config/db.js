import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'db_fecaf_flix',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default db;