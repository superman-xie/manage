import axios from 'axios'
import config from '@/config'
export default {
    state: {
        token : localStorage.token,
        adminLogList : []
    },
    mutations : {
        SET_TOKEN(state,token){
            state.token = localStorage.token = token;
        },
        OUT_LOGIN(state){
            localStorage.clear("token");
            state.token = localStorage.token
        },
        SET_ADMIN_LOG(state,adminLogList){
            state.adminLogList = adminLogList;
        }
    },
    actions : {
        //登录
        login({commit},that){
            axios.post("login",{
                        adminName : that.adminForm.adminName,
                        passWord : that.adminForm.passWord
            }).then(data=>{
                if(data.ok === 1){
                    commit("SET_TOKEN",data.token);
                    //成功弹出框
                    that.$message({
                        showClose: true,
                        message: data.msg,
                        type: 'success'
                    })
                }else{
                    that.$message({
                        showClose: true,
                        message: data.msg,
                        type: 'error'
                    })
                }
            })
        },
        //获取管理员登录列表
        getAdminLog({commit},params){
            axios.get("adminLog",{
                params
                }
            ).then(data=>{
                if(data){
                    if(data.ok === 1){
                        commit("SET_ADMIN_LOG",data.adminLogList);
                        commit("SET_PAGE_INFO",{
                            pageIndex : data.pageIndex,
                            pageSum : data.pageSum
                        })
                    }
                }
            })
        },
        //删除管理员登录信息
        delAdminLog({dispatch,rootState},id){
            axios.delete("adminLog",{
                params : {
                    id : id
                }
            }).then(data=>{
                if(data.ok === 1){
                    config.message(data,"success")
                    dispatch("getAdminLog",rootState.pageInfo);
                }
            })
        }

    }
}