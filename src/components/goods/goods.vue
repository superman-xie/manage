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
                <el-button type="success" @click="isUpdate = false;visible = true">添加商品</el-button>
            </el-form-item>
        </el-form>
        <!--loading 判断是否为加载   data 加载数据-->
        <el-table
                v-loading="$store.state.isLoading"
                :data="$store.state.goods.goodsList"
                border
                style="width: 100%">
            <el-table-column
                    label="商品Id"
                    width="100">
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
                    label="商品详情" width="250">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.goodsInfo }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="商品所属小类别名称">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.smallGoodsTypeName }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="商品排序">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.orderBy }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="商品原价">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.originalPrice }}元</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="商品现价">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.currentPrice }}元</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="店铺图片"
                    width="150">
                <template slot-scope="scope">
                    <span style="margin-left: 10px"><img class="pic" :src="$store.state.config.baseUrl+scope.row.goodsSmallPic" alt=""></span>
                </template>
            </el-table-column>
            <el-table-column
                    label="添加时间">
                <template slot-scope="scope">
                    <i class="el-icon-s-time"></i>
                    <span>{{ scope.row.addTime | date}}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品详情信息" width="140">
                <template slot-scope="scope">
                    <el-popover
                            placement="right"
                            width="520"
                            border
                            trigger="hover">
                        <el-row>
                            <el-col :span="3"><div class="bg-purple">商品产地</div></el-col>
                            <el-col :span="3"><div class="bg-purple">商品规格</div></el-col>
                            <el-col :span="3"><div class="bg-purple">储存条件</div></el-col>
                            <el-col :span="3"><div class="bg-purple">保质期</div></el-col>
                            <el-col :span="3"><div class="bg-purple">是否显示</div></el-col>
                            <el-col :span="3"><div class="bg-purple">是否优选</div></el-col>
                            <el-col :span="3"><div class="bg-purple">点击量</div></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="3"><div class="grid-content bg-purple">{{ scope.row.goodsPlace}}</div></el-col>
                            <el-col :span="3"><div class="grid-content bg-purple">{{ scope.row.goodsSpecs}}</div></el-col>
                            <el-col :span="3"><div class="grid-content bg-purple">{{ scope.row.storageRequire}}</div></el-col>
                            <el-col :span="3"><div class="grid-content bg-purple">{{ scope.row.storageTime}}</div></el-col>
                            <el-col :span="3"><div class="grid-content bg-purple">{{ scope.row.isShow | isShow}}</div></el-col>
                            <el-col :span="3"><div class="grid-content bg-purple">{{ scope.row.isPreference | isShow}}</div></el-col>
                            <el-col :span="3"><div class="grid-content bg-purple">{{ scope.row.clickSum }}</div></el-col>

                        </el-row>
                        <el-button slot="reference" @click="popover = !popover">移入查看</el-button>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="320px">
                <template slot-scope="scope">
                    <!-- isUpdate改变为 true     findOneGoodsType  使用该函数 查找这个商品类型的数据  visible 改变数据 打开窗口-->
                    <el-button
                            icon="el-icon-edit"
                            size="mini"
                            type="success"
                            @click=""

                    >编辑</el-button>
                    <el-button
                            icon="el-icon-delete"
                            size="mini"
                            type="danger"
                            @click=""
                    >删除</el-button>
                    <el-button
                            icon="el-icon-plus"
                            size="mini"
                            type="primary"
                            @click="addGoodsDetails = true"
                    >添加轮播图图片</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--模态框  传入一个开关窗口的visible   传入一个判断按钮的数据 isUpdate-->
        <addGoods :visible.sync="visible" :isUpdate.sync="isUpdate"></addGoods>
        <addGoodsDetails :addGoodsDetails.sync="addGoodsDetails" :isUpdate.sync="isUpdate"></addGoodsDetails>
        <pageInfo actionsName="getGoodsList"></pageInfo>
    </div>
</template>
<script>
    //引入vue
    import Vue from "vue";
    export default {
        name: "goods",
        data(){
            return {
                //搜索的内容
                goodsSearch : "",
                visible : false,
                popover : false,
                isUpdate : false,
                addGoodsDetails : false
            }
        },
        mounted(){
            //初始化页面页数
            this.$store.commit("SET_INIT");
            // // 获取商品类型小列表
            this.$store.dispatch("getGoodsList",{pageIndex:1});
        }
    }
</script>

<style scoped>
    /*设置图片的样式*/
    .pic{
        max-height: 100px;
        max-width : 140px;
    }
    .bg-purple {
        background: #d3dce6;
        text-align: center;
        padding:5px 0;
        border:1px solid #fff;
    }
</style>