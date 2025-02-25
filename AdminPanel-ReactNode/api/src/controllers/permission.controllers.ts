import { Request, Response, NextFunction } from 'express'
import { ApiResponse } from '../common/response.model';
import * as permissionService from '../services/permission.services'
export const getPermissions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await permissionService.getPermissions();
        res.status(200).json(new ApiResponse('', responseData));
    } catch (e) {
        next(e)
    }
}