import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    
    port: parseInt(process.env.POSTGRES_PORT!, 10) || 5432, // Default PostgreSQL port is 5432
    max: 10, // Maximum number of connections in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});

console.log("User: ", process.env.POSTGRES_USER);
console.log("Password: ", process.env.POSTGRES_PASSWORD);
console.log("Host: ", process.env.POSTGRES_HOST);
console.log("Database: ", process.env.POSTGRES_DB);
console.log("Port: ", process.env.POSTGRES_PORT);

export default pool;
