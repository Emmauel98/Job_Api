import Joi from "joi";

// ✅ For /ai/generate-job-description
export const generateJobDescriptionSchema = Joi.object({
  role: Joi.string().min(2).required().messages({
    "string.empty": "Role is required",
  }),
  keywords: Joi.array().items(Joi.string().trim()).min(1).required().messages({
    "array.min": "At least one keyword is required",
  }),
});

// ✅ For /ai/match-resume
export const matchResumeSchema = Joi.object({
  jobId: Joi.string().hex().length(24).required().messages({
    "string.hex": "Invalid job ID format",
  }),
});

// ✅ For /ai/interview-questions
export const generateInterviewQuestionsSchema = Joi.object({
  description: Joi.string().min(30).required().messages({
    "string.min": "Job description should be at least 30 characters long",
  }),
});