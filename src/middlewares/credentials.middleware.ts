import { Request, Response, NextFunction } from 'express';

export const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', ' POST'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true'); // Inclure les credentials (cookies) dans les requêtes
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
};