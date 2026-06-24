import path from "path";

export const uploadsDir = path.join(__dirname, "../uploads");

export const toUploadUrl = (filename: string) => `/uploads/${filename}`;
