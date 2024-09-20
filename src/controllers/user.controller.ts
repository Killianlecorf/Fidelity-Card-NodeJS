import { Request, Response, NextFunction } from 'express';
import { User, IUser } from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { PendingUser } from '../models/pendingUser.models';

dotenv.config();

// redirection /redirect

export const getRedirection = async (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (token) {
    res.status(302).json({ redirectUrl: '/home' });
  } else {
    res.status(401).send('Unauthorized');
  }
}

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
  const { verificationCode } = req.body;

  try {
    if (!verificationCode ) {
      return res.status(400).json({ error: 'Veuillez entrer votre email et code de vérification.' });
    }

    const pendingUser = await PendingUser.findOne({ verificationCode });
    if (!pendingUser) {
      return res.status(404).json({ error: 'Code de vérification ou email incorrect.' });
    }

    const existingUser = await User.findOne({ verificationCode });
    if (existingUser) {
      return res.status(409).json({ error: 'Cet utilisateur existe déjà.' });
    }

    const hashedPassword = await bcrypt.hash(pendingUser.password, 10);

    const newUser = new User({
      email: pendingUser.email,
      password: hashedPassword,
      name: pendingUser.name,
      lname: pendingUser.lname,
      theme: {
        mainColor: "#483CE8",
        secondaryColor: "#857df8"
      },
      modality: {
        amountMax: 0,
        amountReduction: 0
      }
    });

    await newUser.save();

    await PendingUser.deleteOne({ _id: pendingUser._id });

    const secretKey = process.env.JWT_SECRET; 
    const token = jwt.sign({ userId: newUser._id }, secretKey);

    const cookieOptions = {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    };

    res.cookie('token', token, cookieOptions);
    res.status(201).json({ user: newUser, token });
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