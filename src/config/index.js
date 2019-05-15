import Vue from "vue";
export default {
    //设置弹出消息的样式 element UI
    message(data,options){
        Vue.prototype.$message({
            message: data.msg, //显示的文字
            type: options, //类型 列：success error
            showClose : true //是否显示关闭按钮  显示
        });
    }
}