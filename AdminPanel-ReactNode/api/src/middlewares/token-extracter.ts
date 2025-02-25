import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../common/response.model";
import { Strategy, ExtractJwt } from 'passport-jwt'
import passport from "passport";
import { CustomRequest, JwtPayload } from "../common/request.model";
const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
const secretOrKey = process.env.jwt_secret;

export const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    passport.use(
        new Strategy({ jwtFromRequest, secretOrKey }, function (jwt_payload: JwtPayload, done: (arg0: any, arg1: any) => any) {
            if (!jwt_payload.userId)
                return done(new ErrorResponse(401, "Unauthorized"), false);
            return done(null, jwt_payload);
        })
    );
    passport.authenticate("jwt", { session: false }, (err: any, user: JwtPayload, info: any) => {
        if (err) return next(new ErrorResponse(401, 'Unauthorized'));
        if (info) return next(new ErrorResponse(401, 'Unauthorized'));
        req.user = user;
        return next();
    })(req, res, next);
};