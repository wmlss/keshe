<template lang="html">
<div class="page-wrap">
  <head_top></head_top>
  <el-row type="flex" class="row-bg page-pagination" justify="center">
    <div class="fn-box">
      <el-input v-model="searchVal"
        placeholder="请输入搜索内容">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="success" icon="el-icon-search" round @click="handleSearch">搜索</el-button>
      <el-button type="warning" icon="el-icon-search" round @click="getJobs">刷新</el-button>
    </div>
  </el-row>
  <div class="table_container">
    <el-table
      :data="tableData"
      :height="480"
      ref="table"
      style="width: 100%">
      <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="公司：">
            <span>{{ props.row.companyName }}</span>
          </el-form-item>
          <el-form-item label="负责人：">
            <span>{{ props.row.principal }}</span>
          </el-form-item>
          <el-form-item label="联系电话：">
            <span>{{ props.row.phone }}</span>
          </el-form-item>
          <el-form-item label="发布时间">
            <span>{{ props.row.startTime }}</span>
          </el-form-item>
          <br>
          <el-form-item label="工作地点：">
            <span>{{ props.row.workPlace }}</span>
          </el-form-item>
          <el-form-item label="工作开始时间：">
            <span>{{ props.row.workStartTime }}</span>
          </el-form-item>
          <el-form-item label="工作结束时间：">
            <span>{{ props.row.workEndTime }}</span>
          </el-form-item> <br>
          <el-form-item label="工作描述">
            <span>{{ props.row.workDesc }}</span>
          </el-form-item>
        </el-form>
      </template>
      </el-table-column>
      <el-table-column
      label="岗位名"
      prop="workName">
      </el-table-column>
      <el-table-column
      label="公司名"
      prop="companyName">
      </el-table-column>
      <el-table-column
      label="时薪"
      prop="wage">
      </el-table-column>
      <el-table-column
      label="截止时间"
      prop="endTime">
      </el-table-column>
      <el-table-column
      label="工作地点"
      prop="workDesc">
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
          <el-button
            type="small"
            @click="handleApply(scope.$index, scope.row)">
            申请
          </el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>

  <el-row type="flex" class="row-bg page-pagination" justify="center">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </el-row>

</div>

</template>

<script>
import jobs from '../js/jobs.js';

export default jobs;
</script>

<style lang="css" scoped>
.border {
  border: 1px solid black;
}
.table_container {
  padding: 20px;
}
.text-center {
  text-align: center;
}
.w-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.page-pagination {

}
.fn-box  {
  /* width: 400px; */
  margin-top: 10px;
}
.fn-box > .el-input{
  width: 200px;
  margin-right: 20px;
}
.form .form-item {
  width: 180px;
}
</style>
