import { Request } from "express";

export interface JwtPayload {
    userId?: number,
    roleId?: number,
    username?: string
}
export interface CustomRequest extends Request {
    user?: JwtPayload,
}
