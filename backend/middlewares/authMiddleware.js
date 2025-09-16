import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";

export const authMiddleware = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('No token provided', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.USER_JWT_SECRET);
    req.user = decoded; 
    next(); 
  } catch (error) {
    throw new AppError('Invalid Token', 401);
  }
};

export const roleCheck = (...allowedRoles) => {
  return (req,res,next) => {
    if(!req.user) {
      throw new AppError("User not found", 401);
    }
    if(!allowedRoles.includes(req.user.role)) {
      throw new AppError("Forbidden", 403);
    }

    next();
  }
}