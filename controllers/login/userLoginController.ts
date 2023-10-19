import { Request, Response } from 'express';
import SimulatorUserModel, { SimulatorUser } from '../../models/userModel';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate email and password (you can add more validation logic as needed)
  if (!email || !password) {
    return res.status(400).json({ status: 'failure', error: 'Email and password are required.' });
  }

  try {
    // Check if the user exists with the provided email and password
    const user: SimulatorUser | null = await SimulatorUserModel.findOne({ email });

    if (!user) {
      return res.status(404).send('User not found.');
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send('Invalid credentials.');
    }
    
    if (user) {
      // User found, you can send a success response or perform further actions
      const token = jwt.sign({ user }, `${process.env.JWT_SECREAT}`, { expiresIn: '1h' });
      res.cookie('jwt', token, {
        httpOnly: true,  // Cookie not accessible via client-side scripts
        secure: process.env.NODE_ENV === 'production',  // Send only over HTTPS in production
        sameSite: 'strict',  // Limit cookie to same-site requests
        maxAge: 3600000,  // Expiry time in milliseconds (e.g., 1 hour)
      });
      console.log("cookie is set");
      return res.status(200).json({ status: 'success', message: 'Login successful' });
    } else {
      // User not found
      return res.status(404).json({ status: 'failure', error: 'User not found' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ status: 'failure', error: 'Internal server error' });
  }
};
