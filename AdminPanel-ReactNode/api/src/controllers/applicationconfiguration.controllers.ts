import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../common/response.model";
import * as applicationConfigurationService from "../services/applicationconfiguration.services";
import { addAuditlog } from "../services/auditlog.services";
import { CustomRequest } from "../common/request.model";
export const getApplicationConfigurations = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const responseData =
      await applicationConfigurationService.getApplicationConfigurations(
        req.query as unknown as applicationConfigurationService.SearchOptions
      );
    await addAuditlog({
      userId: req.user?.userId,
      username: req.user?.username,
      activity: "View ApplicationConfiguration Listing",
    });
    res.status(200).json(new ApiResponse("", responseData));
  } catch (e) {
    next(e);
  }
};
export const getApplicationConfigurationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const applicationConfigurationData =
      await applicationConfigurationService.getApplicationConfigurationById(
        req.params.id
      );
    res.status(200).json(new ApiResponse("", applicationConfigurationData));
  } catch (e) {
    next(e);
  }
};
export const addApplicationConfiguration = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const applicationConfigurationData =
      await applicationConfigurationService.addApplicationConfiguration(
        req.body,
        req.user?.userId
      );
    res
      .status(200)
      .json(new ApiResponse("ApplicationConfiguration successfully created"));
    await addAuditlog({
      userId: req.user?.userId,
      username: req.user?.username,
      activity: "ApplicationConfiguration",
      actionType: "Create",
      data: applicationConfigurationData,
    });
  } catch (e) {
    next(e);
  }
};
export const updateApplicationConfiguration = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const applicationConfigurationData =
      await applicationConfigurationService.updateApplicationConfiguration(
        req.params.id,
        req.body,
        req.user?.userId
      );
    res
      .status(200)
      .json(new ApiResponse("ApplicationConfiguration successfully updated"));
    await addAuditlog({
      userId: req.user?.userId,
      username: req.user?.username,
      activity: "ApplicationConfiguration",
      actionType: "Update",
      data: applicationConfigurationData,
    });
  } catch (e) {
    next(e);
  }
};
export const deleteApplicationConfiguration = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await applicationConfigurationService.deleteApplicationConfiguration(
      req.params.id
    );
    res
      .status(200)
      .json(new ApiResponse("ApplicationConfiguration successfully deleted"));
    await addAuditlog({
      userId: req.user?.userId,
      username: req.user?.username,
      activity: "ApplicationConfiguration",
      actionType: "Delete",
    });
  } catch (e) {
    next(e);
  }
};
