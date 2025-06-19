import dotenv from 'dotenv';
dotenv.config();
import { app } from "./app"

const start = ()=>{
    if (process.env.NODE_ENV !== 'production'){
        // require('dotenv').config();
    }
    const env_vars = [
        'POSTGRES_USER',
        'POSTGRES_PASSWORD',
        'POSTGRES_HOST',
        'POSTGRES_DB',
        'POSTGRES_PORT',
    ];
    env_vars.forEach((env_var) => {
        if (!process.env[env_var] || process.env[env_var] === '') {
            throw new Error(`Environment variable ${env_var} is not set`);
        }
    });
}
    
app.listen(3000, ()=>{
    console.log("Listening on port 3000!"); 
})


start();