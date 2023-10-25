import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const userDetails = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401).json({ error: 'Access denied, token missing!' });
  } else {
    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decodedToken: any) => {
      if (err) {
        res.status(500).json({ error: 'Authentication error' });
      } else if (decodedToken) {
        req.user = decodedToken.user;
        next();
      }
    });
  }
};


