<template lang="html">
<div class="page-wrap">
  <head_top></head_top>
  <el-row type="flex" class="row-bg page-pagination" justify="center">
    <div class="fn-box">
      <el-input
        placeholder="请输入搜索内容"
        >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="primary" icon="el-icon-search" round>新增</el-button>
    </div>
  </el-row>
  <div class="table_container">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="所属店铺">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
      </el-table-column>
      <el-table-column
      label="商品 ID"
      prop="id">
      </el-table-column>
      <el-table-column
      label="商品名称"
      prop="name">
      </el-table-column>
      <el-table-column
      label="描述"
      prop="desc">
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
    <el-pagination class="border"
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </el-row>
</div>

</template>

<script>
import jobManage from '../js/jobManage.js';

export default jobManage;
</script>

<style lang="css" scoped>
.border {
  border: 1px solid black;
}
.table_container {
  padding: 20px;
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
</style>
