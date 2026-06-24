import path from "path";
import express from "express";
import { Request, Response } from 'express'
import multer from "multer";
import { toUploadUrl, uploadsDir } from "../utils/uploadsPath";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file: any, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file: any, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file: any, cb: any) {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb("Images only");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file: any, cb: any) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.array("image", 10), (req: Request, res: Response) => {
  const files = (req.files as Express.Multer.File[]) || [];

  res.json(
    files.map((file) => ({
      filename: file.filename,
      url: toUploadUrl(file.filename),
    }))
  );
});

export default router;