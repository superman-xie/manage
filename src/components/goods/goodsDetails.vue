<template>
    <div>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="商品列表">
                <!--搜索数据的绑定 goodsTypeSearch-->
                <el-input v-model="goodsSearch" placeholder="请输入要查看的商品列表"></el-input>
            </el-form-item>
            <el-form-item>
                <!-- 调用getSmallGoodsType 函数 传入一个对象，一个当前的pageIndex  smallGoodsTypeSearch要搜索的数据  -->
                <el-button type="success" @click="">查询</el-button>
            </el-form-item>
            <el-form-item>
                <!--添加商品类别  将state中的isUpdate 变为 false   开启添加窗口-->
                <el-button type="success" @click="isUpdate = false;addGoodsDetails = true">添加详情页图片</el-button>
            </el-form-item>
        </el-form>
        <!--loading 判断是否为加载   data 加载数据-->
        <el-table
                v-loading="$store.state.isLoading"
                :data="$store.state.goods.goodsDetailsPicList"
                border
                style="width: 100%">
            <el-table-column
                    label="商品Id"
                    >
                <template slot-scope="scope">
                    <i class="el-icon-info"></i>
                    <span style="margin-left: 10px">{{ scope.row._id }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="商品名称">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.goodsName }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="图片描述">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.goodsDetailsPicInfo }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="商品详情图片"
                    >
                <template slot-scope="scope">
                    <span><img class="pic" :src="$store.state.config.baseUrl+scope.row.goodsDetailsPic" alt=""></span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <!-- isUpdate改变为 true     findOneGoodsType  使用该函数 查找这个商品类型的数据  addGoodsDetails 改变数据 打开窗口-->
                    <!--<el-button-->
                            <!--icon="el-icon-edit"-->
                            <!--size="mini"-->
                            <!--type="success"-->
                            <!--@click=""-->

                    <!--&gt;添加轮播图图片</el-button>-->
                    <el-button
                            icon="el-icon-delete"
                            size="mini"
                            type="success"
                            @click="addGoodsDetails = true"
                    >添加详情页图片</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--模态框  传入一个开关窗口的addGoodsDetails   传入一个判断按钮的数据 isUpdate-->
        <addGoodsDetails :addGoodsDetails.sync="addGoodsDetails" :isUpdate.sync="isUpdate"></addGoodsDetails>
        <pageInfo actionsName="getGoodsList"></pageInfo>
    </div>
</template>
<script>
    //引入vue
    import Vue from "vue";
    export default {
        name: "goodsDetail",
        data(){
            return {
                //搜索的内容
                goodsSearch : "",
                addGoodsDetails : false,
                isUpdate : false
            }
        },
        mounted(){
            //初始化页面页数
            this.$store.commit("SET_INIT");
            // // 获取商品类型小列表
            this.$store.dispatch("goodsDetailsPicList");
        }
    }
</script>
<style scoped>
    /*设置图片的样式*/
    .pic{
        max-height: 100px;
        max-width : 140px;
    }
</style>