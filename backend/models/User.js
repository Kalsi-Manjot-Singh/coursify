import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim:true
  },
  password: {
    type: String,
    required: true,
    trim:true
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student',
  },
  purchasedCourses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course',
    default: []
  }],
  createdCourses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course',
    default: []
  }]
}, { timestamps: true }); 

const User = mongoose.model('User', userSchema);

export default User;