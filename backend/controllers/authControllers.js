import dotenv from 'dotenv';
dotenv.config();
import { z } from 'zod';
import bcrypt from 'bcrypt';
import generateTokens from "../utils/generateToken.js";
import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import { signupSchema, loginSchema } from '../validations/authSchemas.js';

// !TODO: refresh token implementaion | Rate Limiting 

// User Signup
export const signup = async (req, res) => {
  try {
    const result = signupSchema.safeParse(req.body);
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
  try {
    const result = loginSchema.safeParse(req.body);
    if(!result.success) {
      throw new AppError("Validation Error", 400, true, result.error.issues);
    }
    const { email, password } = result.data;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      throw new AppError("Invalid Credentials", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(isPasswordValid) {
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