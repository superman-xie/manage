const filters = {
    date(v){
        var date = new Date(v);
        return date.getFullYear() + "-" +
            ((date.getMonth() + 1)).toString().padStart(2, "0") + "-" +
            (date.getDate()).toString().padStart(2, "0") + " " +
            (date.getHours()).toString().padStart(2, "0") + ":" +
            (date.getMinutes()).toString().padStart(2, "0") + ":" +
            (date.getSeconds()).toString().padStart(2, "0")
    },
    currency(v,n=2){
        return "$"+v.toFixed(n);
    },
    issShow(v) {
        return v === 1 ? "是" : "否"
    }
}
//通过install 设置成vue的属性
export default {
    install(Vue){
        for(var key in filters){
            Vue.filter(key,filters[key]);
        }
    }
}
