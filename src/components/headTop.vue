<template lang="html">
  <div class="header_container">
    <el-breadcrumb separator="/" class="">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown class=""  menu-align='start'>
      <img src="../../logo.jpg"  class="avator">
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item >首页</el-dropdown-item>
        <el-dropdown-item >退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
@import '../style/mixin';
.header_container{
  background-color: #EFF2F7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
.avator{
  .wh(36px, 36px);
  border-radius: 50%;
  margin-right: 37px;
}
.el-dropdown-menu__item{
      text-align: center;
  }
</style>
