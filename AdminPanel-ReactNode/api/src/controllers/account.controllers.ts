import { NextFunction, Request, Response } from "express";
import * as accountService from "../services/account.services";
import { CustomRequest } from "../common/request.model";
import { ApiResponse } from "../common/response.model";
import { addAuditlog } from "../services/auditlog.services";

export const login = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const responseData = await accountService.login(req.body);
    console.log("responseData: ", responseData);
    res.status(200).json(new ApiResponse("Login successful", responseData));
    await addAuditlog({
      userId: responseData.user.userId,
      username: responseData.user.username,
      activity: "Login",
    });
  } catch (e) {
    next(e);
  }
};
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const responseData = await accountService.forgotPassword(req.body);
    res
      .status(200)
      .json(
        new ApiResponse(
          "Link to reset your password has been sent to the registered mail",
          responseData
        )
      );
  } catch (e) {
    next(e);
  }
};
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await accountService.resetPassword(req.body, req.params.token);
    res.status(201).json(new ApiResponse("Password reset successful"));
  } catch (e) {
    next(e);
  }
};
export const getProfile = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const responseData = await accountService.getProfile(
      req.user?.userId as number
    );
    res.status(200).json(new ApiResponse("", responseData));
  } catch (e) {
    next(e);
  }
};
export const updateProfile = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await accountService.updateProfile(req.user?.userId as number, req.body);
    res.status(201).json(new ApiResponse("Profile successfully updated"));
  } catch (e) {
    next(e);
  }
};
export const changePassword = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await accountService.changePassword(req.user?.userId as number, req.body);
    res.status(200).json(new ApiResponse("Password successfully changed"));
  } catch (e) {
    next(e);
  }
};
export const logout = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  res.send(new ApiResponse("Logged out"));
  await addAuditlog({
    userId: req.user?.userId,
    username: req.user?.username,
    activity: "Logout",
  });
};
