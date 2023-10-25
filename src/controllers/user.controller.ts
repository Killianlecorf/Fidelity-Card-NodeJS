import { Request, Response, NextFunction } from 'express';
import { User, IUser } from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { upload } from '../middlewares/downloadFile.middleware';

dotenv.config();

// GET /users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des utilisateurs.' });
  }
};

// GET /users/:id
export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).populate('entreprise');
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de l\'utilisateur.' });
  }
};

export const isAuth = (req: Request, res: Response) => {
  return res.json({ isAuthenticated: true });
}

export const deleteCookie = (req : Request, res : Response ) => {
    res.clearCookie('token', { httpOnly: true, expires: new Date(0) }).send('Cookie supprimé !');
}


export const createUser = async (req: Request, res: Response) => {
    const userData: IUser = req.body;
  
    try {
      const { email, password, name, theme } = userData;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: 'Cet utilisateur existe déjà.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);


      const user = new User({
        email,
        password: hashedPassword,
        name,
        theme: {
          mainColor: theme.mainColor,
          secondaryColor: theme.secondaryColor
        }
        // ... autres données de l'utilisateur
      });
  
      await user.save();
  
      const secretKey = process.env.JWT_SECRET; 
      const token = jwt.sign({ userId: user._id }, secretKey);
  
      const cookieOptions = {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      };
  
      res.cookie('token', token, cookieOptions);
  
      res.json({ user, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'utilisateur.' });
    }
  };

  export const getInformationUser = (req: Request, res: Response) => {
    const token = req.cookies.token; 

    try {
      if (!token) {
        return res.status(401).json({ message: 'JWT manquant' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET) as { [key: string]: any };

      res.json(decoded);
    } catch (error) {
      res.status(401).json({ message: 'JWT invalide' });
    }
  };

  export const getUserLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({ error: 'L\'adresse e-mail est incorrect.' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'le mot de passe est incorrect.' });
      }
  
      const secretKey = process.env.JWT_SECRET; 
      const token = jwt.sign({ userId: user._id }, secretKey);

      const cookieOptions = {
        httpOnly: true,
        path: '/'
      };
      res.cookie('token', token, cookieOptions);

      res.json({ user, token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la connexion.' });
    }
  };

// PUT /users/:id
export const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const userData: IUser = req.body;
  
    try {
      if (userData.password) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
      }
  
      const user = await User.findByIdAndUpdate(userId, userData, { new: true });
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé.' });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de l\'utilisateur.' });
    }
};

  // DELETE /users/:id
  export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé.' });
      }
      res.json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (error) {
      res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de l\'utilisateur.' });
    }
  };

export const handleFileUpload = upload.single('file'); // Assurez-vous que 'file' correspond au nom du champ du formulaire.

export const uploadFile = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Aucun fichier n\'a été téléchargé' });
  }

  // Enregistrez le chemin du fichier ou les informations pertinentes dans votre base de données.

  res.json({ message: 'Fichier téléchargé avec succès' });
};