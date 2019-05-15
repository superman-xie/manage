import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import adminLog from '@/views/login.vue'
import axios from 'axios'
import filter from '@/filters'
import components from '@/components'
import bus from "@/bus"
Vue.config.productionTip = false
Vue.use(ElementUi)
Vue.use(filter)
Vue.use(components)
Vue.prototype.$bus = bus;
//请求拦截
axios.interceptors.request.use(config=>{
      config.url = "/chu/" + config.url + "?t=" + Date.now();
      config.headers = {
        "Authorization" : localStorage.token
      }
      return config;
})
//响应拦截
axios.interceptors.response.use(({data})=>{
    if(data.ok === -4){
        //超时弹窗
        Vue.prototype.$alert("你的登录已超时","系统消息",{
            showClose : true,
            confirmButtonClass : "clearBtn",
            callback: function(){
                store.commit("OUT_LOGIN");
            }
        })
    }else{
        return data;
    }
})
//路由转换的拦截
router.beforeEach((to,from,next)=>{
        //查看路由中是否需要判断token
        if(to.meta.isAuthorization){
            if(localStorage.token){
                next();
            }else{
                //在main中store可以直接写
                bus.$emit("outLogin")
            }
        }else{
            next();
        }
})
new Vue({
  router,
  store,
    data:{

    },
    methods : {
    },
  mounted(){
    bus.$on("outLogin",()=>{
        this.$store.commit("OUT_LOGIN");
    })
  },
  render: function (h) { return h(this.$store.state.admin.token ? App : adminLog) }
}).$mount('#app')
