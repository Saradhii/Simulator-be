import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

interface User {
  email: string;
  password: string;
}

// Types for JWT payload and verification errors
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(403).json({ status: 'failure', error: 'Token not provided or invalid format' });
  }
  else{
      // Extract just the token part after 'Bearer '
      const token = authHeader.split(' ')[1];
      jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decodedToken: any) => {
        if (err) {
          res.status(500).json({ error: 'Authentication error' });
        } else if (decodedToken) {
          req.user = decodedToken.user;
          console.log("user in auth",req.user);
          next();
        }
      });
    }
  }


