import QuestionModel from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function QuestionDao() {
    const findQuestionsForQuiz = (quizId) => {
        QuestionModel.find(quizId)
    };

    const createQuestionForQuiz = (quizId) => QuestionModel.create({
            _id : uuidv4(),
            quizId,
            type : "MULTIPLE CHOICE",
            title : "New Question",
            points: 1,
            questionText: "",
            choices : [
                { _id: uuidv4(), text: "Option 1", isCorrect: true },
                { _id: uuidv4(), text: "Option 2", isCorrect: false },
            ],
            correctBoolean : true,
            correctAnswer : [],
        });

    const findQuestionById = (questionId) => QuestionModel.findById(questionId);
    const updateQuestion = (questionId, updates) => QuestionModel.findByIdAndUpdate(questionId, updates, { new: true });
    const deleteQuestion = (questionId) => QuestionModel.findByIdAndDelete(questionId);

    return { findQuestionsForQuiz, createQuestionForQuiz, findQuestionById,
        updateQuestion, deleteQuestion};
}