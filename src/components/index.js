import pageInfo from '@/components/common/pageInfo'
import addGoodsType from '@/components/goods/addGoodsType'
const components = {
    pageInfo,
    addGoodsType
}
export default {
     install(Vue){
         for(var key in components){
             Vue.component(key,components[key])
         }
     }
}