// middleware/requestLogger.ts
import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    logger.info(`Request Body: ${JSON.stringify(req.body)}`);
  }
  if (Object.keys(req.params).length > 0) {
    logger.info(`Request Params: ${JSON.stringify(req.params)}`);
  }
  if (Object.keys(req.query).length > 0) {
    logger.info(`Request Query: ${JSON.stringify(req.query)}`);
  }
  next();
};