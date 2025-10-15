import multer, { FileFilterCallback } from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";
import { Request } from "express";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "resumes",
    allowed_formats: ["pdf", "doc", "docx"],
    resource_type: "raw", // raw = for non-image files
  } as any,
});

// File filter to ensure only resume file types are uploaded
const fileFilter: multer.Options["fileFilter"] = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  const allowedMimeTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .pdf, .doc, and .docx files are allowed!"));
  }
};

// Limit file size to, say, 5MB 
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
