import axios from 'axios'
import Vue from "vue";
import config from "@/config"
export default {
    state : {
        //获取的商品类型列表
        goodsTypeList : [],
        //查找一个的商品类型信息
        oneGoodsType : {},
        //获取全部的商品类型
        allGoodsType : [],
        //获取商品小列表
        smallGoodsTypeList : [],
        //全部商品小列表
        allSmallGoodsTypeList : []
    },
    mutations : {
        //将获得商品类型列表添加到state
        SET_GOODS_TYPE_LIST(state,goodsTypeList){
            state.goodsTypeList = goodsTypeList;
        },
        //将获得的一个的商品类型信息添加到state
        SET_ONE_GOODS_TYPE(state,oneGoodsType){
            state.oneGoodsType = oneGoodsType;
        },
        //获去全部商品类别
        SET_ALL_GOODS_TYPE(state,allGoodsType){
            state.allGoodsType = allGoodsType;
        },
        SET_SMALL_GOODS_TYPE_LIST(state,smallGoodsTypeList){
            state.smallGoodsTypeList = smallGoodsTypeList;
        },
        SET_ALL_SMALL_GOODS_TYPE(state,allSmallGoodsTypeList){
            state.allSmallGoodsTypeList = allSmallGoodsTypeList;
        }
    },
    actions : {
        //添加商品类型信息  传入那个form 表达 使用其中的值
        addGoodsType({commit,dispatch,rootState},that){
            axios.post("addGoodsType",that.form).then(data=>{
                if(data){
                    if(data.ok === 1){
                        //清空表单
                        that.$refs.myForm.resetFields();
                        //关闭添加窗口
                        that.$emit('update:visible',false);
                        //提示成功消息
                        that.$message({
                            message: data.msg,
                            type: 'success',
                            showClose : true
                        });
                        //重新获取列表信息
                        dispatch("getGoodsType")
                    }else{
                        //提示失败信息
                        that.$message({
                            message: data.msg,
                            type: 'error',
                            showClose : true
                        });
                    }
                }
            })
        },
        //获取商品类型列表  传入了一个下标或搜索的信息
        getGoodsType({commit},params){
            axios.get("getGoodsType",{
                params
            }).then(data=>{
                if(data){
                    if(data.ok === 1){
                        //将获得的列表信息复制给state goodsTypeList
                        commit("SET_GOODS_TYPE_LIST",data.goodsTypeList);
                        //将总页数 和当前页数复制给state中的pageIndex pageSum
                        commit("SET_PAGE_INFO",{
                            pageIndex : data.pageIndex,
                            pageSum : data.pageSum
                        })
                    }
                }
            })
        },
        //查找一个商品类别  传入一个id  根据id查找
        findOneGoodsType({commit},id){
            axios.get("findOneGoodsType",{
                params : {
                    id
                }
            }).then(data=>{
                if(data){
                    //将得到的一个商品类别信息复制给oneGoodsList
                    commit("SET_ONE_GOODS_TYPE",data.goodsType);
                    //调用该订阅  在addGoodsType 中
                    Vue.prototype.$bus.$emit('findOne')
                }

            })
        },
        //编辑商品类型列表  传入要修改的数据
        upGoodsType({dispatch},obj){
            axios.put("upGoodsType",obj).then(data=>{
                if(data){
                    if(data.ok === 1){
                        //调用这个订阅  使用了  goodsType 中的函数
                        Vue.prototype.$bus.$emit("clearBox");
                        //重新获取数据
                        dispatch("getGoodsType");
                        //成功调用外部的提示函数  在 config 传入一个数据 data 可以输出.msg
                        config.message(data,"success")
                    }else{
                        //失败时调用外部的提示函数  在 config 传入一个数据 data 可以输出.msg
                        config.message(data,"error")
                    }
                }
            })
        },
        //删除商品类型  传入一个ID
        delGoodsType({dispatch,rootState},id){
            axios.delete("delGoodsType",{
                params : {
                    id
                }
            }).then(data=>{
                if(data){
                    if(data.ok === 1){
                        //重新获取数据 刷新页面
                        dispatch("getGoodsType",{pageIndex:rootState.pageInfo.pageIndex});
                        //成功调用外部的提示函数  在 config 传入一个数据 data 可以输出.msg
                        config.message(data,"success")
                    }
                }
            })
        },
        //获取全部的大商品类型
        getAllGoodsType({commit}){
            axios.get("getAllGoodsType"
            ).then(data=>{
                commit("SET_ALL_GOODS_TYPE",data.goodsTypeList)
            })
        },
        //获取小商品列表
        getSmallGoodsType({commit},params){
            axios.get("smallGoodsType",{
                params
            }).then(data=>{
                if(data){
                    if(data.ok === 1){
                        //将获得的列表信息复制给state goodsTypeList
                        commit("SET_SMALL_GOODS_TYPE_LIST",data.smallGoodsTypeList);
                        //将总页数 和当前页数复制给state中的pageIndex pageSum
                        commit("SET_PAGE_INFO",{
                            pageIndex : data.pageIndex,
                            pageSum : data.pageSum
                        })
                    }
                }
            })
        },
        //删除小商品类型 创日一个ID
        delSmallGoodsType({dispatch,rootState},id){
            axios.delete("smallGoodsType",{
                params : {
                    id
                }
            }).then(data=>{
                if(data){
                    if(data.ok === 1){
                        //重新获取数据 刷新页面
                        dispatch("getSmallGoodsType",{pageIndex:rootState.pageInfo.pageIndex});
                        //成功调用外部的提示函数  在 config 传入一个数据 data 可以输出.msg
                        config.message(data,"success")
                    }
                }
            })
        },
        //查找一个小商品 根据id
        findOneSmallGoodsType({commit},id){
            axios.get("findOneSmallGoodsType",{
                params : {
                    id
                }
            }).then(data=>{
                console.log(data)
                if(data){
                    //将得到的一个商品类别信息复制给oneGoodsList
                    commit("SET_ONE_GOODS_TYPE",data.goodsType);
                    //调用该订阅  在addGoodsType 中
                    Vue.prototype.$bus.$emit('findOneBySmall')
                }

            })
        },
        //修改小商品类型信息
        upSmallGoodsType({dispatch},obj){
            axios.put("smallGoodsType",obj).then(data=>{
                console.log(data);
                if(data){
                    if(data.ok === 1){

                        // //重新获取数据
                        // dispatch("getGoodsType");
                        // //成功调用外部的提示函数  在 config 传入一个数据 data 可以输出.msg
                        // config.message(data,"success")
                    }
                    // else{
                    //     //失败时调用外部的提示函数  在 config 传入一个数据 data 可以输出.msg
                    //     config.message(data,"error")
                    // }
                }
            })
        },
        //获取全部小商品类型
        getAllSmallGoodsTypeList({commit}){
            axios.get("getAllSmallGoodsTypeList"
            ).then(data=>{
                commit("SET_ALL_SMALL_GOODS_TYPE",data.smallGoodsTypeList)
            })
        }
    }
}
