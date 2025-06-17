// middleware/requestLogger.ts
import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

// This middleware logs details about each incoming HTTP request.
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  // Logs the HTTP method and the original URL of the request.
  logger.info(`${req.method} ${req.originalUrl}`);

  // If the request method is POST, PUT, or PATCH, log the request body.
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    logger.info(`Request Body: ${JSON.stringify(req.body)}`);
  }

  // If there are route parameters, log them.
  if (Object.keys(req.params).length > 0) {
    logger.info(`Request Params: ${JSON.stringify(req.params)}`);
  }

  // If there are query parameters, log them.
  if (Object.keys(req.query).length > 0) {
    logger.info(`Request Query: ${JSON.stringify(req.query)}`);
  }

  // Pass control to the next middleware or route handler.
  next();
};
