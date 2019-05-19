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
        <!--router 设置开启路由跳转  element 属性  background-color 设置背景颜色  text-color 设置未选中字体颜色  active-text-color 设置选中字体颜色 select 设置 激活时的回调函数 default-active 设置当前选中的框  collapse 是否缩隐藏-->
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#67C23A" @select="selectOpen" :router="true" :collapse-transition="false" :default-active="nowIndex" class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span slot="title">管理员设置</span>
            </template>
            <!--route 设置 路由路径  element 属性-->
            <el-menu-item :route="{path:'/isAdminLog'}" index="1-1">管理员登陆日志</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item :route="{path:'/isGoodsType'}" index="2-1" >商品类别列表</el-menu-item>
            <el-menu-item :route="{path:'/isSmallGoodsType'}" index="2-2">商品类别小列表</el-menu-item>
            <el-menu-item :route="{path:'/isGoods'}" index="2-3">商品列表</el-menu-item>
            <el-menu-item :route="{path:'/isGoodsDetails'}" index="2-4">商品详情图片添加</el-menu-item>
            <el-menu-item :route="{path:'/isSlideshow'}" index="2-5">商品轮播图片添加</el-menu-item>
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
        isCollapse: false,
        //将当前选中的index 存到 data中
        nowIndex : sessionStorage.nowIndex
      }
    },
    methods:{
      //激活了哪个选项框的回调函数  index 为当前选中框的index  indexPath 是 父级 index 和 自己 index
      selectOpen(index,indexPath){
        //将当前选中的值存到本地存储中，关闭这个页面会丢失
        sessionStorage.nowIndex = index;
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
