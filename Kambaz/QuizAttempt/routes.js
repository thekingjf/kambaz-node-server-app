import QuizAttemptDao from "./dao.js";
import QuizDao from "../Quiz/dao.js";
import QuestionDao from "../Questions/dao.js";

export default function QuizAttemptRoutes(app) {
    const attemptsDao = QuizAttemptDao();
    const quizDao = QuizDao();
    const questionDao = QuestionDao();

    const gradeAttempt = async (quizId, answersByQuestionId) => {
        const questions = await questionDao.findQuestionsForQuiz(quizId);
        let score = 0;
        let maxScore = 0;
        const gradedAnswers = [];

        for (const q of questions) {
            maxScore += q.points ?? 1;
            const submitted = answersByQuestionId[q._id] || {};
            let isCorrect = false;

            if (q.type === "MULTIPLE_CHOICE") {
                const correctChoice = q.choices.find((c) => c.isCorrect);
                isCorrect = submitted.choiceId === correctChoice?._id;
            } else if (q.type === "TRUE_FALSE") {
                isCorrect = submitted.booleanAnswer === q.correctBoolean;
            } else if (q.type === "FILL_IN_BLANK") {
                const submittedAnswers = (submitted.fillAnswers || []).map((s) => s.trim().toLowerCase());
                const correctAnswers = (q.correctAnswer || []).map((s) => s.trim().toLowerCase());

                isCorrect = submittedAnswers.some((ans) =>
                    correctAnswers.includes(ans)
                );
            }

            if (isCorrect) {
                score += q.points ?? 1;
            }

            gradedAnswers.push({
                questionId: q._id,
                choiceId: submitted.choiceId,
                booleanAnswer: submitted.booleanAnswer,
                fillAnswers: submitted.fillAnswers,
                isCorrect,
            });
        }

        return {score, maxScore, gradedAnswers};
    };

    const parseDate = (value) => (value ? new Date(value) : null);
    
    const enforceQuizAccess = (quiz, now, res) => {
        if (!quiz.published) return res.status(res, 403).json({ message: "Quiz is not published."});
        
        const availableFrom = parseDate(quiz.availableDate);
        const availableUntil = parseDate(quiz.untilDate);
        const due = parseDate(quiz.dueDate);
        
        if (availableFrom && now < availableFrom) return res.status(res, 403).json({ message: "Quiz is not available yet."});
        if (availableUntil && now > availableUntil) return res.status(res, 403).json({ message: "Quiz is closed."});
        
        if (due && now > due) return res.status(res, 403).json({ message: "Quiz is past due."});
        
        return null;
    };

    
    const enforceAttemptLimits = (quiz, previousAttempts, res) => {
        const attemptNumber = previousAttempts.length + 1;
        
        if (!quiz.multipleAttempts && previousAttempts.length >= 1) {
            res.status(res, 400).json({ message: "No attempts remaining."});
            return null;
        }
        
        if (quiz.multipleAttempts) {
            const max = Number(quiz.maxAttempts);
            const limit = Number.isFinite(max) && max > 0 ? max : 1;
            if (attemptNumber > limit) {
                res.status(res, 400).json({ message: "No attempts remaining."});
                return null;
            }
        }
        
        return attemptNumber;
    };

    const getStudentIdFromSession = (req) => req.session?.currentUser?._id || null;

    const submitAttempt = async (req, res) => {
        const quizId = req.params.qid;
        const studentId = getStudentIdFromSession(req);

        if (!studentId) return res.sendStatus(401);

        const quiz = await quizDao.findQuizById(quizId);
        if (!quiz) return res.sendStatus(404);

        const now = new Date();

        if (enforceQuizAccess(quiz, now, res)) return;

        const previousAttempts = await attemptsDao.findAttemptsForStudentQuiz(quizId, studentId);
        const attemptNumber = enforceAttemptLimits(quiz, previousAttempts, res);
        if (!attemptNumber) return;

        const answersByQuestionId = req.body.answers || {};
        const { score, maxScore, gradedAnswers } = await gradeAttempt(quizId, answersByQuestionId);

        const newAttempt = await attemptsDao.createAttempt({
            quizId,
            courseId: quiz.courseId,
            studentId,
            attemptNumber,
            submittedAt: now,
            score,
            maxScore,
            answers: gradedAnswers,
        });

        res.json(newAttempt);
    };

    const recentAttempt = async (req, res) => {
        const quizId = req.params.qid;
        const studentId = req.session?.currentUser?._id;
        if (!studentId) {
            return res.sendStatus(401);
        }

        const lastAttempt = await attemptsDao.findLastAttemptForStudentQuiz(quizId, studentId);
        if (!lastAttempt) {
            return res.json(null);
        }

        res.json(lastAttempt);
    };

    app.post("/api/quizzes/:qid/attempts", submitAttempt)
    app.get("/api/quizzes/:qid/attempts/last", recentAttempt)

}