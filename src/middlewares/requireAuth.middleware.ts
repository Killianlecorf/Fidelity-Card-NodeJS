import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ isAuthenticated: false });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    (req as any).user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ isAuthenticated: false });
  }
  return true
};
