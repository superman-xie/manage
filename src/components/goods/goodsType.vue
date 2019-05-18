<template>
    <div>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="商品列表">
                <!--搜索数据的绑定 goodsTypeSearch-->
                <el-input v-model="goodsTypeSearch" placeholder="请输入要查看的商品列表"></el-input>
            </el-form-item>
            <el-form-item>
                <!-- 调用getGoodsType 函数 传入一个对象，一个当前的pageIndex 要搜索的数据  -->
                <el-button type="success" @click="$store.dispatch('getGoodsType',{pageIndex:$store.state.pageInfo.pageIndex,goodsTypeSearch:goodsTypeSearch})">查询</el-button>
            </el-form-item>
            <el-form-item>
                <!--添加商品类别  将state中的isUpdate 变为 false   开启添加窗口-->
                <el-button type="success" @click="isUpdate = false;visible = true">添加商品类型</el-button>
            </el-form-item>
        </el-form>
        <!--loading 判断是否为加载   data 加载数据-->
        <el-table
                v-loading="$store.state.isLoading"
                :data="$store.state.goodsType.goodsTypeList"
                border
                style="width: 100%">
            <el-table-column
                    label="商品类型Id"
                    width="300">
                <template slot-scope="scope">
                    <i class="el-icon-info"></i>
                    <span style="margin-left: 10px">{{ scope.row._id }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="商品类别">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.goodsTypeName }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="商品类别排序">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.orderBy }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="商品类别是否显示">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.goodsIsShow | isShow }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="添加时间">
                <template slot-scope="scope">
                    <i class="el-icon-s-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.addTime | date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="420px">
                <template slot-scope="scope">
                    <!-- isUpdate改变为 true     findOneGoodsType  使用该函数 查找这个商品类型的数据  visible 改变数据 打开窗口-->
                    <el-button
                            icon="el-icon-edit"
                            size="mini"
                            type="success"
                            @click="isUpdate = true;$store.dispatch('findOneGoodsType',scope.row._id);visible = true;"
                            v-loading.fullscreen.lock="$store.state.fullscreenLoading"
                    >编辑</el-button>
                    <el-button
                            icon="el-icon-delete"
                            size="mini"
                            type="danger"
                            @click="$store.dispatch('delGoodsType',scope.row._id)"
                    >删除</el-button>
                    <el-button
                            icon="el-icon-plus"
                            size="mini"
                            type="primary"

                    >添加商品列表</el-button>
                    <el-button
                            icon="el-icon-plus"
                            size="mini"
                            type="primary"
                    >添加商品</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--模态框  传入一个开关窗口的visible   传入一个判断按钮的数据 isUpdate-->
        <addGoodsType :visible.sync="visible" :isUpdate.sync="isUpdate"></addGoodsType>
        <pageInfo actionsName="getGoodsType"></pageInfo>
    </div>
</template>

<script>
    //引入vue
    import Vue from "vue";
    export default {
        name: "goodsType",
        data(){
            return {
                    goodsTypeSearch : "",
                    visible : false,
                    isUpdate : false
            }
        },
        mounted(){
            //发布该函数  用于关闭窗口
            Vue.prototype.$bus.$on("clearBox",()=>{
                this.visible = false;
            })
            // 初始化页面的页数和起始页
            this.$store.commit("SET_INIT");
            // 获取商品类型列表 从第一页开始
            this.$store.dispatch("getGoodsType",{pageIndex:1});
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