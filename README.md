# Coursify 🎓

Coursify is a full-stack MERN application for creating and selling online courses.  
This repository currently contains the **backend** built with Express.js. The **frontend** (React) will be added later.

---

## Features (Backend so far)

- **User routes**
  - Signup, login, logout
  - Dashboard
  - View and update profile
  - View purchased courses

- **Course routes**
  - Get all courses
  - Get a specific course
  - Purchase a course

- **Admin routes**
  - Signup, login, logout
  - Dashboard
  - Manage profile
  - Create and manage courses

---

## Tech Stack

- **Backend:** Node.js, Express.js  
- **Frontend:** React (planned)  
- **Database:** MongoDB (planned)

---
## 📂 Project Structure
.
└── backend
    ├── index.js              # Entry point for the server
    ├── package.json          # Project dependencies and scripts
    ├── package-lock.json     # Dependency lock file
    └── routes/               # API route handlers
        ├── adminRoutes.js
        ├── courseRoutes.js
        └── userRoutes.js

## Getting Started

### Prerequisites
- Node.js (>= 18.x recommended)  
- npm

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd coursify
```

### 2. Install backend Dependencies
```bash
cd backend
npm install
```

### 3. Setup environment variables
Create a .env file inside the backend/ folder
```bash
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
_(for now only PORT is being used — the rest will come into play when database/auth is added)_


### 4. Run the server
```bash
npm run dev   # with nodemon (recommended)
# or
npm start     # plain node
```

The server will run on:
[Link Text](http://localhost:3000)

## 📝 TODO / Roadmap

### Phase 1: Backend (Express + MongoDB)
- [x] Setup MongoDB connection (Mongoose)
- [x] Create User model (student/admin roles)
- [x] Implement user registration & login (with JWT)
- [ ] Protect routes with authentication middleware
- [x] Build Course model (title, description, lessons, etc.)
- [ ] Add CRUD APIs for courses (admin only)
- [ ] Add API for students to enroll in courses
- [ ] API for fetching enrolled courses per student

### Phase 2: Frontend (React)
- [ ] Setup React with Vite (or CRA)
- [ ] Configure React Router (Home, Courses, Dashboard, Login)
- [ ] Build Auth pages (Signup, Login)
- [ ] Connect frontend auth to backend (JWT storage in localStorage)
- [ ] Build Courses page (list of all courses)
- [ ] Build Course details page (enroll button)
- [ ] Student Dashboard (show enrolled courses)
- [ ] Admin Dashboard (create/update/delete courses)

### Phase 3: Extras / Polish
- [ ] Add password hashing (bcrypt)
- [ ] Add request validation (Joi/Zod or express-validator)
- [ ] Add error handling middleware
- [ ] Add loading states + toast notifications in frontend
- [ ] Add protected routes in frontend (students/admins)

### Phase 4: Deployment
- [ ] Setup environment variables for production
- [ ] Deploy backend (Render / Railway / Heroku)
- [ ] Deploy frontend (Vercel / Netlify)
- [ ] Connect to MongoDB Atlas (cloud DB)
- [ ] Final testing & polish