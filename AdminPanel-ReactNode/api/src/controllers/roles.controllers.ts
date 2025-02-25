import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../common/response.model";
import * as roleService from "../services/roles.services";
import { addAuditlog } from "../services/auditlog.services";
import { CustomRequest } from "../common/request.model";
export const getRoles = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const responseData = await roleService.getRoles(
      req.query as unknown as roleService.SearchOptions
    );
    res.status(200).json(new ApiResponse("", responseData));
    await addAuditlog({
      userId: req.user?.userId,
      username: req.user?.username,
      activity: "View Roles Listing",
    });
  } catch (e) {
    next(e);
  }
};
export const getRoleById = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const roleData = await roleService.getRoleById(req.params.id);
    res.status(200).json(new ApiResponse("", roleData));
  } catch (e) {
    next(e);
  }
};
export const addRole = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const roleData = await roleService.addRole(req.body, req.user?.userId);
    res.status(200).json(new ApiResponse("Role successfully created"));
    await addAuditlog({
      userId: req.user?.userId,
      username: req.user?.username,
      activity: "Role",
      actionType: "Create",
      data: roleData,
    });
  } catch (e) {
    next(e);
  }
};
export const updateRole = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const roleData = await roleService.updateRole(
      req.params.id,
      req.body,
      req.user?.userId
    );
    res.status(200).json(new ApiResponse("Role successfully updated"));
    await addAuditlog({
      userId: req.user?.userId,
      username: req.user?.username,
      activity: "Role",
      actionType: "Update",
      data: roleData,
    });
  } catch (e) {
    next(e);
  }
};
export const deleteRole = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await roleService.deleteRole(req.params.id);
    res.status(200).json(new ApiResponse("Role successfully deleted"));
    await addAuditlog({
      userId: req.user?.userId,
      username: req.user?.username,
      activity: "Role",
      actionType: "Delete",
    });
  } catch (e) {
    next(e);
  }
};
export const getRoleNameAndId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const responseData = await roleService.getRoleNameAndId();
    res.status(200).json(new ApiResponse("", responseData));
  } catch (e) {
    next(e);
  }
};
