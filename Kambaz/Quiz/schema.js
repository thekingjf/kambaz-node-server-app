import mongoose from "mongoose";
const quizSchema = new mongoose.Schema({
    courseId: String,
    title: { type: String, default: "New Quiz" },
    description: String,
    published: { type: Boolean, default: false },
    availableDate: Date,
    untilDate: Date,
    dueDate: Date,
    points: Number,
    shuffleAnswers: { type: Boolean, default: false },
    timeLimitEnabled: { type: Boolean, default: false },
    timeLimitMinutes: Number,
  },
  { collection: "quizzes" }
);
export default quizSchema;