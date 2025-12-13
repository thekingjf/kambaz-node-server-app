import QuizDao from "./dao.js";

export default function QuizRoutes(app) {
    const dao = QuizDao();

    //List all the quizzes for that course
    const listQuiz = async (req, res) => {
        const cid = req.params.cid;
        const quizzes = await dao.findQuizzesForCourse(cid);
        res.json(quizzes);
    }

    //Creates a quiz in said course
    const createQuiz = async (req, res) => {
        const cid = req.params.cid;
        const quizzes = await dao.createQuizForCourse(cid);
        res.json(quizzes);
    }

    //gets the quiz by the id num
    const getQuiz = async (req, res) => {
        const qid = req.params.qid;
        const quizzes = await dao.findQuizById(qid);
        res.json(quizzes);
    }

    //edits the quiz
    const editQuiz = async (req, res) => {
        const qid = req.params.qid;
        const quizzes = await dao.updateQuiz(qid, req.body);
        res.json(quizzes);
    }

    //deletes the quiz
    const deleteQuiz = async (req, res) => {
        const qid = req.params.qid;
        const quizzes = await dao.deleteQuiz(qid);
        res.json(quizzes);
    }

    //List quizzes for course
    app.get("/api/courses/:cid/quizzes", listQuiz);

    //Create quiz
    app.post("/api/courses/:cid/quizzes", createQuiz);

    //Delete quiz
    app.delete("/api/quizzes/:qid", deleteQuiz);

    //gets quiz
    app.get("/api/quizzes/:qid", getQuiz);

    //updates/edit quiz
    app.put("/api/quizzes/:qid", editQuiz)



}