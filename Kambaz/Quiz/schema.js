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
    quizType: {
      type: String,
      enum: ["GRADED_QUIZ", "PRACTICE_QUIZ", "GRADED_SURVEY", "UNGRADED_SURVEY"],
      default: "GRADED_QUIZ"
    },
    assignmentGroup: { type: Boolean, default: false},
    timeLimitEnabled: { type: Boolean, default: false },
    timeLimitMinutes: Number,
    multipleAttempts: { type: Boolean, default: false},
    maxAttempts: { type: Number, default: 1 },
    showCorrectAnswers: {
      type: String,
      enum: ["ALWAYS", "NEVER", "AFTER_DUE_DATE"],
      default: "ALWAYS",
    },
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    shuffleAnswers: { type: Boolean, default: false },

  },
  { collection: "quizzes" }
);
export default quizSchema;