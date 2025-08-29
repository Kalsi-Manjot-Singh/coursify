import dotenv from 'dotenv';
dotenv.config();
import { z } from 'zod';
import bcrypt from 'bcrypt';
import generateTokens from "../utils/generateToken.js";
import User from '../models/User.js';

// User Signup
export const signup = async (req, res) => {

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
    console.error(result.error)
    return res.status(400).json({
      success: false,
      message: "Bad Request"
    });
  }
  const { name, email, password, role } = result.data;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
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
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
}