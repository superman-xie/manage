<template>
    <div>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="商品列表">
                <!--搜索数据的绑定 goodsTypeSearch-->
                <el-input v-model="smallGoodsTypeSearch" placeholder="请输入要查看的商品列表"></el-input>
            </el-form-item>
            <el-form-item>
                <!-- 调用getSmallGoodsType 函数 传入一个对象，一个当前的pageIndex  smallGoodsTypeSearch要搜索的数据  -->
                <el-button type="success" @click="$store.dispatch('getSmallGoodsType',{pageIndex:$store.state.pageInfo.pageIndex,smallGoodsTypeSearch:smallGoodsTypeSearch})">查询</el-button>
            </el-form-item>
            <el-form-item>
                <!--添加商品类别  将state中的isUpdate 变为 false   开启添加窗口-->
                <el-button type="success" @click="isUpdate = false;visible = true">添加商品类型</el-button>
            </el-form-item>
        </el-form>
        <!--loading 判断是否为加载   data 加载数据-->
        <el-table
                v-loading="$store.state.isLoading"
                :data="$store.state.goodsType.smallGoodsTypeList"
                border
                style="width: 100%">
            <el-table-column
                    label="商品小类型Id"
                    width="250">
                <template slot-scope="scope">
                    <i class="el-icon-info"></i>
                    <span style="margin-left: 10px">{{ scope.row._id }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="商品小类别名称">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.smallGoodsTypeName }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="商品大类别名称">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.goodsTypeName }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="商品小类别排序">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.orderBy }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="商品小类别是否显示">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.smallGoodsIsShow | issShow }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="店铺图片"
                    width="200">
                <template slot-scope="scope">
                    <span style="margin-left: 10px"><img class="pic" :src="$store.state.config.baseUrl+scope.row.smallGoodsTypePic" alt=""></span>
                </template>
            </el-table-column>
            <el-table-column
                    label="添加时间">
                <template slot-scope="scope">
                    <i class="el-icon-s-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.addTime | date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="320px">
                <template slot-scope="scope">
                    <!-- isUpdate改变为 true     findOneGoodsType  使用该函数 查找这个商品类型的数据  visible 改变数据 打开窗口-->
                    <el-button
                            icon="el-icon-edit"
                            size="mini"
                            type="success"
                            @click="isUpdate = true;visible = true;$store.dispatch('findOneSmallGoodsType',scope.row._id);"
                            v-loading.fullscreen.lock="$store.state.fullscreenLoading"
                    >编辑</el-button>
                    <el-button
                            icon="el-icon-delete"
                            size="mini"
                            type="danger"
                            @click="$store.dispatch('delSmallGoodsType',scope.row._id)"
                    >删除</el-button>
                    <el-button
                            icon="el-icon-plus"
                            size="mini"
                            type="primary"
                    >添加商品</el-button>

                </template>
            </el-table-column>
        </el-table>
        <!--模态框  传入一个开关窗口的visible   传入一个判断按钮的数据 isUpdate-->
        <addSmallGoodsType :visible.sync="visible" :isUpdate.sync="isUpdate"></addSmallGoodsType>
        <pageInfo actionsName="getSmallGoodsType"></pageInfo>
    </div>
</template>

<script>
    //引入vue
    import Vue from "vue";
    export default {
        name: "smallGoodsType",
        data(){
            return {
                //搜索的内容
                smallGoodsTypeSearch : "",
                visible : false,
                isUpdate : false
            }
        },
        mounted(){
            //初始化页面页数
            this.$store.commit("SET_INIT");
            // // 获取商品类型列表 从第一页开始
            this.$store.dispatch("getSmallGoodsType",{pageIndex:1});
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