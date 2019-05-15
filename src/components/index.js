import pageInfo from '@/components/common/pageInfo'
import addGoodsType from '@/components/goods/addGoodsType'
import addSmallGoodsType from '@/components/goods/addSmallGoodsType'
const components = {
    pageInfo,
    addGoodsType,
    addSmallGoodsType
}
export default {
     install(Vue){
         for(var key in components){
             Vue.component(key,components[key])
         }
     }
}