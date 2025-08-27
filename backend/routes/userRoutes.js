import { Router } from "express";
const userRouter = Router();

userRouter.post('/signup', (req, res) => {
  res.send('User signup');
});

userRouter.post('/login', (req, res) => {
  res.send('User login');
});

userRouter.get("/", (req, res) => {
  res.send("User dashboard");
});

userRouter.get('/myCourses', (req, res) => {
  res.send('User courses');
});

userRouter.get('/profile', (req, res) => {
  res.send('User profile');
});

userRouter.put('/profile', (req, res) => {
  res.send('Update user profile');
});

userRouter.delete('/profile', (req, res) => {
  res.send('Delete user profile');
});

userRouter.post('/logout', (req, res) => {
  res.send('User logout');
});

export default userRouter;