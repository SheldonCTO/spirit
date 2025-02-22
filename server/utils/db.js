import 'dotenv/config';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_PROD_HOST,
    port: Number(process.env.DB_PROD_PORT),
    user: process.env.DB_PROD_USER,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;