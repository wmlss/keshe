<template lang="html">
  <div class="navigation ">
    <el-row style="height: 100%;">
      <el-col :span='4' style="min-height: 100%; background-color: #324057;">
        <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
          <el-menu-item index="jobManage"><i class="el-icon-menu"></i>岗位设置</el-menu-item>
          <el-menu-item index="jobCheck"><i class="el-icon-menu"></i>岗位审核</el-menu-item>
          <el-menu-item index="jobAssess"><i class="el-icon-menu"></i>岗位考核</el-menu-item>
          <el-menu-item index="jobAdjust"><i class="el-icon-menu"></i>岗位调整</el-menu-item>
          <el-menu-item index="jobApply"><i class="el-icon-menu"></i>岗位申请</el-menu-item>
          <el-menu-item index="companyManage"><i class="el-icon-menu"></i>企业管理</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <el-row>
      <keep-active>
        <router-view></router-view>
      </keep-active>
    </el-row>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
