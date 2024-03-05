// import { Request, Response } from 'express';
// import { User, IUser } from '../models/user.model';

// export const uploadFile = async (req: Request, res: Response) => {
//   if (!req.file) {
//     return res.status(400).send('Aucun fichier n\'a été téléchargé.');
//   }

//   try {
//     const file = req.file;
//     const userId = req.user._id;

//     // Vérification 1 : Limitez les types de fichiers acceptés (par exemple, autorisez uniquement les images)
//     const allowedFileTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
//     if (!allowedFileTypes.includes(file.mimetype)) {
//       return res.status(400).send('Type de fichier non autorisé.');
//     }

//     // Vérification 2 : Assurez-vous que l'utilisateur existe
//     const user: IUser | null = await User.findOne({ _id: userId });
//     if (!user) {
//       return res.status(404).send('Utilisateur non trouvé.');
//     }

//     // Vérification 3 : Limitez le nombre de fichiers téléchargés par utilisateur si nécessaire
//     if (user.theme.uploadedFiles.length >= 10) {
//       return res.status(400).send('Limite de fichiers atteinte.');
//     }

//     // D'autres vérifications et actions de contrôle peuvent être ajoutées ici.
//     user.theme.uploadedFiles.push({
//       fileName: req.file.filename,
//       filePath: `/uploads/${req.file.filename}`,
//       uploadedBy: userId,
//     });
//     await user.save();

//     res.status(200).send('Fichier téléchargé avec succès.');
//   } catch (error) {
//     console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
//     res.status(500).send('Erreur lors de la mise à jour de l\'utilisateur.');
//   }
// };
