import { Request, Response, NextFunction } from 'express';
import fileUpload, { UploadedFile } from 'express-fileupload';
const ClamScan = require('clamscan');

const clamscan = new ClamScan();

export const antivirusMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.files && req.files.file) {
    const uploadedFiles: UploadedFile[] | UploadedFile = req.files.file;

    if (Array.isArray(uploadedFiles)) {
      for (const uploadedFile of uploadedFiles) {
        clamscan.isInfected(uploadedFile.data, (err: any, isInfected: any) => {
          if (err) {
            console.error('Erreur lors de l\'analyse antivirus :', err);
            return res.status(500).send('Erreur lors de l\'analyse antivirus.');
          }

          if (isInfected) {
            return res.status(400).send('Un des fichiers est infecté par un logiciel malveillant.');
          }
        });
      }

      next();
    } else {
      clamscan.isInfected(uploadedFiles.data, (err: any, isInfected: any) => {
        if (err) {
          console.error('Erreur lors de l\'analyse antivirus :', err);
          return res.status(500).send('Erreur lors de l\'analyse antivirus.');
        }

        if (isInfected) {
          return res.status(400).send('Le fichier est infecté par un logiciel malveillant.');
        }

        next();
      });
    }
  } else {
    return res.status(400).send('Aucun fichier n\'a été téléchargé.');
  }
};
