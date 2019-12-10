//载入数据库链接模块
const db= require("../db.js")
//创建权限表格的骨架规则
const quanxiansSchema=db.Schema({
    title:{type:String},
    name:{type:String},
    pid:{type:String}

})
//生成模块
const quanxiansModel=db.model("quanxians",quanxiansSchema)

module.exports=quanxiansModel;