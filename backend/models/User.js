import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student',
  },
  purchasedCourses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course',
  }],
  createdCourses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course',
  }]
}, { timestamps: true }); 

const User = mongoose.model('User', userSchema);

export default User;