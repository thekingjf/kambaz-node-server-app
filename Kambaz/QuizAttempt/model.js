import mongoose from "mongoose";
import schema from "./schema.js";

const QuizAttemptModel = mongoose.model("QuizAttemptModel", schema);
export default QuizAttemptModel;