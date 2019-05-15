const token = require("../module/token")
const db = require("../module/db")
const {message} = require("../module/config")
const {getPageList} = require("../module/common")
const {upPic} = require("../module/upPic")
//添加商品类型
module.exports.addGoodsType = function(req,res){
    //判断token 是否过期
    var status = token.decode(req.headers.authorization);
    // token 没有过期
    if(status.ok === 1){
        //新增商品类别数据
        db.insertOne("goodsTypeList",{
            goodsTypeName: req.body.goodsTypeName,
            goodsIsShow :  req.body.goodsIsShow,
            orderBy : req.body.orderBy,
            addTime : Date.now()
        },function(err,results){
            if(err){
                res.json({
                    ok : -1,
                    msg : message.URL_ERROR
                })
            }else{
                res.json({
                    ok : 1,
                    msg : message.ADD_SUCCESS
                })
            }
        })
    // token 过期了
    }else{
        res.json({
            ok : -4,
            msg : message.TOKEN_ERR
        })
    }
}
//获取商品类型
module.exports.getGoodsType = function(req,res){
    //判断token 是否过期
    var status = token.decode(req.headers.authorization);
    if(status.ok === 1){
        //搜索的内容
        var goodsTypeSearch = req.query.goodsTypeSearch ? req.query.goodsTypeSearch : '';
        var whereObj = {};
        //判断搜索内容是否输入，有的话设置 按搜索内容查找
        if(goodsTypeSearch.length > 0){
            whereObj.goodsTypeName = new RegExp(goodsTypeSearch);
        }
        getPageList(req,res,"goodsTypeList",{
            sortObj : {
                addTime : -1,
                orderBy : 1
            },
            whereObj
        })
    }else{
        res.json({
            ok:-4,
            msg : message.TOKEN_ERR
        })
    }
}
//查找一个商品类型
module.exports.findOneGoodsType = function(req,res){
    //判断token 是否过期
    var status = token.decode(req.headers.authorization);
    if(status.ok === 1) {
        //根据id查找
        db.findOneById("goodsTypeList", req.query.id, function (err, goodsType) {
            if (err) {
                res.json({
                    ok: -1,
                    msg: message.URL_ERROR
                })
            } else {
                res.json({
                    ok: 1,
                    msg: message.GET,
                    goodsType
                })
            }
        })
    }else{
        res.json({
            ok:-4,
            msg : message.TOKEN_ERR
        })
    }
}
//修改商品类型信息
module.exports.upGoodsType = function(req,res){
    //判断token 是否过期
    var status = token.decode(req.headers.authorization);
    if(status.ok === 1) {
        //更新数据的话要加 $set
        var $set = {
            goodsTypeName: req.body.goodsTypeName,
            goodsIsShow: req.body.goodsIsShow,
            orderBy: req.body.orderBy
        }
        db.updateOneById("goodsTypeList", req.body.id,
            {
                $set
            }, function (err, results) {
                if (err) {
                    res.json({
                        ok: -1,
                        msg: message.UPDATE_ERR
                    })
                } else {
                    res.json({
                        ok: 1,
                        msg: message.UPDATE
                    })
                }
            })
    }else{
        res.json({
            ok:-4,
            msg : message.TOKEN_ERR
        })
    }
}

//删除商品类型
module.exports.delGoodsType = function(req,res){
    //判断token 是否过期
    var status = token.decode(req.headers.authorization);
    if(status.ok === 1) {
        //根据id删除
        db.deleteOneById("goodsTypeList", req.query.id, function (err, results) {
            if (err) {
                res.json({
                    ok: -1,
                    msg: message.DELETE_ERR
                })
            } else {
                res.json({
                    ok: 1,
                    msg: message.DELETE
                })
            }
        })
    }else{
        res.json({
            ok:-4,
            msg : message.TOKEN_ERR
        })
    }
}