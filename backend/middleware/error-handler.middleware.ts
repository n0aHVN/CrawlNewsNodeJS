import { Request, Response } from "express";
import { CustomError } from "../error/custom.error"

export const ErrorHandlerMiddleware = async (err: Error, req: Request, res: Response)=>{
    console.log(err.message);
    if (err instanceof CustomError){
        res.status(err.statusCode).send(err.message);
        return;
    }
    res.status(500).send("Something is wrong");
}