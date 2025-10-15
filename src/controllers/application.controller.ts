import { Request, Response } from "express";
import * as applicationService from "../services/application.service";

export const applyToJob = async (req: Request, res: Response) => {
  try {
    const applicantId = req?.user?._id; // from auth middleware
    if(!applicantId) throw new Error('Invalid user Id.')
    const { jobId, resumeUrl } = req.body;

    const application = await applicationService.createApplication(
      applicantId,
      jobId,
      resumeUrl
    );

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getJobApplicants = async (req: Request, res: Response) => {
  try {
    const { id: jobId } = req.params;
    const applicants = await applicationService.getApplicantsByJob(jobId);

    res.json({ success: true, data: applicants });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await applicationService.updateApplicationStatus(id, status);

    res.json({ success: true, message: "Status updated", data: updated });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
