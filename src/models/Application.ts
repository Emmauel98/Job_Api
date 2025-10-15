import mongoose, { Schema, Document } from "mongoose";

export interface IApplication extends Document {
  applicant: mongoose.Types.ObjectId;
  job: mongoose.Types.ObjectId;
  resumeUrl: string;
  status: "pending" | "shortlisted" | "rejected";
}

const applicationSchema = new Schema<IApplication>(
  {
    applicant: { type: Schema.Types.ObjectId, ref: "User", required: true },
    job: { type: Schema.Types.ObjectId, ref: "JobListing", required: true },
    resumeUrl: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "shortlisted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });


export default mongoose.model<IApplication>("Application", applicationSchema);
