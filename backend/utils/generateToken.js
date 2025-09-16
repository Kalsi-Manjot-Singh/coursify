import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken"

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role, email:user.email },
    process.env.USER_JWT_SECRET,
    { expiresIn: "1h" }
  );
  // !TODO: Refresh Tokens and http cookie storage
  return { accessToken };
};

export default generateTokens