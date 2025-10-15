import JobListing from "../models/JobListing";
import Application from "../models/Application";

export const getAnalyticsData = async () => {
  // ✅ Total jobs posted
  const totalJobs = await JobListing.countDocuments();

  // ✅ Total applications
  const totalApplications = await Application.countDocuments();

  // ✅ Average time between job post and first application
  const responseTimeAgg = await Application.aggregate([
    {
      $lookup: {
        from: "joblistings",
        localField: "job",
        foreignField: "_id",
        as: "jobData",
      },
    },
    { $unwind: "$jobData" },
    {
      $project: {
        diffInHours: {
          $divide: [
            { $subtract: ["$createdAt", "$jobData.createdAt"] },
            1000 * 60 * 60, // convert ms → hours
          ],
        },
      },
    },
    {
      $group: {
        _id: null,
        avgResponseHours: { $avg: "$diffInHours" },
      },
    },
  ]);

  const averageResponseTime =
    responseTimeAgg.length > 0
      ? Number(responseTimeAgg[0].avgResponseHours.toFixed(2))
      : 0;

  // ✅ Most applied-to roles
  const mostAppliedJobs = await Application.aggregate([
    {
      $group: {
        _id: "$job",
        totalApplicants: { $sum: 1 },
      },
    },
    {
      $sort: { totalApplicants: -1 },
    },
    {
      $limit: 5,
    },
    {
      $lookup: {
        from: "joblistings",
        localField: "_id",
        foreignField: "_id",
        as: "job",
      },
    },
    { $unwind: "$job" },
    {
      $project: {
        _id: 0,
        jobTitle: "$job.title",
        company: "$job.company",
        totalApplicants: 1,
      },
    },
  ]);

  return {
    totalJobs,
    totalApplications,
    averageResponseTime,
    mostAppliedJobs,
  };
};