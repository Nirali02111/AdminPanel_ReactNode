import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../common/response.model";
import * as emailTemplateService from "../services/emailtemplate.services";
import { addAuditlog } from "../services/auditlog.services";
import { CustomRequest } from "../common/request.model";
export const getEmailTemplates = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const responseData = await emailTemplateService.getEmailTemplates(
      req.query as unknown as emailTemplateService.SearchOptions
    );
    res.status(200).json(new ApiResponse("", responseData));
    await addAuditlog({
      userId: req.user?.userId,
      username: req.user?.username,
      activity: "View EmailTemplateManagement Listing",
    });
  } catch (e) {
    next(e);
  }
};
export const getEmailTemplateById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const emailTemplateData = await emailTemplateService.getEmailTemplateById(
      req.params.id
    );
    res.status(200).json(new ApiResponse("", emailTemplateData));
  } catch (e) {
    next(e);
  }
};
export const addEmailTemplate = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const emailTemplateData = await emailTemplateService.addEmailTemplate(
      req.body,
      req.user?.userId
    );
    res.status(200).json(new ApiResponse("EmailTemplate successfully created"));
    await addAuditlog({
      userId: req.user?.userId,
      username: req.user?.username,
      activity: "EmailTemplateManagement",
      actionType: "Create",
      data: emailTemplateData,
    });
  } catch (e) {
    next(e);
  }
};
export const updateEmailTemplate = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const emailTemplateData = await emailTemplateService.updateEmailTemplate(
      req.params.id,
      req.body,
      req.user?.userId
    );
    res.status(200).json(new ApiResponse("EmailTemplate successfully updated"));
    await addAuditlog({
      userId: req.user?.userId,
      username: req.user?.username,
      activity: "EmailTemplateManagement",
      actionType: "Update",
      data: emailTemplateData,
    });
  } catch (e) {
    next(e);
  }
};
export const deleteEmailTemplate = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const emailTemplateData = await emailTemplateService.deleteEmailTemplate(
      req.params.id
    );
    res.status(200).json(new ApiResponse("EmailTemplate successfully deleted"));
    await addAuditlog({
      userId: req.user?.userId,
      username: req.user?.username,
      activity: "EmailTemplateManagement",
      actionType: "Delete",
      data: emailTemplateData,
    });
  } catch (e) {
    next(e);
  }
};
