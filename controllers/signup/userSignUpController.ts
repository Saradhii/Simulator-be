import { Request, Response } from 'express';
import SimulatorUserModel, { SimulatorUser } from '../../models/userModel';
import bcrypt from "bcrypt";

export const userSignUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Hash the password before storing it (you can use bcrypt)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser: SimulatorUser = new SimulatorUserModel({
      email,
      password: hashedPassword,  // Store the hashed password
    });

    // Save the user to the database
    await newUser.save();
    return res.status(200).json({ status: 'success', message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error during user registration:', error);
    return res.status(500).json({ status: 'failure', error: 'Internal server error' });
  }
};
