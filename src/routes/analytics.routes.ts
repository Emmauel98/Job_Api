import { Router } from "express";
import { getAnalytics } from "../controllers/analytics.controller";
import { requireAuth, requireRole } from "../middlewares/auth.middleware";

const router = Router();

// Only recruiter or admin can view analytics
router.get("/", requireAuth, requireRole(["recruiter", "admin"]), getAnalytics);

export default router;

// GET /analytics

// {
//   "success": true,
//   "data": {
//     "totalJobs": 22,
//     "totalApplications": 114,
//     "averageResponseTime": 48.6,
//     "mostAppliedJobs": [
//       { "jobTitle": "Frontend Developer", "company": "Concavo", "totalApplicants": 27 },
//       { "jobTitle": "Backend Engineer", "company": "LoadWay", "totalApplicants": 20 }
//     ]
//   }
// }
