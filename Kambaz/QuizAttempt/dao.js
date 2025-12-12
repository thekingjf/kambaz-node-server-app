import QuizAttemptModel from "./model.js";

export default function QuizAttemptModelDao(app) {
    const createAttempt = (attempt) => QuizAttemptModel.create(attempt);

    const findAttemptsForStudentQuiz = (quizId, studentId) =>
        QuizAttemptModel.find({ quizId, studentId }).sort({ attemptNumber: 1 });

    const findLastAttemptForStudentQuiz = (quizId, studentId) =>
        QuizAttemptModel.findOne({ quizId, studentId }).sort({ attemptNumber: -1 });

    return {
        createAttempt,
        findAttemptsForStudentQuiz,
        findLastAttemptForStudentQuiz,
    };
}