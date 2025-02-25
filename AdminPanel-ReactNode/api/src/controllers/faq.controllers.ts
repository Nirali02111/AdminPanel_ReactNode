import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../common/response.model";
import * as faqService from "../services/faq.services";
import { addAuditlog } from "../services/auditlog.services";
import { CustomRequest } from "../common/request.model";
export const getFAQs = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const responseData = await faqService.getFAQs(
      req.query as unknown as faqService.SearchOptions
    );
    res.status(200).json(new ApiResponse("", responseData));
    await addAuditlog({
      userId: req.user?.userId,
      username: req.user?.username,
      activity: "View FAQ Listing",
    });
  } catch (e) {
    next(e);
  }
};
export const getFAQById = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const faqData = await faqService.getFAQById(req.params.id);
    res.status(200).json(new ApiResponse("", faqData));
  } catch (e) {
    next(e);
  }
};
export const addFAQ = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const faqData = await faqService.addFAQ(req.body, req.user?.userId);
    res.status(200).json(new ApiResponse("FAQ successfully created"));
    console.log(req.user);
    await addAuditlog({
      userId: req.user?.userId,
      username: req.user?.username,
      activity: "FAQ",
      actionType: "Create",
      data: faqData,
    });
  } catch (e) {
    next(e);
  }
};
export const updateFAQ = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const faqData = await faqService.updateFAQ(
      req.params.id,
      req.body,
      req.user?.userId
    );
    res.status(200).json(new ApiResponse("FAQ successfully updated"));
    await addAuditlog({
      userId: req.user?.userId,
      username: req.user?.username,
      activity: "FAQ",
      actionType: "Update",
      data: faqData,
    });
  } catch (e) {
    next(e);
  }
};
export const deleteFAQ = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await faqService.deleteFAQ(req.params.id);
    res.status(200).json(new ApiResponse("FAQ successfully deleted"));
    await addAuditlog({
      userId: req.user?.userId,
      username: req.user?.username,
      activity: "FAQ",
      actionType: "Delete",
    });
  } catch (e) {
    next(e);
  }
};
