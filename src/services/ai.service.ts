// import NodeCache from "node-cache";
// import pdfParse from "pdf-parse";
// import { aiGenerate } from "./ai/ai.provider";
// import { IJobListing } from "../models/JobListing";

// const aiCache = new NodeCache({ stdTTL: 60 * 60 });

// // ✅ Generate Job Description
// export const generateJobDescription = async (role: string, keywords: string[]) => {
//   const cacheKey = `${role}-${keywords.join(",")}`;
//   const cached = aiCache.get(cacheKey);
//   if (cached) return cached;

//   const prompt = `
//   Write a detailed job description for the role "${role}".
//   Include: Overview, Responsibilities, Required Skills, and Benefits.
//   Keywords: ${keywords.join(", ")}.
//   Make it professional and engaging.
//   `;

//   const jobDescription = await aiGenerate(prompt);
//   aiCache.set(cacheKey, jobDescription);
//   return jobDescription;
// };

// // ✅ Extract Skills from Resume (PDF)
// export const extractSkillsFromResume = async (fileBuffer: Buffer): Promise<string[]> => {
//   const pdfData = await pdfParse(fileBuffer);
//   const text = pdfData.text;

//   const prompt = `
//   Extract key technical and soft skills from this resume text.
//   Return only a JSON array of skills.
  
//   Resume Text:
//   ${text}
//   `;

//   const response = await aiGenerate(prompt);
//   try {
//     return JSON.parse(response);
//   } catch {
//     // fallback if AI returns text
//     return response.split(",").map((s) => s.trim()).filter(Boolean);
//   }
// };

// // ✅ Match Resume to Job Requirements
// export const matchResumeToJob = (resumeSkills: string[], job: IJobListing) => {
//   const jobSkills = job.requirements.map((r) => r.toLowerCase());
//   const matchedSkills = resumeSkills.filter((s) => jobSkills.includes(s.toLowerCase()));
//   const matchPercentage = Math.round((matchedSkills.length / jobSkills.length) * 100);
//   return { matchPercentage, matchedSkills };
// };

// // ✅ Optional: Interview Questions Generator
// export const generateInterviewQuestions = async (jobDescription: string) => {
//   const prompt = `
//   Based on the following job description, generate 5 technical and 3 behavioral interview questions:
//   ${jobDescription}
//   `;
//   return aiGenerate(prompt);
// };


// ⚡ To Run
// Using OpenAI
// npm install openai
// export AI_PROVIDER=openai
// npm run dev

// Using Ollama
// npm install axios
// ollama serve
// export AI_PROVIDER=ollama
// npm run dev