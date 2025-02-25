import { NextFunction, Response } from "express";
import { CustomRequest } from "../common/request.model";
import * as dashboardService from "../services/dashboard.services";
import { ApiResponse } from "../common/response.model";
import { addAuditlog } from "../services/auditlog.services";
export const getDashboard = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const responseData = await dashboardService.getDashboard();
    res.status(200).json(new ApiResponse("", responseData));
    await addAuditlog({
      userId: req.user?.userId,
      username: req.user?.username,
      activity: "View Dashboard",
    });
  } catch (e) {
    next(e);
  }
};
