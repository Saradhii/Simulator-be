import { Request, Response } from 'express';
import SimulatorUserModel, { SimulatorUser } from '../../models/userModel';

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate email and password (you can add more validation logic as needed)
  if (!email || !password) {
    return res.status(400).json({ status: 'failure', error: 'Email and password are required.' });
  }

  try {
    // Check if the user exists with the provided email and password
    const user: SimulatorUser | null = await SimulatorUserModel.findOne({
      email,
      password,
    });

    if (user) {
      // User found, you can send a success response or perform further actions
      console.log('User email:', email);
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
