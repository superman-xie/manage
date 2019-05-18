import Vue from "vue"
import Vuex from "vuex"
import admin from "./admin"
import goodsType from "./goodsType"
import goods from "./goods"
import config from "./config"
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        pageInfo:{
            pageIndex:1,
            pageSum:1
        },
        isLoading : false,
        fullscreenLoading : false
    },
    mutations:{
        SET_PAGE_INFO(state,info){
            state.pageInfo.pageIndex = info.pageIndex;
            state.pageInfo.pageSum = info.pageSum;
        },
        //初始化页数
        SET_INIT(state){
            state.pageInfo.pageIndex = 1;
            state.pageInfo.pageSum = 1;
        }
    },
    modules : {
        admin,
        goodsType,
        config,
        goods
    }
})