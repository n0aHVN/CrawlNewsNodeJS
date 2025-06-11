import { ZodError, ZodIssue } from "zod";
import { CustomError } from "./custom.error";

export class BadRequestError extends CustomError {
    statusCode = 400;

    constructor(
        private errors: ZodIssue[]
    ) {
        super("Bad Request");
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors(): {message: string, path?: string}[] {
        return this.errors.map((err)=>{
            return {
                message: err.message,
                path: err.path[0] as string
            }
        });
    }
}