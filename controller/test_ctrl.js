const testService = require("../service/test_service");

const view = {
    index : (req, res) => {
        res.render("index", {username : req.session.username});
    },
    loginForm : (req, res) => {
        res.render("test/loginForm");
    },
    registerForm : (req, res) => {
        res.render("test/registerForm");
    },
    find : (req, res) => {
        res.render("test/findPwd");
    }
    
}

const process = {
    login : async (req, res) => {
        const msgPack = await testService.loginChk(req.body);

        if(msgPack.result === 0) {
            req.session.username = req.body.id;
        }
        res.send(msgPack.msg);
    },
    register : async (req, res) => {
        const msg = await testService.register(req.body);
        console.log(msg);
        res.send(msg);
    },
    logout : (req, res) => {
        const msg = testService.logout(req, res);
        res.send(msg);
    },
    informationChk : async (req, res) => {
        console.log("req.parmas : ", req.params);
        const mlist = await testService.infoChk(req.params);
        console.log("서비스에서 받아온 mlist(result) : ",mlist);
        res.render("test/informationChk", {list : mlist})
    },
    modifyForm : async (req, res) => {
        console.log("req.params : ", req.params); //id받아옴
        const mlist = await testService.modifyForm(req.params);
        res.render("test/modifyForm", {list : mlist})
    },
    modify : async (req, res) => {
        console.log("body확인 : ", req.body);
        const msg = await testService.modify(req.body);
        res.send(msg);
    },
    delete : async (req, res) => {
        console.log("req.params", req.params);
        req.session.destroy();
        res.clearCookie("isLogin");
        const msg = await testService.deleteM(req.params);
        res.send(msg);
    }
}

module.exports = {view, process};