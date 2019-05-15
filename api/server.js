const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const token = require("./module/token")
const db = require("./module/db")
const {message} = require("./module/config")
const admin = require("./router/admin")
const goods = require("./router/goods")
app.use(bodyParser.json());
app.use(express.static(__dirname+"/upload"));
app.all("*",function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Authorization");
    next();
})
//管理员登录
app.post("/login",admin.login)
//获取管理员登录信息
app.get("/adminLog",admin.getAdminLog)
//删除管理员信息
app.delete("/adminLog",admin.delAdminLog)
//**************商品类型****
app.post("/addGoodsType",goods.addGoodsType)
//获取商品类别列表
app.get("/getGoodsType",goods.getGoodsType)
//查找一个商品类别
app.get("/findOneGoodsType",goods.findOneGoodsType)
//修改商品类型信息
app.put("/upGoodsType",goods.upGoodsType)
//删除商品类别
app.delete("/delGoodsType",goods.delGoodsType)
app.listen(80,function(){
    console.log("success");
})