import model from "./model.js";

export default function QuizDao() {
  const findQuizzesForCourse = (cid) => model.find({courseId: cid}).sort({"availableDate" : 1});
  const createQuizForCourse = (cid) => model.create({
    courseId: cid,
  });
  const findQuizById = (quizId) => model.findById(quizId);
  const updateQuiz = (quizId, quizUpdates) => model.findByIdAndUpdate(quizId, quizUpdates, { new: true});
  const deleteQuiz = (quizId) => model.findByIdAndDelete(quizId);
  
  return {findQuizzesForCourse, createQuizForCourse, 
    findQuizById, updateQuiz, deleteQuiz };
}
