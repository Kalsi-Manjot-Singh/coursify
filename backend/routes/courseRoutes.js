import { Router } from "express";
import { authMiddleware  } from "../middlewares/authMiddleware.js";
const courseRouter = Router();

courseRouter.get('/', (req, res) => {
  res.send("All courses");
});

courseRouter.get('/course', (req, res) => {
  res.send("Information about a specific course");
});

courseRouter.post('/course/purchase', authMiddleware, (req, res) => {
  res.send("Purchase a course");
});

export default courseRouter;