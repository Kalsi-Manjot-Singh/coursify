import { Router } from "express";
const courseRouter = Router();

courseRouter.get('/', (req, res) => {
  res.send("All courses");
});

courseRouter.get('/course', (req, res) => {
  res.send("Information about a specific course");
});

courseRouter.post('/course/purchase', (req, res) => {
  res.send("Purchase a course");
});

export default courseRouter;