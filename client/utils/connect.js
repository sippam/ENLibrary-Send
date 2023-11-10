import mysql from 'mysql2';

export function connectMYSQL() {
  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10, // Adjust the limit as needed
  });

  return pool.promise(); // Use the promise() method to enable Promise support
}
