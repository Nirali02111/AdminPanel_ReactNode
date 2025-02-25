import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../common/response.model";
import * as cmsService from "../services/cms.services";
import { addAuditlog } from "../services/auditlog.services";
import { CustomRequest } from "../common/request.model";
export const getCMSs = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const responseData = await cmsService.getCMSs(
      req.query as unknown as cmsService.SearchOptions
    );
    res.status(200).json(new ApiResponse("", responseData));
    await addAuditlog({
      userId: req.user?.userId,
      username: req.user?.username,
      activity: "View CMSManagement Listing",
    });
  } catch (e) {
    next(e);
  }
};
export const getCMSById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cmsData = await cmsService.getCMSById(req.params.id);
    res.status(200).json(new ApiResponse("", cmsData));
  } catch (e) {
    next(e);
  }
};
export const addCMS = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const cmsData = await cmsService.addCMS(req.body, req.user?.userId);
    res.status(200).json(new ApiResponse("CMS successfully created"));
    await addAuditlog({
      userId: req.user?.userId,
      username: req.user?.username,
      activity: "CMSManagement",
      actionType: "Create",
      data: cmsData,
    });
  } catch (e) {
    next(e);
  }
};
export const updateCMS = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const cmsData = await cmsService.updateCMS(
      req.params.id,
      req.body,
      req.user?.userId
    );
    res.status(200).json(new ApiResponse("CMS successfully updated"));
    console.log(cmsData);
    await addAuditlog({
      userId: req.user?.userId,
      username: req.user?.username,
      activity: "CMSManagement",
      actionType: "Update",
      data: cmsData,
    });
  } catch (e) {
    next(e);
  }
};
export const deleteCMS = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await cmsService.deleteCMS(req.params.id);
    res.status(200).json(new ApiResponse("CMS successfully deleted"));
    await addAuditlog({
      userId: req.user?.userId,
      username: req.user?.username,
      activity: "CMSManagement",
      actionType: "Delete",
    });
  } catch (e) {
    next(e);
  }
};
