import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import fs from 'node:fs'
import path from 'node:path'
import { ErrorResponse } from "../common/response.model";
import { saveErrorLog } from "../services/errorlog.services";
function formatMessage(msg: string) {
  return msg.split('"')?.join('')
}
export const validateLoginRequestBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errorField = error.details[0].path[0]
    if (errorField === 'password') {
      if (error.details[0].type === "string.pattern.base") {
        next(new ErrorResponse(400, 'Invalid password'))
        return
      }
    }
    return next(new ErrorResponse(400, formatMessage(error.details[0]?.message)))
  }
  next();
};
export const validateForgotPasswordRequestBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  const { error } = schema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    next(new ErrorResponse(400, formatMessage(error.details[0]?.message)))
    return
  }
  next();
};
export const validateResetPasswordRequestBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    password: Joi.string()
      .pattern(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,20}$"
        )
      ).required(),
  });
  const { error } = schema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errorField = error.details[0].path[0]
    if (errorField === 'password') {
      if (error.details[0].type === "string.pattern.base") {
        next(new ErrorResponse(400, 'Invalid password'))
        return
      }
    }
    next(new ErrorResponse(400, formatMessage(error.details[0]?.message)))
    return
  }
  next();
};
export const validateChangePasswordRequestBody = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,20}$"
      )
    ).required(),
  });
  const { error } = schema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errorField = error.details[0].path[0]
    if (errorField === 'newPassword') {
      if (error.details[0].type === "string.pattern.base") {
        next(new ErrorResponse(400, 'Invalid new password'))
        return
      }
    }
    next(new ErrorResponse(400, formatMessage(error.details[0]?.message)))
    return
  }
  next();
}
export const validateUpdateProfileRequestBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    email: Joi.string().email().optional(),
    profileImage: Joi.allow().optional()
  });
  const { error } = schema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    try { fs.unlinkSync(path.join(__dirname, '..', 'assets/images/users', req.body.profileImage)); } catch (e) {
      await saveErrorLog(e)
    }
    next(new ErrorResponse(400, error.details[0].message))
    return
  }
  next();
};
export const validateAddUserRequestBody = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,20}$"
        )
      ).required(),
    profileImage: Joi.allow().required(),
    roleId: Joi.number().required(),
    status: Joi.string().valid('Active', 'InActive').optional(),
  });
  const { error } = schema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    try { fs.unlinkSync(path.join(__dirname, '..', 'assets/images/users', req.body.profileImage)); } catch (e) {
      await saveErrorLog(e)
    }
    if (error.details[0].path[0] === 'password') {
      if (error.details[0].type === "string.pattern.base") {
        next(new ErrorResponse(400, 'Invalid password'))
        return
      }
    }
    next(new ErrorResponse(400, formatMessage(error.details[0]?.message)))
    return
  }
  next();
}
export const validateUpdateUserRequestBody = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    email: Joi.string().email().optional(),
    profileImage: Joi.allow().optional(),
    roleId: Joi.number().optional(),
    status: Joi.string().valid('Active', 'InActive').optional(),
  });
  const { error } = schema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    try { fs.unlinkSync(path.join(__dirname, '..', 'assets/images/users', req.body.profileImage)); } catch (e) {
      await saveErrorLog(e)
    }
    next(new ErrorResponse(400, formatMessage(error.details[0]?.message)))
    return
  }
  next();
}
export const validateRoleRequestBody = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: req.method === "POST" ? Joi.string().required() : Joi.string().optional(),
    shortDescription: Joi.string().optional(),
    permissions: Joi.allow().required(),
    status: Joi.string().valid('Active', 'InActive').optional(),
  });
  const { error } = schema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    next(new ErrorResponse(400, formatMessage(error.details[0]?.message)))
    return
  }
  if (!(req.body.permissions && Array.isArray(req.body.permissions) && req.body.permissions.every((ele: any) => typeof ele === "number"))) {
    next(new ErrorResponse(400, 'Invalid Permissions'))
    return
  }
  next();
}
export const validateEmailTemplateRequestBody = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    key: req.method === 'POST' ? Joi.string().required() : Joi.string().optional(),
    title: req.method === 'POST' ? Joi.string().required() : Joi.string().optional(),
    fromEmail: req.method === 'POST' ? Joi.string().required() : Joi.string().optional(),
    fromName: req.method === 'POST' ? Joi.string().required() : Joi.string().optional(),
    subject: req.method === 'POST' ? Joi.string().required() : Joi.string().optional(),
    body: req.method === 'POST' ? Joi.string().required() : Joi.string().optional(),
    isManualMail: Joi.boolean().optional(),
    isContactUsMail: Joi.boolean().optional(),
    status: Joi.string().valid('Active', 'InActive').optional(),
  });
  const { error } = schema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    next(new ErrorResponse(400, formatMessage(error.details[0]?.message)))
    return
  }
  next();
}
export const validateCMSRequestBody = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    key: req.method === 'POST' ? Joi.string().required() : Joi.string().optional(),
    title: req.method === 'POST' ? Joi.string().required() : Joi.string().optional(),
    metaTitle: req.method === 'POST' ? Joi.string().required() : Joi.string().optional(),
    metaKeyword: req.method === 'POST' ? Joi.string().required() : Joi.string().optional(),
    metaDescription: req.method === 'POST' ? Joi.string().required() : Joi.string().optional(),
    content: req.method === 'POST' ? Joi.string().required() : Joi.string().optional(),
    status: Joi.string().valid('Active', 'InActive').optional()
  });
  const { error } = schema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    next(new ErrorResponse(400, formatMessage(error.details[0]?.message)))
    return
  }
  next();
}
export const validateFAQRequestBody = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    question: req.method === 'POST' ? Joi.string().required() : Joi.string().optional(),
    answer: req.method === 'POST' ? Joi.string().required() : Joi.string().optional(),
    displayOrder: req.method === 'POST' ? Joi.number().required() : Joi.number().optional(),
    status: Joi.string().valid('Active', 'InActive').optional()
  });
  const { error } = schema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    next(new ErrorResponse(400, formatMessage(error.details[0]?.message)))
    return
  }
  next();
}
export const validateApplicationConfigurationRequestBody = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    key: req.method === 'POST' ? Joi.string().required() : Joi.string().optional(),
    value: req.method === 'POST' ? Joi.string().required() : Joi.string().optional(),
  });
  const { error } = schema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    next(new ErrorResponse(400, formatMessage(error.details[0]?.message)))
    return
  }
  next();
}
