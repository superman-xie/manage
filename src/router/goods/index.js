import goodsType from '@/components/goods/goodsType';
import smallGoodsType from '@/components/goods/smallGoodsType';
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
        path : "smallGoodsType",
        name : "smallGoodsType",
        component : smallGoodsType,
        meta : {
            isAuthorization : true
        }
    }
]