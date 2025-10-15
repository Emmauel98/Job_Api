import * as jobService  from "../../services/job.service";
import Job from "../../models/JobListing";

jest.mock("../../models/JobListing");

describe("Job Service", () => {
  afterEach(() => jest.clearAllMocks());

  it("creates a job", async () => {
    const mockJob = { title: "Backend Engineer" };
    (Job.create as jest.Mock).mockResolvedValue(mockJob);

    const result = await jobService.createJob(mockJob, "123");
    expect(Job.create).toHaveBeenCalledWith({ ...mockJob, createdBy: "123" });
    expect(result).toEqual(mockJob);
  });
});
