import { Router } from "express";
import { authMiddleware, roleCheck } from "../middlewares/authMiddleware.js";
const adminRouter = Router();

adminRouter.post("/signup", (req, res) => {
  res.send("Admin signup");
});

adminRouter.post("/login", (req, res) => {
  res.send("Admin login");
});

adminRouter.use(authMiddleware, roleCheck("admin"));

adminRouter.get("/", (req, res) => {
  res.send("Admin dashboard");
});

adminRouter.get("/myCourses", authMiddleware, (req, res) => {
  res.send("course created by the admin");
});

adminRouter.post("/course", authMiddleware, (req, res) => {
  res.send("create a course");
});

adminRouter.get("/profile", authMiddleware, (req, res) => {
  res.send("Admin profile");
});

adminRouter.put("/profile", authMiddleware, (req, res) => {
  res.send("Update user profile");
});

adminRouter.delete("/profile", authMiddleware, (req, res) => {
  res.send("Delete user profile");
});

adminRouter.post("/logout", (req, res) => {
  res.send("Admin logout");
});

export default adminRouter;
