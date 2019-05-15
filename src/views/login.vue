<template>
    <div class="bg">
        <div class="login">
            <el-form :model="adminForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item label="管理员账号：" prop="adminName" >
                    <el-input v-model="adminForm.adminName" placeholder="请输入管理员账号"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="passWord" >
                    <el-input type="password" v-model="adminForm.passWord" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button style="width:100%" type="primary" @click="login">立即登录</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            return {
                adminForm:{
                    adminName:'',
                    passWord:''
                },
                rules: {
                    adminName: [//为空会提示   提示语句   失焦点就会提示 blur
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        //长度3到5
                        {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
                    ],
                    passWord : [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            login(){
                this.$store.dispatch("login",this);
            }
        }
    }
</script>

<style scoped lang="scss">
    .bg{
        width:100%;
        height:500px;
        margin-top : 200px;
        background:url("../assets/login-bg.jpg") no-repeat;
        overflow: hidden;
        .login{
            width:400px;
            margin:80px auto 0;
            background:#fff;
            padding:30px 44px;
        }
    }

</style>