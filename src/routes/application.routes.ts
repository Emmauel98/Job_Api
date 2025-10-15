import express from "express";
import {
  applyToJob,
  getJobApplicants,
  updateStatus,
} from "../controllers/application.controller";
import { requireAuth, requireRole } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  createApplicationSchema,
  updateApplicationStatusSchema,
} from "../validations/application.validation";
import { upload } from "../middlewares/upload.middleware";

const router = express.Router();

// Applicants apply to job
// router.post("/", requireAuth, requireRole(["applicant"]), validate(createApplicationSchema), applyToJob);
router.post(
  "/",
  requireAuth,
  requireRole(["applicant"]),
  upload.single("resume"), // Handles file upload
  async (req, res, next) => {
    // Attach file URL to req.body
    if (req.file) req.body.resumeUrl = (req.file as any).path;
    next();
  },
  validate(createApplicationSchema),
  applyToJob
);

// Recruiter views applicants for their job
router.get(
  "/job/:id",
  requireAuth,
  requireRole(["recruiter", "admin"]),
  getJobApplicants
);

// Recruiter updates status
router.patch(
  "/:id/status",
  requireAuth,
  requireRole(["recruiter", "admin"]),
  validate(updateApplicationStatusSchema),
  updateStatus
);

export default router;
