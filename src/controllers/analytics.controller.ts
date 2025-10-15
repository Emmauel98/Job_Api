import { Request, Response } from "express";
import { getAnalyticsData } from "../services/analytics.service";
import { successResponse, errorResponse } from "../utils/response";

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const data = await getAnalyticsData();
    return successResponse(res, data);
  } catch (error) {
    return errorResponse(res, error);
  }
};