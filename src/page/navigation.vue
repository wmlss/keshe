<template lang="html">
  <div class="navigation fillcontain">
    <el-row style="height: 100%;">
      <el-col :span='4' style="min-height: 100%; background-color: #324057;">
        <el-menu  style="min-height: 100%;" theme="dark" router>
          <el-menu-item index="/root/jobManage"><i class="el-icon-setting"></i>岗位设置</el-menu-item>
          <el-menu-item index="/root/jobCheck"><i class="el-icon-search"></i>岗位审核</el-menu-item>
          <el-menu-item index="/root/jobApply"><i class="el-icon-upload2"></i>岗位申请管理</el-menu-item>
          <el-menu-item index="/root/jobAdjust"><i class="el-icon-menu"></i>岗位调整</el-menu-item>
          <el-menu-item index="/root/jobAssess"><i class="el-icon-edit"></i>工作考核评分</el-menu-item>
          <el-menu-item index="/root/companyManage"><i class="el-icon-star-on"></i>企业管理</el-menu-item>
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
