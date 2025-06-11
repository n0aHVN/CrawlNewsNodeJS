import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    password: '123', // Change this to your actual password
    host: 'localhost',
    database: 'NewsDB',
    port: 5432,
    max: 10, // Maximum number of connections in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});

export default pool;
