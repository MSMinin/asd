const router = require("express").Router();
const testCtrl = require("../../controller/test_ctrl");

router.get("/", testCtrl.view.index);

router.get("/loginForm", testCtrl.view.loginForm);
router.post("/login", testCtrl.process.login);

router.get("/registerForm", testCtrl.view.registerForm);
router.post("/register", testCtrl.process.register);

router.get("/logout", testCtrl.process.logout);

router.get("/informationChk/:username", testCtrl.process.informationChk);

router.get("/modifyForm/:id", testCtrl.process.modifyForm);
router.post("/modify", testCtrl.process.modify);

router.get("/delete/:id", testCtrl.process.delete);

router.get("/findPwd", testCtrl.view.find);

module.exports = router;