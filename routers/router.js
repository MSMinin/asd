module.exports = (app) => {
    const testRouter = require("./test/test_router");
    app.use("/test", testRouter);

    const router = require("express").Router();
    router.get("/", (req, res) => {
        msg = `<h2>기본 경로입니다. 3조 홈페이지로 이동하겠습니까?</h2><br>
                <a href ="/test">이동하기</a>`
        res.send(msg);
    })

    return router;
}