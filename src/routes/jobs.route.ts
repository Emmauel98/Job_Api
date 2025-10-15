import express from "express";
import * as jobController from "../controllers/job.controller";
import { requireAuth, requireRole } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createJobSchema } from "../validations/job.validation";

const router = express.Router();

// Recruiters or admins can post
router.post("/", requireAuth, requireRole(["recruiter", "admin"]), validate(createJobSchema), jobController.createJob);

// Public can browse
router.get("/", jobController.getJobs);
router.get("/:id", jobController.getJobById);

// Recruiter/admin can edit or delete
router.put("/:id", requireAuth, requireRole(["recruiter", "admin"]), jobController.updateJob);
router.delete("/:id", requireAuth, requireRole(["recruiter", "admin"]), jobController.deleteJob);

export default router;
