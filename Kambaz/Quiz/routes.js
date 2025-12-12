import QuizDao from "./dao.js";

const requireAuth = (req, res, next) => {
    const user = req.session?.currentUser;
    if (!user) return res.sendStatus(401);
    next();
}

const requireFaculty = (req, res, next) => {
    const user = req.session?.currentUser;
    if (!user) return res.sendStatus(401);
    if (user.role !== "FACULTY") return res.sendStatus(403);
    next();
}

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
    app.get("/api/courses/:cid/quizzes", requireAuth, listQuiz);

    //Create quiz
    app.post("/api/courses/:cid/quizzes", requireFaculty, createQuiz);

    //Delete quiz
    app.delete("/api/quizzes/:qid", requireFaculty, deleteQuiz);

    //gets quiz
    app.get("/api/quizzes/:qid", requireAuth, getQuiz);

    //updates/edit quiz
    app.put("/api/quizzes/:qid", requireFaculty, editQuiz)



}