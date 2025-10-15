import Application from "../models/Application";
import JobListing from "../models/JobListing";
import { IApplication } from "../models/Application";
import { sendEmail } from "../services/email.service";

export const createApplication = async (
  applicantId: string,
  jobId: string,
  resumeUrl: string
): Promise<IApplication> => {
  const job = await JobListing.findById(jobId);
  if (!job) throw new Error("Job not found");

  // ✅ Prevent self-application
  if (job.createdBy.toString() === applicantId.toString()) {
    throw new Error("You cannot apply to your own job posting");
  }

  // Prevent duplicate applications
  const existing = await Application.findOne({ applicant: applicantId, job: jobId });
  if (existing) throw new Error("You already applied for this job");

  const application = await Application.create({
    applicant: applicantId,
    job: jobId,
    resumeUrl,
  });

  // Push applicant into job’s applicant list
  await JobListing.findByIdAndUpdate(jobId, {
    $addToSet: { applicants: applicantId },
  });

  // Send emails in background (don’t block response)
//   sendEmail({
//     to: applicant.email,
//     subject: "Application Submitted Successfully",
//     template: "applicantSubmission.html",
//     variables: {
//       applicantName: applicant.name,
//       jobTitle: job.title,
//       company: job.company,
//     },
//   });

//   sendEmail({
//     to: job.createdBy.email,
//     subject: "New Applicant for Your Job Post",
//     template: "recruiterNotification.html",
//     variables: {
//       recruiterName: job.createdBy.name,
//       applicantName: applicant.name,
//       jobTitle: job.title,
//     },
//   });

  return application;
};

export const getApplicantsByJob = async (jobId: string) => {
  return Application.find({ job: jobId })
    .populate("applicant", "name email")
    .sort({ createdAt: -1 });
};

export const updateApplicationStatus = async (
  id: string,
  status: "shortlisted" | "rejected"
) => {
  const updated = await Application.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  if (!updated) throw new Error("Application not found");
  return updated;
};
