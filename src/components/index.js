import pageInfo from '@/components/common/pageInfo'
import addGoodsType from '@/components/goods/addGoodsType'
import addSmallGoodsType from '@/components/goods/addSmallGoodsType'
import addGoods from '@/components/goods/addGoods'
const components = {
    pageInfo,
    addGoodsType,
    addSmallGoodsType,
    addGoods
}
export default {
     install(Vue){
         for(var key in components){
             Vue.component(key,components[key])
         }
     }
}