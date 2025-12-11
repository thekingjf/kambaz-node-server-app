import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
    {
        questionId: String,
        choiceId: String,
        booleanAnswer: Boolean,
        fillAnswers: [String],
        isCorrect: Boolean
    },
    { _id: false }
);

const quizAttemptSchema = new mongoose.Schema(
    {
      quizId: String,
      courseId: String,
      studentId: String,
  
      attemptNumber: Number,
  
      startedAt: { type: Date, default: Date.now },
      submittedAt: Date,
  
      score: Number,
      maxScore: Number,
  
      answers: [answerSchema],
    },
    { collection: "quiz_attempts" }
);