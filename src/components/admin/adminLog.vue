<template>
    <div>
        <!--表格-->
        <el-table
                border

                :data="$store.state.admin.adminLogList"
                style="width: 100%;">
            <el-table-column
                    label="id"
                    width="400">
                <template slot-scope="scope">
                    <i class="el-icon-info"></i>
                    <span style="margin-left: 10px">{{ scope.row._id }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="管理员名称"
                    width="300">
                <template slot-scope="scope">
                    <i class="el-icon-s-custom"></i>
                    <span style="margin-left: 10px">{{ scope.row.adminName }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="登录时间"
                    width="400">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.addTime | date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="danger"
                            @click="$store.dispatch('delAdminLog',scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pageInfo actionsName="getAdminLog" class="pageInfo"></pageInfo>
    </div>
</template>

<script>
    export default {
        name: "adminLog",
        //vue加载完毕的方法
        mounted(){
            this.$store.commit("SET_INIT")
            this.$store.dispatch("getAdminLog");
        }
    }
</script>
<style scoped>
</style>