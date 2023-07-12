import { Request, Response, NextFunction } from 'express';
import { User, IUser } from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

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
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de l\'utilisateur.' });
  }
};


export const createUser = async (req: Request, res: Response) => {
    const userData: IUser = req.body;
  
    try {
      const { email, password, name } = userData;
  
      // Vérifier si l'utilisateur existe déjà dans la base de données
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: 'Cet utilisateur existe déjà.' });
      }
  
      // Hacher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Créer l'utilisateur avec le mot de passe haché et le champ name
      const user = new User({
        email,
        password: hashedPassword,
        name,
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

  export const getUserLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      // Vérifier si l'utilisateur existe dans la base de données
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({ error: 'L\'adresse e-mail est incorrect.' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'le mot de passe est incorrect.' });
      }
  
      // Générer un JWT
      const secretKey = process.env.JWT_SECRET; 
      const token = jwt.sign({ userId: user._id }, secretKey);

      const cookieOptions = {
        httpOnly: true
      };
  
      res.cookie('token', token, cookieOptions);
  
      // Envoyer la réponse avec le JWT
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
      // Vérifier si le mot de passe est modifié
      if (userData.password) {
        // Hasher le nouveau mot de passe
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
