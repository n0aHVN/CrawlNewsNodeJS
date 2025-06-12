import { CustomError } from './custom.error';

export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor(msg: string = 'Resource not found') {
        super(msg);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}