import { Response, NextFunction } from "express";
import * as userService from "../services/users.services";
import { ApiResponse } from "../common/response.model";
import { addAuditlog } from "../services/auditlog.services";
import { CustomRequest } from "../common/request.model";

export const getUsers = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const responseData = await userService.getUsers(
      req.query as unknown as userService.SearchOptions
    );
    res.status(200).json(new ApiResponse("", responseData));
    await addAuditlog({
      userId: req.user?.userId,
      username: req.user?.username,
      activity: "View User Listing",
    });
  } catch (e) {
    next(e);
  }
};
export const getUserById = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = await userService.getUserById(req.params.id);
    res.status(200).json(new ApiResponse("", userData));
  } catch (e) {
    next(e);
  }
};
export const addUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = await userService.addUser(req.body, req.user?.userId);
    res.status(200).json(new ApiResponse("User successfully created"));
    await addAuditlog({
      userId: req.user?.userId,
      username: req.user?.username,
      activity: "ApplicationUser",
      actionType: "Create",
      data: userData,
    });
  } catch (e) {
    next(e);
  }
};
export const updateUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = await userService.updateUser(
      req.params.id,
      req.body,
      req.user?.userId
    );
    res.status(200).json(new ApiResponse("User successfully updated"));
    await addAuditlog({
      userId: req.user?.userId,
      username: req.user?.username,
      activity: "ApplicationUser",
      actionType: "Update",
      data: userData,
    });
  } catch (e) {
    next(e);
  }
};
export const deleteUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(200).json(new ApiResponse("User successfully deleted"));
    await addAuditlog({
      userId: req.user?.userId,
      username: req.user?.username,
      activity: "ApplicationUser",
      actionType: "Delete",
    });
  } catch (e) {
    next(e);
  }
};
