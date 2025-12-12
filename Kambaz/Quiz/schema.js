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
    assignmentGroup: {
      type: String,
      enum: ["Quizzes", "Exams", "Assignments", "Projects"],
      default: "Quizzes"
    },
    timeLimitEnabled: { type: Boolean, default: true },
    timeLimitMinutes:  { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false},
    maxAttempts: { type: Number, default: 1 },
    showCorrectAnswers: { type: Boolean, default: false },
    showCorrectAnswersAt: Date,
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    shuffleAnswers: { type: Boolean, default: true },

  },
  { collection: "quizzes" }
);
export default quizSchema;