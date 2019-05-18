import goodsType from '@/components/goods/goodsType';
import smallGoodsType from '@/components/goods/smallGoodsType';
import goods from '@/components/goods/goods'
export default [
    {
        path : "/goodsType",
        name : "goodsType",
        component : goodsType,
        meta:{
            isAuthorization : true
        }
    },
    {
        path : "/smallGoodsType",
        name : "smallGoodsType",
        component : smallGoodsType,
        meta : {
            isAuthorization : true
        }
    },
    {
        path : "/goods",
        name : "goods",
        component : goods,
        meta : {
            isAuthorization : true
        }
    }
]