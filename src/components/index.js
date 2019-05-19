import pageInfo from '@/components/common/pageInfo';
import addGoodsType from '@/components/goods/addGoodsType';
import addSmallGoodsType from '@/components/goods/addSmallGoodsType';
import addGoods from '@/components/goods/addGoods';
import addGoodsDetails from '@/components/goods/addGoodsDetails';
import addSlideshow from '@/components/goods/addSlideshow';
const components = {
    pageInfo,
    addGoodsType,
    addSmallGoodsType,
    addGoods,
    addGoodsDetails,
    addSlideshow
}
export default {
     install(Vue){
         for(var key in components){
             Vue.component(key,components[key])
         }
     }
}