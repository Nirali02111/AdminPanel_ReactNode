import { ErrorResponse } from "../common/response.model";
import { Request, Response, NextFunction } from 'express'
import rateLimit from 'express-rate-limit';
export const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    handler: (req: Request, res: Response, next: NextFunction) => {
        next(new ErrorResponse(429, "Too many login attempts, please try after some time.",))
    },
});
export const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 1000,
    handler: (req: Request, res: Response, next: NextFunction) => {
        next(new ErrorResponse(429, "Too many requests, please try after some time.",))
    },
});