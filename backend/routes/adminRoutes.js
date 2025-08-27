import { Router } from "express";
const adminRouter = Router();

adminRouter.post("/signup", (req, res) => {
  res.send("Admin signup");
});

adminRouter.post("/login", (req, res) => {
  res.send("Admin login");
});

adminRouter.get("/", (req, res) => {
  res.send("Admin dashboard");
});

adminRouter.get("/myCourses", (req, res) => {
  res.send("course created by the admin");
});

adminRouter.post("/course", (req, res) => {
  res.send("create a course");
});

adminRouter.get("/profile", (req, res) => {
  res.send("Admin profile");
});

adminRouter.put("/profile", (req, res) => {
  res.send("Update user profile");
});

adminRouter.delete("/profile", (req, res) => {
  res.send("Delete user profile");
});

adminRouter.post("/logout", (req, res) => {
  res.send("Admin logout");
});

export default adminRouter;
