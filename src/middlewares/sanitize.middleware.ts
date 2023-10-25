import { Request, Response, NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';
import sanitize from 'sanitize-filename';

export const sanitizeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.files && req.files.file) {
    const uploadedFiles: UploadedFile[] | UploadedFile = req.files.file;

    if (Array.isArray(uploadedFiles)) {
      for (const uploadedFile of uploadedFiles) {
        if (uploadedFile.name) {
          uploadedFile.name = sanitize(uploadedFile.name);
        }
      }
    } else {
      if (uploadedFiles.name) {
        uploadedFiles.name = sanitize(uploadedFiles.name);
      }
    }
  }

  next();
};

export default sanitize