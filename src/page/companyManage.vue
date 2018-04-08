<template lang="html">
<div class="page-wrap">
  <head_top></head_top>
  <el-row type="flex" class="row-bg page-pagination" justify="center">
    <div class="fn-box">
      <el-input v-model="searchVal"
        placeholder="请输入搜索内容"
        >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="success" icon="el-icon-search" round @click="handleSearch">搜索</el-button>
      <el-button type="primary" icon="el-icon-search" round @click="handleAdd">新增</el-button>
      <el-button type="warning" icon="el-icon-search" round @click="getCompanys">刷新</el-button>
    </div>
  </el-row>
  <div class="table_container">
    <el-table
      :data="tableData"
      :height="480"
      style="width: 100%">
      <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="公司地址：">
            <span>{{ props.row.companyPlace }}</span>
          </el-form-item>
        </el-form>
      </template>
      </el-table-column>
      <el-table-column
      label="公司名"
      prop="companyName">
      </el-table-column>
      <el-table-column
      label="负责人"
      prop="principal">
      </el-table-column>
      <el-table-column
      label="电话"
      prop="phone">
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button-group>
          <el-button
            size="mini"
            type="warning"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </el-button-group>
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

  <!-- add Form -->
  <el-dialog title="新增公司" :visible.sync="addDialogVisible">
    <el-form :model="companyData" :inline="true" class="form">
      <el-form-item label="公司" :label-width="formLabelWidth">
        <el-input class="form-item" v-model="companyData.companyName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="负责人" :label-width="formLabelWidth">
        <el-input class="form-item" v-model="companyData.principal" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth">
        <el-input class="form-item" v-model="companyData.phone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="公司地点" :label-width="formLabelWidth">
        <el-input class="form-item" v-model="companyData.companyPlace" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAdded">确 定</el-button>
    </div>
  </el-dialog>

  <!-- modify Form -->
  <el-dialog title="公司详情" :visible.sync="modifyDialogVisible">
    <el-form :model="companyData" :inline="true" class="form">
      <el-form-item label="公司" :label-width="formLabelWidth">
        <el-input class="form-item" v-model="companyData.companyName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="负责人" :label-width="formLabelWidth">
        <el-input class="form-item" v-model="companyData.principal" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth">
        <el-input class="form-item" v-model="companyData.phone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="公司地点" :label-width="formLabelWidth">
        <el-input class="form-item" v-model="companyData.companyPlace" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleEdited">确 定</el-button>
    </div>
  </el-dialog>
</div>

</template>

<script>
import companyManage from '../js/companyManage.js';

export default companyManage;
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
