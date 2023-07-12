import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import dotenv from 'dotenv';

dotenv.config();

interface DecodedToken {
  userId: string;
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Vérifier si le jeton d'authentification est présent dans le cookie
        const token = req.cookies.token;
    
        if (!token) {
          return res.status(401).json({ error: 'Authentification requise.' });
        }
    
        // Vérifier et décoder le jeton d'authentification
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;
    
        // Vérifier si l'utilisateur associé au jeton existe
        const user = await User.findById(decodedToken.userId);
    
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé.' });
        }
    
        // Ajouter l'utilisateur au corps de la requête pour une utilisation ultérieure
        req.user = user;
    
        // Poursuivre l'exécution de la prochaine fonction middleware
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'Jeton d\'authentification invalide.' });
    }
};