<!--<template>-->
    <!--<div>-->
        <!--<el-form :inline="true" class="demo-form-inline">-->
            <!--<el-form-item label="商品列表">-->
                <!--<el-input v-model="smallGoodsTypeSearch" placeholder="请输入要查看的商品列表"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
                <!--<el-button type="success" @click="">查询</el-button>-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
                <!--&lt;!&ndash;添加商品类别&ndash;&gt;-->
                <!--<el-button type="success" @click="">添加商品类型</el-button>-->
            <!--</el-form-item>-->
        <!--</el-form>-->
        <!--<el-table-->
                <!--v-loading="$store.state.isLoading"-->
                <!--:data=""-->
                <!--border-->
                <!--style="width: 100%">-->
            <!--<el-table-column-->
                    <!--label="商品类型Id"-->
                    <!--width="300">-->
                <!--<template slot-scope="scope">-->
                    <!--<i class="el-icon-info"></i>-->
                    <!--<span style="margin-left: 10px"></span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--label="商品类别">-->
                <!--<template slot-scope="scope">-->
                    <!--<span style="margin-left: 10px"></span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--label="商品类别排序">-->
                <!--<template slot-scope="scope">-->
                    <!--<span style="margin-left: 10px"></span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--label="商品图片"-->
                    <!--width="200">-->
                <!--<template slot-scope="scope">-->
                    <!--<span style="margin-left: 10px"><img class="pic" :src=""  alt=""></span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--label="添加时间">-->
                <!--<template slot-scope="scope">-->
                    <!--<i class="el-icon-s-time"></i>-->
                    <!--<span style="margin-left: 10px"></span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="操作" width="420px">-->
                <!--<template slot-scope="scope">-->
                    <!--<el-button-->
                            <!--icon="el-icon-edit"-->
                            <!--size="mini"-->
                            <!--type="success"-->
                    <!--&gt;编辑</el-button>-->
                    <!--<el-button-->
                            <!--icon="el-icon-delete"-->
                            <!--size="mini"-->
                            <!--type="danger"-->
                            <!--@click=""-->
                    <!--&gt;删除</el-button>-->
                    <!--<el-button-->
                            <!--icon="el-icon-plus"-->
                            <!--size="mini"-->
                            <!--type="primary"-->

                    <!--&gt;添加商品列表</el-button>-->
                    <!--<el-button-->
                            <!--icon="el-icon-plus"-->
                            <!--size="mini"-->
                            <!--type="primary"-->
                    <!--&gt;添加商品</el-button>-->
                <!--</template>-->
            <!--</el-table-column>-->
        <!--</el-table>-->
        <!--&lt;!&ndash;模态框&ndash;&gt;-->

        <!--<pageInfo actionsName=""></pageInfo>-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->
    <!--export default {-->
        <!--name: "smallGoodsType",-->
        <!--data(){-->
            <!--return {-->
                    <!--goodsTypeSearch : "",-->
            <!--}-->
        <!--},-->
        <!--mounted(){-->
            <!--this.$store.commit("SET_INIT");-->
        <!--}-->
    <!--}-->
<!--</script>-->

<!--<style scoped>-->
    <!--.pic{-->
        <!--max-height: 100px;-->
        <!--max-width : 140px;-->
    <!--}-->
<!--</style>-->