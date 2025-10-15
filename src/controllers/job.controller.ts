import { Request, Response } from "express";
import * as jobService from "../services/job.service";
import { successResponse, errorResponse } from "../utils/response";

export const createJob = async (req: Request, res: Response) => {
  try {
    const job = await jobService.createJob(req.body, req?.user!._id!);
    return successResponse(res, job, 201);
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const getJobs = async (req: Request, res: Response) => {
  try {
    const result = await jobService.getJobs(req.query);
    return successResponse(res, result);
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const getJobById = async (req: Request, res: Response) => {
  try {
    const job = await jobService.getJobById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    return successResponse(res, job);
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const updateJob = async (req: Request, res: Response) => {
  try {
    const job = await jobService.updateJob(req.params.id, req.body);
    if (!job) return res.status(404).json({ message: "Job not found" });
    return successResponse(res, job);
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const job = await jobService.deleteJob(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    return successResponse(res, { message: "Job deleted successfully" });
  } catch (err) {
    return errorResponse(res, err);
  }
};
