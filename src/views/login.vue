<template>
    <div class="bg">
        <h3 class="register">注册</h3>
        <div class="login">
            <el-form :model="adminForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item label="管理员账号：" prop="adminName" >
                    <el-input v-model="adminForm.adminName" placeholder="请输入管理员账号"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="passWord" >
                    <el-input type="password" v-model="adminForm.passWord" placeholder="请输入密码"  @keyup.native.enter="login"></el-input>
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
        height:100%;
        background:url("../assets/login-bg.jpg") no-repeat;
        background-size: cover;
        overflow: hidden;
        .register{
            text-align: right;
            color:#fff;
            margin:10px 30px;
            text-shadow: 0 0 5px #fff, 0 0 20px #fefcc9, 10px -10px 30px #feec85, -20px -20px 40px #ffae34, 20px -40px 50px #ec760c, -20px -60px 60px #cd4606, 0 -80px 70px #973716, 10px -90px 80px #451b0e;
        }
        .login{
            position: fixed;
             left: 0;
            top:0;
            bottom:0;
            right:0;
            width:400px;
            margin:auto;
            height:280px;
            background:#fff;
            padding:30px 44px;
            border-radius:2%;
            box-shadow: 0px 0px 100px 0px rgba(0, 0, 0,.8);
        }
    }

</style>