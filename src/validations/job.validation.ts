// src/validations/job.validation.ts
import Joi from "joi";

export const createJobSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  company: Joi.string().min(2).required(),
  location: Joi.string().required(),
  salary: Joi.number().optional(),
  remote: Joi.boolean().optional(),
  techStack: Joi.array().items(Joi.string()).optional(),
  requirements: Joi.array().items(Joi.string()).required(),
  responsibilities: Joi.array().items(Joi.string()).required(),
});
