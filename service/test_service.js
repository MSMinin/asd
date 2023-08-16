const testDAO = require("../database/test_dao");

loginChk = async (body) => {
    let member = await testDAO.loginChk(body.id);
    console.log("로그인시", member);
    let msg = "", url ="", msgPack= {};
    console.log(member[0])
    if(member.length === 1) {
        member = member[0];
        if(member.PWD === body.pwd) {
            msg = member.NAME + "님 환영합니다."
            url = "/test/";
            msgPack.result = 0 ;
        }else {
            msg = "비밀번호가 틀렸습니다."
            url = "/test/loginForm";
        }
    }else {
        msg = "해당하는 id가 존재하지 않습니다."
        url = "/test/loginForm";
    }
        msgPack.msg = getMessage(msg, url);
        return msgPack;
}

logout = (req, res) => {
        req.session.destroy();
        res.clearCookie("isLogin");
        let msg = "로그아웃되었습니다."
        url = "/test"
        return getMessage(msg, url);
}

getMessage = (msg, url) => {
    return `<script>
                alert('${msg}');
                location.href = '${url}';
            </script>`
}

register = async (body) => {
    let result = await testDAO.register( body );
    let msg="", url="";
    if(result !== undefined){      
        msg = `${body.name}님 회원가입 성공`;
        url = ""; 
        num = 1;
    }else{
        msg = "문제가 발생했습니다.";
        url = '/test/registerForm';
        num = 0;
    }
    return getMessage(msg, url, num);
}

getMessage = (msg, url, num) => {
    return `<script>
                alert('${msg}');
                location.href = '${url}';
                if(${num} == 1) {
                    window.close();
                }
            </script>`
}

infoChk = async (params) => {
    let result = await testDAO.infoChk(params);
    console.log("dao에서 받아온 result : ", result);
    return result;
}

modifyForm = async (params) => {
    let result = await testDAO.modifyForm(params);
    console.log("dao에서 받아온 result : ", result);
    return result;
}

modify = async (body)=> {
    console.log("컨트롤에서 받아온 body", body);
    let result = await testDAO.modify(body);
    let msg = "", url = "";
    if(result ===0) {
        msg = "문제 발생";
        url = "/test/modifyForm/" + body.id;
    }else {
        msg = "수정 완료";
        url = "/test/informationChk/" + body.id;
    }
    return getMessage(msg, url);
}

deleteM = async (body)=> {
    console.log("컨트롤에서 받아온 body", body);
    const result = await testDAO.deleteM(body);
    let msg ="", url ="";
    if(result == 0) {
        msg = "문제 발생";
        url = "/test/informationChk/" + body.id;
    }else {
        msg = "삭제 완료";
        url = "/test";
    }
    return getMessage(msg,url);
}


module.exports = {loginChk, register, logout, infoChk, modifyForm, modify, deleteM};