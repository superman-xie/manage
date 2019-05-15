<template>
    <el-pagination
            class="pagination"
            background
            layout="prev, pager, next"
            @current-change="currentChange"
            :current-page="$store.state.pageInfo.pageIndex"
            :page-count="$store.state.pageInfo.pageSum">
    </el-pagination>
</template>

<script>
    export default {
        name : "pageInfo",
        props : ["actionsName","params"],
        methods : {
            //    设置pageIndex 和传递参数
            currentChange(pageIndex){
                this.$store.state.pageInfo.pageIndex = pageIndex;
                console.log(this.$store.state.pageInfo.pageIndex)
                this.$store.dispatch(this.actionsName,{
                    ...this.params ? this.params : {},
                    ...{
                        pageIndex
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .pagination{
        text-align: center;
        margin-top :50px;
    }
</style>