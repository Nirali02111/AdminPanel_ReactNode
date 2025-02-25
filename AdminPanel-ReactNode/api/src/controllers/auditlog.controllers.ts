import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../common/request.model";
import { ApiResponse } from "../common/response.model";
import * as auditLogService from '../services/auditlog.services'
export const getAuditLogs = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const responseData = await auditLogService.getAuditLogs(req.query as unknown as auditLogService.SearchOptions);
        res.send(new ApiResponse('', responseData))
    } catch (e) {
        next(e)
    }
}