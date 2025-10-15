import mongoose, { Schema, Document } from "mongoose";

export interface IJobListing extends Document {
  title: string;
  description: string;
  company: string;
  location: string;
  salary?: number;
  remote?: boolean;
  techStack?: string[];
  requirements: string[];
  responsibilities: string[];
  createdBy: mongoose.Types.ObjectId;
  applicants: mongoose.Types.ObjectId[];
}

const jobSchema = new Schema<IJobListing>(
  {
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: Number,
    remote: { type: Boolean, default: false },
    techStack: [String],
    requirements: [String],
    responsibilities: [String],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    applicants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

// Text index for search
jobSchema.index({ title: "text", company: "text", location: "text" });
// jobSchema.index({ location: 1, techStack: 1 });

export default mongoose.model<IJobListing>("JobListing", jobSchema);
