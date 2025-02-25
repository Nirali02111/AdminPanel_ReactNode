import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { BaseError } from "sequelize";
import { ApiResponse, ErrorResponse } from "../common/response.model";
import { saveErrorLog } from "../services/errorlog.services";

export const handleSystemError = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof JsonWebTokenError) {
    next(new ErrorResponse(401, "Unauthorized"));
    return;
  }
  if ((err instanceof BaseError) as any) {
    if (err.name === "SequelizeUniqueConstraintError") {
      if (err.errors[0].path === "DisplayOrder") {
        next(new ErrorResponse(400, "Display Order should be unique"));
        return;
      }
      next(new ErrorResponse(400, err.errors[0].value + " already exist"));
    }
  }
  next(err)
};
export const handleErrorResponse = async (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.isOperational) {
    if (err.statusCode === 500) {
      logError(err)
    }
    res.status(err.statusCode).json(new ApiResponse(err.message, null, false));
  } else {
    await logError(err)
    res.status(500).json(new ApiResponse("Internal Server Error", null, false));
  }
};

async function logError(err: any) {
  try {
    await saveErrorLog(err)
    console.log(err);
  } catch (e) { }
}
