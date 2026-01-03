import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model'; // user.model.ts eka
import { generateToken } from '../utils/generateToken'; // token utility eka

// --- 1. User Registration ---
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields.' });
  }

  try {
    // 1. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // 2. Create new user (password will be hashed by the User model pre-save hook)
    const user = await User.create({
      name,
      email,
      password, // Don't hash here - the model will do it
      role: role || 'user',
    });

    // 3. Generate token and send response
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id.toString()),
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error during registration.' });
  }
};

// --- 2. User Login ---
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields.' });
  }

  try {
    // 1. User kenek innawada balanawa
    const user = await User.findOne({ email });

    // 2. Password eka check kirima
    if (user && (await bcrypt.compare(password, user.password as string))) {
      // 3. Login success nam, token eka hadala send kirima
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error during login.' });
  }
};