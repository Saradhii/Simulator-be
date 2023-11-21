import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

interface User {
  email: string;
  password: string;
}

// Define your own types for the JWT payload and verification errors

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  console.log(req.cookies,"req.cookies");
  const token = req.cookies.jwt;
  console.log("token",token);
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


