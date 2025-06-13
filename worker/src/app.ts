import Express, { json } from 'express';
import { ErrorHandlerMiddleware } from '../middleware/error-handler.middleware';

const app = Express();
app.use(json());

app.use(ErrorHandlerMiddleware);
export {app};