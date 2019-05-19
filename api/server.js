const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path")
const token = require("./module/token")
const db = require("./module/db")
const {message} = require("./module/config")
const admin = require("./router/admin")
const goods = require("./router/goods")
app.use(bodyParser.json());
app.use(express.static(__dirname+"/upload"));
app.use(express.static(path.resolve(__dirname,"../dist")))

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
//获取全部的商品类别
app.get("/getAllGoodsType",goods.getAllGoodsType)
//添加小商品类别
app.post("/smallGoodsType",goods.addSmallGoodsType)
//获取小商品类别列表
app.get("/smallGoodsType",goods.getSmallGoodsType)
//删除小商品类型
app.delete("/smallGoodsType",goods.delSmallGoodsType)
//查找一个小商品类型
app.get("/findOneSmallGoodsType",goods.findOneSmallGoodsType)
//修改小商品信息
app.post("/upSmallGoodsType",goods.upSmallGoodsType)
//获取全部小商品类型
app.get("/getAllSmallGoodsTypeList",goods.getAllSmallGoodsTypeList)
//添加商品信息
app.post("/addGoods",goods.addGoods)
//获取商品
app.get("/getGoodsList",goods.getGoodsList)
//获取全部商品信息
app.get("/getAllGoodsList",goods.getAllGoodsList)
//添加详情页信息
app.post("/addGoodsDetailsPic",goods.addGoodsDetailsPic);
//获取详情图片
app.get("/goodsDetailsPicList",goods.goodsDetailsPicList);
//添加轮播图图片
app.post("/addSlideshowPic",goods.addSlideshowPic);
//获取轮播图图片
app.get("/slideShowPicList",goods.slideShowPicList)
app.listen(80,function(){
    console.log("success");
})