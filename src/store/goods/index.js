import axios from 'axios'
import Vue from "vue";
import config from "@/config"
export default {
    state : {
        goodsList: [],
        allGoodsList : [],
        goodsDetailsPicList:[],
        slideShowPicList : []
    },
    mutations : {
        SET_GOODS_LIST(state,goodsList){
            state.goodsList = goodsList
;        },
        SET_ALL_GOODS_LIST(state,allGoodslist){
            state.allGoodsList = allGoodslist;
        },
        SET_GOODS_DETAILS_PIC_LIST(state,goodsDetailsPicList){
            state.goodsDetailsPicList = goodsDetailsPicList
        },
        SET_SLIDE_SHOW_PIC_LIST(state,slideShowPicList){
            state.slideShowPicList = slideShowPicList;
        }
    },
    actions : {
        getGoodsList({commit},params){
            axios.get("getGoodsList",{
                params
            }).then(data=>{
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
        //获取全部商品
        getAllGoodsList({commit}){
            axios.get("getAllGoodsList").then(data=>{
                commit("SET_ALL_GOODS_LIST",data.goodsList);
            })
        },
        //获取全部商品图片
        goodsDetailsPicList({commit}){
            axios.get("goodsDetailsPicList").then(data=>{
                commit("SET_GOODS_DETAILS_PIC_LIST",data.goodsDetailsPicList);
            })
        },
        //获取全部轮播图图片
        slideShowPicList({commit}){
            axios.get("slideShowPicList").then(data=>{
                commit("SET_SLIDE_SHOW_PIC_LIST",data.slideShowPicList);
            })
        }
    }

}
