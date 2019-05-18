import axios from 'axios'
import Vue from "vue";
import config from "@/config"
export default {
    state : {
        goodsList: []
    },
    mutations : {
        SET_GOODS_LIST(state,goodsList){
            state.goodsList = goodsList
;        }
    },
    actions : {
        getGoodsList({commit},params){
            axios.get("getGoodsList",{
                params
            }).then(data=>{

                console.log(data)
                if(data){
                    if(data.ok === 1){
                        //将获得的列表信息复制给state goodsTypeList
                        commit("SET_GOODS_LIST",data.goodsList);
                        //将总页数 和当前页数复制给state中的pageIndex pageSum
                        commit("SET_PAGE_INFO",{
                            pageIndex : data.pageIndex,
                            pageSum : data.pageSum
                        })
                    }
                }
            })
        },
    }

}
