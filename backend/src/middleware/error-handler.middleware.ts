import { NextFunction, Request, Response } from "express";
import { CustomError } from "../error/custom.error"
import { logger } from "../utils/logger";

export const ErrorHandlerMiddleware = async (err: Error, req: Request, res: Response, next: NextFunction)=>{
    logger.error(`${err.message}\n${err.stack}`);
    if (err instanceof CustomError){
        res.status(err.statusCode).send(err.serializeErrors());
        return;
    }
    res.status(500).send("Something is wrong");
}