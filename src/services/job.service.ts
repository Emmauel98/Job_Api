import JobListing from "../models/JobListing";
import { FilterQuery } from "mongoose";

export const createJob = async (jobData: any, userId: string) => {
  return await JobListing.create({ ...jobData, createdBy: userId });
};

export const getJobById = async (jobId: string) => {
  return await JobListing.findById(jobId).populate("createdBy", "name email role");
};

export const updateJob = async (jobId: string, updates: any) => {
  return await JobListing.findByIdAndUpdate(jobId, updates, { new: true });
};

export const deleteJob = async (jobId: string) => {
  return await JobListing.findByIdAndDelete(jobId);
};

// Advanced filtering, search, and pagination
export const getJobs = async (query: any) => {
  const {
    location,
    salaryMin,
    salaryMax,
    remote,
    techStack,
    search,
    page = 1,
    limit = 10,
    sort = "-createdAt",
  } = query;

  const filter: FilterQuery<any> = {};

  if (location) filter.location = { $regex: location, $options: "i" };
  if (remote) filter.remote = remote === "true";
  if (techStack) filter.techStack = { $in: techStack.split(",") };
  if (salaryMin || salaryMax)
    filter.salary = {
      ...(salaryMin ? { $gte: Number(salaryMin) } : {}),
      ...(salaryMax ? { $lte: Number(salaryMax) } : {}),
    };
  if (search)
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];

  const skip = (Number(page) - 1) * Number(limit);

   const key = `jobs:${JSON.stringify(query)}`;

  // Check cache
//   const cached = await getCachedData(key);
//   if (cached) {
//     console.log("⚡ Served from Redis cache");
//     return cached;
//   }

  const [jobs, total] = await Promise.all([
    JobListing.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .populate("createdBy", "name email role"),
    JobListing.countDocuments(filter),
  ]);

  return {
    jobs,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
  };
};
