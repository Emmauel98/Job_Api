// import { Router } from "express";
// import multer from "multer";
// import { requireAuth, requireRole } from "../middleware/auth.middleware";
// import { validate } from "../middleware/validate";
// import {
//   generateJobDescriptionController,
//   matchResumeController,
//   generateInterviewQuestionsController,
// } from "../controllers/ai.controller";
// import {
//   generateJobDescriptionSchema,
//   matchResumeSchema,
//   generateInterviewQuestionsSchema,
// } from "../validation/ai.validation";

// const upload = multer({ storage: multer.memoryStorage() });
// const router = Router();

// router.post(
//   "/generate-job-description",
//   requireAuth,
//   requireRole(["recruiter", "admin"]),
//   validate(generateJobDescriptionSchema),
//   generateJobDescriptionController
// );

// router.post(
//   "/match-resume",
//   requireAuth,
//   requireRole(["applicant"]),
//   upload.single("resume"),
//   validate(matchResumeSchema),
//   matchResumeController
// );

// router.post(
//   "/interview-questions",
//   requireAuth,
//   requireRole(["recruiter", "admin"]),
//   validate(generateInterviewQuestionsSchema),
//   generateInterviewQuestionsController
// );

// export default router;


// ✅ Example Valid Payloads
// 1️⃣ Generate Job Description
// {
//   "role": "Frontend Engineer",
//   "keywords": ["React", "TypeScript", "UI Design"]
// }

// 2️⃣ Match Resume

// Form-data:

// jobId: 670a1c7d29349c8fbb024e8b
// resume: (upload PDF file)

// 3️⃣ Interview Questions
// {
//   "description": "We are hiring a backend engineer to build scalable APIs using Node.js and MongoDB."
// }

