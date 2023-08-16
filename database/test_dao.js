const oracledb = require("oracledb");
const dbConfig = require("../../config/databse/db_config");
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

loginChk = async (id) => {
    const con = await oracledb.getConnection(dbConfig);
    const sql = `select * from proMember where id = '${id}'`;
    let member;
    try{
        member = await con.execute(sql);
    }catch(err) {
        console.log(err);
    }
    console.log(member);
    return member.rows;
}

const register = async ( body ) =>{
    const con = await oracledb.getConnection(dbConfig);
    const sql = "insert into proMember values(:id, :pwd, :name, :addr, :pNumber, :birth)";
    let result;
    
    try{
        result = await con.execute(sql, body);
    }catch(err){
        console.log(err)
    }
    return result;
}  

infoChk = async (params) => {
    const con = await oracledb.getConnection(dbConfig);
    console.log("서비스에서 받아온 params의 id",params.username);
    const sql = `select * from proMember where id = '${params.username}'`;
    let member;
    try{
        member = await con.execute(sql);
    }catch(err) {
        console.log(err);
    }
    console.log(member);
    return member.rows[0];
}

modifyForm = async (params) => {
    const con = await oracledb.getConnection(dbConfig);
    console.log("서비스에서 받아온 params의 id",params.id);
    const sql = `select * from proMember where id = '${params.id}'`;
    let member;
    try{
        member = await con.execute(sql);
    }catch(err) {
        console.log(err);
    }
    console.log(member);
    return member.rows[0];
}

modify = async (body) => {
    const con = await oracledb.getConnection(dbConfig);
    console.log("서비스에서 받아온 body.id : ",body.id);
    const sql = `update proMember set pwd = '${body.pwd}', name = '${body.name}' , addr = '${body.addr}',
                 p_number= '${body.pNumber}' , birth = '${body.birth}'  where id = '${body.id}'`;
    console.log(sql);
    let result = 0;
    try{
        result = await con.execute(sql);
    }catch(err) {
        console.log(err);
    }
    console.log(result);
    return result;
}

deleteM = async (body) => {
    const sql = ` delete from proMember where id = :id`;
    let con = await oracledb.getConnection(dbConfig);
    let result = 0;
    try{
        result = await con.execute(sql, body);
    }catch(err) {
        console.log(err);
    }
    return result;
}
module.exports = {loginChk, register, infoChk, modifyForm, modify, deleteM};