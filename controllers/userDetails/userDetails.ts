import { Request, Response } from 'express';
import SimulatorUserModel, { SimulatorUser } from '../../models/userModel';
import dotenv from "dotenv";
dotenv.config();

export const userDetails = async (req: Request, res: Response) => {
  const user = req.user;
  // check if token have a user
  if (!user) {
    return res.status(400).json({ status: 'failure', error: 'Email and password are required.' });
  }
  try {
    // Check if the user exists with the provided email and password
    const email = user?.email;
    const userData: SimulatorUser | null = await SimulatorUserModel.findOne({ email });
    if (!userData) {
      return res.status(404).send('User not found.');
    }
    if (userData) {
      // User found, you can send a success response or perform further actions
      userData.password="*****";
      return res.status(200).json({ status: 'success',data:userData, message: 'Login successful' });
    } else {
      // User not found
      return res.status(404).json({ status: 'failure', error: 'User not found' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ status: 'failure', error: 'Internal server error' });
  }
};
