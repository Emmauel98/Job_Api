import request from "supertest";
import { app } from "../../server/index";

describe("Job Routes", () => {
  it("should return 401 when creating job without auth", async () => {
    const res = await request(app).post("/api/jobs").send({ title: "Test Job" });
    expect(res.status).toBe(401);
  });
});
