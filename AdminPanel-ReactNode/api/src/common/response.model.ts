export class ErrorResponse extends Error {
    statusCode: number;
    isOperational: boolean = true;
    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ApiResponse<T> {
    status: boolean;
    message: string;
    data: T | null;
    constructor(message: string = '', data: T | null = null, status: boolean = true) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

