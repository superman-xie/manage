import isGoodsType from '@/components/goods/goodsType';
import isSmallGoodsType from '@/components/goods/smallGoodsType';
import isGoods from '@/components/goods/goods'
import isGoodsDetails from '@/components/goods/goodsDetails'
import isSlideshow from '@/components/goods/isSlideshow'
export default [
    {
        path : "/isGoodsType",
        name : "isGoodsType",
        component : isGoodsType,
        meta:{
            isAuthorization : true
        }
    },
    {
        path : "/isSmallGoodsType",
        name : "isSmallGoodsType",
        component : isSmallGoodsType,
        meta : {
            isAuthorization : true
        }
    },
    {
        path : "/isGoods",
        name : "isGoods",
        component : isGoods,
        meta : {
            isAuthorization : true
        }
    },
    {
        path: "/isGoodsDetails",
        name: "isGoodsDetails",
        component: isGoodsDetails,
        meta: {
            isAuthorization: true
        }
    },
    {
        path : "/isSlideshow",
        name : "isSlideshow",
        component : isSlideshow,
        meta : {
            isAuthorization : true
        }
    }
]