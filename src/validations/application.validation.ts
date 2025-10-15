import Joi from "joi";


export const createApplicationSchema = Joi.object({
  jobId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Job ID must be a valid MongoDB ObjectId",
    }),
  resumeUrl: Joi.string().uri().optional(), // optional if file upload handled separately
});

export const updateApplicationStatusSchema = Joi.object({
  status: Joi.string().valid("shortlisted", "rejected").required(),
});
