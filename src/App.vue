<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col class="logo" :span="8" :style="{width:isCollapse?'64px':'240px'}">
          <strong>{{isCollapse?'厨':'我厨管理系统'}}</strong>
        </el-col>
        <el-col class="info" :span="8">
          <i :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'" @click="isCollapse=!isCollapse"></i>
        </el-col>
        <el-col :span="8" class="adminInfo">
          <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            <span></span> <img src="./assets/logo.png" alt="">
                        </span>
            <el-dropdown-menu slot="dropdown">
              <!--native是干嘛的？-->
              <el-dropdown-item @click.native="$store.commit('OUT_LOGIN')">退出登陆</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside  :style="{width:isCollapse?'auto':'241px'}">
        <el-menu :collapse-transition="false" default-active="1-1" class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">管理员设置</span>
            </template>
            <el-menu-item index="1-1" @click="$router.push('/adminLog')">管理员登陆日志</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item index="2-1" @click="$router.push({name:'goodsType'})">商品类别列表</el-menu-item>
            <el-menu-item index="2-2" @click="$router.push({name:'smallGoodsType'})">商品小列表</el-menu-item>
          </el-submenu>


        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  export default {
    data() {
      return {
        // 是否折叠
        isCollapse: false
      }
    },
    methods:{
      fn(){
        console.log(121212);
      }
    }
  }
</script>
<style lang="scss">
  *{
    margin:0;
    padding:0;
  }
  html,body{
    width:100%;
    height:100%;
    overflow: hidden;
  }
  .el-container{
    height:100%;
    .el-aside{
      height:100% !important;
    }
  }

  .el-menu-item{
    color:#67C23A !important;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
    height:100%;
  }
  .el-header {
    padding: 0px!important;
    background: #67C23A;
    color: #ffffff;
    .info{
      font-size:30px;
      line-height: 60px;
    }
    .logo {
      text-align:center;
      width: 240px;
      font-size: 25px;
      line-height: 60px;
      border-right: 1px solid rgba(238, 241, 146, 0.3);
    }
    .adminInfo {
      float: right;
      text-align: right;
      padding-right: 20px;
      line-height: 60px;
      .el-dropdown-link {
        span {
          color: #fff;
        }
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
    }
  }
  .toolbar {
    background:#f4f4f4;
    padding:10px;
    marign:20px 0!important;
  }
  .el-table th,.el-table td{
    text-align:center!important;
  }
  .toolbar .el-form-item{
    margin-bottom:0px;
  }
  .clearBtn{
    background:#F56C6C !important;
    border-color : #F56C6C !important
  }
</style>
