import { CustomError } from "./custom.error";

export class InternalError extends CustomError {
    statusCode = 500;

    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, InternalError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}