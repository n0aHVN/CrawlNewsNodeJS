import Express, { json } from 'express';
const app = Express();

app.use(json());


export {app};