import dotenv from 'dotenv';
dotenv.config();
import { z } from 'zod';
import bcrypt from 'bcrypt';
import generateTokens from "../utils/generateToken.js";
import User from '../models/User.js';
import AppError from '../utils/AppError.js';

// !TODO: Zod validation for login inputs | refresh token implementaion | Rate Limiting | zod email validation 

// User Signup
export const signup = async (req, res) => {
  try {
    // Preprocess to normalize empty strings to undefined
    const preprocessEmptyString = (val) => val === "" ? undefined : val;

    const schema = z.object({
      name: z.string().min(1, "Name is required"),
      email: z.email("Invalid email address"),
      password: z.string().min(6, "Password must be at least 6 characters long"),
      role: z.preprocess(preprocessEmptyString,
        z.enum(['student', 'teacher']).optional()
    ).default('student')
  });
  
  const result = schema.safeParse(req.body);
  
  if(!result.success) {
    throw new AppError("Validation Error", 400, true, result.error.issues);
  }
  const { name, email, password, role } = result.data;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new AppError("A user already exists with this email", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'student'
    });

    const { accessToken } = generateTokens(newUser);

    res.status(201).json({
      success: true,
      message: "User registered Successfully",
      token: accessToken,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Server Error", 500, false);
  }
}

// User Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      throw new AppError("Invalid Credentials", 401);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if(passwordMatch) {
      const { accessToken } = generateTokens(user);
      return res.status(200).json({
        success: true,
        message: "Successfully logged in",
        token: accessToken,
        user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
      })
    } else {
      throw new AppError("Invalid Credentials", 401);
    }
  } catch (error){
    console.error(error);
    if (error instanceof AppError) throw error;
    throw new AppError("Server Error", 500, false);
  }
}