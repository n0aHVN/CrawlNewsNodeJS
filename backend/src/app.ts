import Express, { json } from 'express';
import cors from 'cors';
import { NewsRouter } from './routes/news.routes';
import { CategoriesRouter } from './routes/categories.routes';
import { ErrorHandlerMiddleware } from './middleware/error-handler.middleware';
import { requestLogger } from './middleware/request-logger.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
const app = Express();

app.use(cors()); // Disable CORS protection, allow all origins
app.use(json());
app.use(requestLogger);

app.use(NewsRouter);
app.use(CategoriesRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(ErrorHandlerMiddleware);

export {app};