import { z } from 'zod';

// Zod Schema for User Signup

// Preprocess to normalize empty strings to undefined
const preprocessEmptyString = (val) => val === "" ? undefined : val;

export const signupSchema = z.object({
      name: z.string().min(1, "Name is required"),
      email: z.email("Invalid email address"),
      password: z.string().min(6, "Password must be at least 6 characters long"),
      role: z.preprocess(preprocessEmptyString,
        z.enum(['student', 'teacher']).optional()
    ).default('student')
  });

// Zod Schema for User Login
export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required")
});