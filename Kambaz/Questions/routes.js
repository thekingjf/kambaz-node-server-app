import QuestionDao from "./dao.js";

export default function QuestionRoutes(app) {
    const dao = QuestionDao();

    const listQuestionsForQuiz = async (req, res) => {
        const { qid } = req.params;
        const questions = await dao.findQuestionsForQuiz(qid);
        res.json(questions);
    }

    const createQuestion = async (req, res) => {
        const { qid } = req.params;
        const questions = await dao.createQuestionForQuiz(qid);
        res.json(questions);
    }

    const getQuestion = async (req, res) => {
        const { questionId } = req.params;
        const questions = await dao.findQuestionById(questionId);
        res.json(questions);
    }
    
    const updateQuestion = async (req, res) => {
        const { questionId } = req.params;
        const updates = req.body;
        const updated = await dao.updateQuestion(questionId, updates);
        res.json(updated);
    }

    const deleteQuestion = async (req, res) => {
        const { questionId } = req.params;
        const deleted = await dao.deleteQuestion(questionId);
        res.json(deleted);
    }

    //Get all questions for quiz
    app.get("/api/quizzes/:qid/questions", listQuestionsForQuiz);

    //Create one question for quiz
    app.post("/api/quizzes/:qid/questions", createQuestion);

    //get one question for quiz
    app.get("/api/questions/:questionId", getQuestion);

    //update question
    app.put("/api/questions/:questionId", updateQuestion);

    //delete question in quiz
    app.delete("/api/questions/:questionId", deleteQuestion);
}