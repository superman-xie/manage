const token = require("../module/token")
const db = require("../module/db")
const {message} = require("../module/config")
const {getPageList} = require("../module/common")
const {upPic} = require("../module/upPic")
const fs = require("fs");
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
//获取全部大商品列表
module.exports.getAllGoodsType = function(req,res){
    db.find("goodsTypeList",{},function(err,goodsTypeList){
        if(err){
            res.json({
                ok: -1,
                msg: message.DELETE_ERR
            })
        }else{
            res.json({
                ok: 1,
                msg: message.GET,
                goodsTypeList
            })
        }
    })
}
//添加小商品列表
module.exports.addSmallGoodsType = function(req,res){
    //判断是否过期
    var status = token.decode(req.headers.authorization);
    if(status.ok === 1){
        upPic(req,"smallGoodsTypePic", function (obj) {
            if (obj.ok === 2) {
                db.findOneById("goodsTypeList", obj.params.goodsTypeId, function (err,goodsType) {
                    db.insertOne("smallGoodsTypeList", {
                        smallGoodsTypeName: obj.params.smallGoodsTypeName,
                        goodsTypeId: goodsType._id,
                        goodsTypeName: goodsType.goodsTypeName,
                        smallGoodsTypePic: obj.params.newPicName,
                        addTime: Date.now(),
                        orderBy : obj.params.orderBy / 1,
                        smallGoodsIsShow : obj.params.smallGoodsIsShow / 1
                    }, function (err, results) {
                        res.json({
                            ok: 1,
                            msg: obj.msg
                        })
                    })
                })
            } else {
                res.json({
                    ok: -1,
                    msg: obj.msg
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
//获取小商品列表
module.exports.getSmallGoodsType = function(req,res){
    //判断token 是否过期
    var status = token.decode(req.headers.authorization);
    if(status.ok === 1){
        //搜索的内容
        var smallGoodsTypeSearch = req.query.smallGoodsTypeSearch ? req.query.smallGoodsTypeSearch : '';
        var whereObj = {};
        //判断搜索内容是否输入，有的话设置 按搜索内容查找
        if(smallGoodsTypeSearch.length > 0){
            whereObj.smallGoodsTypeName = new RegExp(smallGoodsTypeSearch);
        }
        getPageList(req,res,"smallGoodsTypeList",{
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
},
//删除小商品类型
module.exports.delSmallGoodsType = function(req,res){
        //判断token 是否过期
        var status = token.decode(req.headers.authorization);
        if(status.ok === 1) {
            //根据id删除
            db.deleteOneById("smallGoodsTypeList", req.query.id, function (err, results) {
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
//查找一个小商品类型
module.exports.findOneSmallGoodsType = function(req,res){
    //判断token 是否过期
    var status = token.decode(req.headers.authorization);
    if(status.ok === 1) {
        //根据id查找
        db.findOneById("smallGoodsTypeList", req.query.id, function (err, goodsType) {
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
//修改小商品数据
module.exports.upSmallGoodsType = function(req,res){
    //判断token 是否过期
    var status = token.decode(req.headers.authorization);
    if(status.ok === 1) {
        upPic(req,"smallGoodsTypePic", function (obj) {
            if(obj.ok === 2){
                db.findOneById("smallGoodsTypeList",obj.params.smallGoodsTypeId,function(err,smallGoodsType){
                    fs.unlink(__dirname + "/upload/" + smallGoodsType.smallGoodsTypePic,function(){
                        var whereObj = {
                            $set : {
                                smallGoodsTypeName : obj.params.smallGoodsTypeName,
                                smallGoodsIsShow : obj.params.smallGoodsIsShow,
                                orderBy : obj.params.orderBy,
                                smallGoodsTypePic : obj.params.newPicName
                            }
                        }
                        db.updateOneById("smallGoodsTypeList",obj.params.smallGoodsTypeId,whereObj,function(err,results){
                            if(err){
                                res.json({
                                    ok: -1,
                                    msg: message.URL_ERROR
                                })
                            }else{
                                res.json({
                                    ok: 1,
                                    msg: message.UPDATE
                                })
                            }
                        })
                    })
                })
            }
        });
    }else{
        res.json({
            ok:-4,
            msg : message.TOKEN_ERR
        })
    }
}
//获取全部商品小列表
module.exports.getAllSmallGoodsTypeList = function(req,res){
    db.find("smallGoodsTypeList",{},function(err,smallGoodsTypeList){
        if(err){
            res.json({
                ok: -1,
                msg: message.DELETE_ERR
            })
        }else{
            res.json({
                ok: 1,
                msg: message.GET,
                smallGoodsTypeList
            })
        }
    })
}

//添加商品
module.exports.addGoods = function(req,res){
    //判断是否过期
    var status = token.decode(req.headers.authorization);
    if(status.ok === 1){
        upPic(req,"goodsSmallPic", function (obj) {
            if (obj.ok === 2) {
                db.findOneById("smallGoodsTypeList", obj.params.smallGoodsTypeId, function (err,smallGoodsType) {
                    db.insertOne("goodsList", {
                        smallGoodsTypeId: smallGoodsType._id,                    //所属商品类别ID
                        smallGoodsTypeName: smallGoodsType.smallGoodsTypeName,  //所属商品类别名称
                        addTime: Date.now(),                         //添加时间
                        orderBy : obj.params.orderBy / 1,             //排序
                        goodsName:  obj.params.goodsName,           //商品名称
                        goodsInfo : obj.params.goodsInfo,           //商品描述
                        goodsSmallPic: obj.params.newPicName,        //小图片
                        originalPrice: obj.params.originalPrice / 1,  //原价
                        currentPrice:  obj.params.currentPrice / 1,  //现价
                        clickSum:       obj.params.clickSum / 1,  //点击量
                        goodsPlace: obj.params.goodsPlace,    //商品产地
                        goodsSpecs: obj.params.goodsSpecs,     //商品规格
                        storageTime: obj.params.storageTime,    //保质期
                        storageRequire: obj.params.storageRequire,   //商品储存条件
                        isPreference: obj.params.isPreference / 1,    //是否优选
                        goodsNum: obj.params.goodsNum / 1,        //商品库存
                        isShow : obj.params.isShow / 1       //是否显示
                    }, function (err, results) {
                        res.json({
                            ok: 1,
                            msg: obj.msg
                        })
                    })
                })
            } else {
                res.json({
                    ok: -1,
                    msg: obj.msg
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
//获取商品
module.exports.getGoodsList = function(req,res){
    //判断token 是否过期
    var status = token.decode(req.headers.authorization);
    if(status.ok === 1){
        //搜索的内容
        var goodsSearch = req.query.goodsSearch ? req.query.goodsSearch : '';
        var whereObj = {};
        //判断搜索内容是否输入，有的话设置 按搜索内容查找
        if(goodsSearch.length > 0){
            whereObj.goodsName = new RegExp(goodsSearch);
        }
        getPageList(req,res,"goodsList",{
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
//获取全部商品
module.exports.getAllGoodsList = function(req,res){
    db.find("goodsList",{},function(err,goodsList){
        if(err){
            res.json({
                ok: -1,
                msg: message.DELETE_ERR
            })
        }else{
            res.json({
                ok: 1,
                msg: message.GET,
                goodsList
            })
        }
    })
}
//添加商品图片
module.exports.addGoodsDetailsPic = function(req,res){
    var status = token.decode(req.headers.authorization);
    if(status.ok === 1){
    upPic(req,"goodsDetailsPic",function(obj){
       if(obj.ok === 2){
           db.findOneById("goodsList", obj.params.goodsId, function (err,goods) {
                   db.insertOne("goodsDetailsPicList", {
                       goodsId : goods._id,    //商品id
                       goodsName : goods.goodsName,   //商品名称
                       goodsDetailsPicInfo : obj.params.goodsDetailsPicInfo, //图片描述
                       isShow : obj.params.isShow,       //是否显示
                       orderBy : obj.params.orderBy,      //排序
                       goodsDetailsPic : obj.params.newPicName //图片
                   },function(err){
                        if(err){
                            res.json({
                                ok:-1,
                                msg : message.URL_ERROR
                            })
                        }else{
                            res.json({
                                ok:1,
                                msg : message.ADD_SUCCESS
                            })
                        }
                   })
               })
       }else {
           res.json({
               ok: -1,
               msg: obj.msg
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
//获取商品图片
module.exports.goodsDetailsPicList = function(req,res){
    db.find("goodsDetailsPicList",{},function(err,goodsDetailsPicList){
        if(err){
            res.json({
                ok:-1,
                msg : message.URL_ERROR
            })
        }else{
            res.json({
                ok:1,
                msg : message.GET,
                goodsDetailsPicList
            })
        }
    })
}
//轮播图
module.exports.addSlideshowPic = function(req,res){
    var status = token.decode(req.headers.authorization);
    if(status.ok === 1){
        upPic(req,"slideShowPic",function(obj){
            if(obj.ok === 2){
                db.findOneById("goodsList", obj.params.goodsId, function (err,goods) {
                    db.insertOne("slideShowPicList", {
                        goodsId : goods._id,    //商品id
                        goodsName : goods.goodsName,   //商品名称
                        isShow : obj.params.isShow,       //是否显示
                        orderBy : obj.params.orderBy,      //排序
                        slideShowPic : obj.params.newPicName, //图片
                        slideShowInfo : obj.params.slideShowInfo,   //图片描述
                    },function(err){
                        if(err){
                            res.json({
                                ok:-1,
                                msg : message.URL_ERROR
                            })
                        }else{
                            res.json({
                                ok:1,
                                msg : message.ADD_SUCCESS
                            })
                        }
                    })
                })
            }else {
                res.json({
                    ok: -1,
                    msg: obj.msg
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
//获取轮播图
module.exports.slideShowPicList = function(req,res){
    db.find("slideShowPicList",{},function(err,slideShowPicList){
        if(err){
            res.json({
                ok:-1,
                msg : message.URL_ERROR
            })
        }else{
            res.json({
                ok:1,
                msg : message.GET,
                slideShowPicList
            })
        }
    })
}


//获取商品大列表接口
module.exports.getGoodsTypeList = function(req,res){
    var obj = JSON.parse(req.query.obj) || {};
    db.find("goodsTypeList", obj
        ,function(err,goodsTypeList){
            if(err){
                res.json({
                    ok: -1,
                    msg: message.URL_ERROR
                })
            }else{
                res.json({
                    ok: 1,
                    msg: message.GET,
                    goodsTypeList
                })
            }
        })
}
//获取商品小列表接口
module.exports.getSmallGoodsTypeList = function(req,res){
    var obj = req.query.obj || {};
    db.find("smallGoodsTypeList", obj
        ,function(err,smallGoodsTypeList){
            if(err){
                res.json({
                    ok: -1,
                    msg: message.URL_ERROR
                })
            }else{
                res.json({
                    ok: 1,
                    msg: message.GET,
                    smallGoodsTypeList
                })
            }
        })
}
//获取商品接口
module.exports.getGoodsLists = function(req,res){
    var obj = JSON.parse(req.query.obj) || {};
    db.find("goodsList", obj
        ,function(err,goodsList){
            if(err){
                res.json({
                    ok: -1,
                    msg: message.URL_ERROR
                })
            }else{
                res.json({
                    ok: 1,
                    msg: message.GET,
                    goodsList
                })
            }
        })
}
//详情页轮播图
module.exports.getGoodsDetailsPicList = function(req,res){
    var obj = JSON.parse(req.query.obj) || {};
    db.find("goodsDetailsPic", obj
        ,function(err,goodsDetailsPicList){
            if(err){
                res.json({
                    ok: -1,
                    msg: message.URL_ERROR
                })
            }else{
                res.json({
                    ok: 1,
                    msg: message.GET,
                    goodsDetailsPicList
                })
            }
        })
}
//详情页详细图
module.exports.getSlideShowPicList = function(req,res){
    var obj = JSON.parse(req.query.obj) || {};
    db.find("slideShowPicList", obj
        ,function(err,slideShowPicList){
            if(err){
                res.json({
                    ok: -1,
                    msg: message.URL_ERROR
                })
            }else{
                res.json({
                    ok: 1,
                    msg: message.GET,
                    slideShowPicList
                })
            }
        })
}
//*******************************************************************