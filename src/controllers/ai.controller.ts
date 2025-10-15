// import { Request, Response } from "express";
// import {
//   generateJobDescription,
//   extractSkillsFromResume,
//   matchResumeToJob,
//   generateInterviewQuestions,
// } from "../services/ai.service";
// import JobListing from "../models/JobListing";
// import { successResponse, errorResponse } from "../utils/response";

// export const generateJobDescriptionController = async (req: Request, res: Response) => {
//   try {
//     const { role, keywords } = req.body;
//     const description = await generateJobDescription(role, keywords || []);
//     return successResponse(res, { description });
//   } catch (err) {
//     return errorResponse(res, err);
//   }
// };

// export const matchResumeController = async (req: Request, res: Response) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: "Resume required" });

//     const job = await JobListing.findById(req.body.jobId);
//     if (!job) return res.status(404).json({ message: "Job not found" });

//     const resumeSkills = await extractSkillsFromResume(req.file.buffer);
//     const result = matchResumeToJob(resumeSkills, job);
//     return successResponse(res, result);
//   } catch (err) {
//     return errorResponse(res, err);
//   }
// };

// export const generateInterviewQuestionsController = async (req: Request, res: Response) => {
//   try {
//     const { description } = req.body;
//     const questions = await generateInterviewQuestions(description);
//     return successResponse(res, { questions });
//   } catch (err) {
//     return errorResponse(res, err);
//   }
// };