import mongoose from "mongoose";

const choiceSchema = mongoose.Schema(
  {
    _id : String,
    text : String,
    isCorrect : Boolean
  },
  { _id : false }
);

const questionSchema = new mongoose.Schema(
  {
    _id : String,
    quizId : String,
    type : {
      type: String,
      enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_BLANK"],
      default: "MULTIPLE_CHOICE",
    },
    title : String,
    points : {
      type : Number,
      default : 1,
    },
    questionText : String,
    choices : [choiceSchema],
    correctBoolean : Boolean,
    correctAnswer : [String],
  },
  {collation : "questions"}
);

export default questionSchema;