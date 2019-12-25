//载入数据库链接模块
const db = require("../db.js");

// 一、 创建 商品分类的 骨架-规则 
const spsSchem = db.Schema({
    //title: { type: String },  //商品分类名称
    goodsname: { type: String },
    price: { type: String },
    goodsinfo: { type: String },
    showhide: { type: Boolean },
    ggarr: { type: Array },
    fileList: { type: Array },
    imageUrl: { type: String },  
    fild: { type: String },
})
// 二、生成 模型
const spsModel = db.model("sps", spsSchem)

module.exports = spsModel;