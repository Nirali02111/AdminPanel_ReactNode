import { NextFunction, Response } from "express";
import { CustomRequest } from "../common/request.model";
import * as errorLogService from '../services/errorlog.services'
import { ApiResponse } from "../common/response.model";
export const getErrorLog = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const responseData = await errorLogService.getErrorLog();
        res.send(new ApiResponse('', responseData))
    } catch (e) {
        next(e)
    }
}