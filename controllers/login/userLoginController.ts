import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import SimulatorUserModel, { SimulatorUser } from '../../models/userModel';
import bcrypt from "bcrypt";

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
    const usetDetails = await bcrypt.compare(password, user.password);

    if (!usetDetails) {
      return res.status(401).send('Invalid credentials.');
    }
    if (user) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
      // res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000, sameSite: 'none', secure: true });
      console.log("jwt is sent");
      return res.status(200).json({ status: 'success', message: 'Login successful',token:token});
    } else {
      // User not found
      return res.status(404).json({ status: 'failure', error: 'User not found' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ status: 'failure', error: 'Internal server error' });
  }
};



