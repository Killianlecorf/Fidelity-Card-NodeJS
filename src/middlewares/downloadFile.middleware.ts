import multer, { Multer } from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Répertoire de destination pour les fichiers téléchargés.
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname); // Renomme le fichier avec une chaîne unique.
  },
});

const upload: Multer = multer({ storage });

export { upload };
