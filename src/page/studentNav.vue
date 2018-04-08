<template lang="html">
  <div class="navigation fillcontain">
    <el-row style="height: 100%;">
      <el-col :span='4' style="min-height: 100%; background-color: rgb(238, 241, 246);">
        <el-menu  style="min-height: 100%;" router>
          <el-menu-item index="/student/jobs"><i class="el-icon-setting"></i>岗位列表</el-menu-item>
          <el-menu-item index="/student/studentApply"><i class="el-icon-setting"></i>申请中</el-menu-item>
          <el-menu-item index="/student/studentApplyed"><i class="el-icon-search"></i>已通过</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span='20'style="height: 100%;overflow: auto;">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
@import '../style/mixin';
</style>
