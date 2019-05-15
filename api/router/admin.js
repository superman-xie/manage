const token = require("../module/token")
const db = require("../module/db")
const {message} = require("../module/config")
const {getPageList} = require("../module/common")
module.exports.login = function(req,res){
    db.findOne("adminList",{
        adminName : req.body.adminName
    },function(err,info){
        if(info){
            db.insertOne("adminLogList",{
                adminName : info.adminName,
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
                        msg : message.LOGIN_SUC,
                        token : token.encode(info.adminName)
                    })
                }
            })
        }else{
            res.json({
                ok : -1,
                msg : message.LOGIN_ERR
            })
        }
    })
}
//获取登录信息列表接口
module.exports.getAdminLog = function(req,res){
    var status = token.decode(req.headers.authorization);
    //token 成功
    if(status.ok === 1){
        var whereObj = {
            adminName : status.info.userName
        }
        getPageList(req,res,"adminLogList",whereObj);
    }else{
        res.json({
            ok : -4,
            msg: status.msg
        })
    }
}
//删除登录信息列表接口
module.exports.delAdminLog = function(req,res){
    db.deleteOneById("adminLogList",req.query.id,function(err,results){
        if(err){
            res.json({
                ok : -1,
                msg : message.URL_ERROR
            })
        }else{
            res.json({
                ok : 1,
                msg : message.DELETE
            })
        }
    })
}