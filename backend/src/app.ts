import Express, { json } from 'express';
import { NewsRouter } from './routes/news.routes';
import { CategoriesRouter } from './routes/categories.routes';
import { ErrorHandlerMiddleware } from './middleware/error-handler.middleware';
const app = Express();

app.use(json());
app.use(NewsRouter);
app.use(CategoriesRouter);

app.use(ErrorHandlerMiddleware);

export {app};