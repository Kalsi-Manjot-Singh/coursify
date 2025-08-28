import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  modules: [{
    title: { type: String, required: true },
    content: { type: String },
    contentType: { type: String, enum: ['video', 'text', 'pdf'], default: 'text' },
    order: { type: Number },
  }],
  category: { type: String },
  tags: [{ type: String }],
  ratings: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5 },
    review: { type: String },
  }],
  averageRating: { type: Number, default: 0 },
  enrolledStudents: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  thumbnail: { type: String },
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;
