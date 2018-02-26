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
      <el-button type="primary" icon="el-icon-search" round @click="handleAdd">新增</el-button>
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
            @click="handleEdit(scope.row)">编辑</el-button>
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
  <el-dialog title="新增岗位" :visible.sync="addDialogVisible">
    <el-form :model="workData" :inline="true" class="form">
      <el-form-item label="岗位" :label-width="formLabelWidth">
        <el-input class="form-item" v-model="workData.workName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="公司" :label-width="formLabelWidth">
        <el-input class="form-item" v-model="workData.companyName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="负责人" :label-width="formLabelWidth">
        <el-input class="form-item" v-model="workData.principal" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth">
        <el-input class="form-item" v-model="workData.phone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="时薪" :label-width="formLabelWidth">
        <el-input class="form-item" v-model="workData.wage" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="工作地点" :label-width="formLabelWidth">
        <el-input class="form-item" v-model="workData.workPlace" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="发布时间" :label-width="formLabelWidth">
        <el-date-picker type="date" placeholder="选择发布时间"
          class="form-item" v-model="workData.startTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="截止时间" :label-width="formLabelWidth">
        <el-date-picker type="date" placeholder="选择截止时间"
         class="form-item" v-model="workData.endTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="工作开始时间" :label-width="formLabelWidth">
        <el-date-picker type="date" placeholder="选择工作开始时间"
          class="form-item" v-model="workData.workStartTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="工作结束时间" :label-width="formLabelWidth">
        <el-date-picker type="date" placeholder="选择工作结束时间"
          class="form-item" v-model="workData.workEndTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="工作描述" :label-width="formLabelWidth">
        <el-input type="textarea" class="form-item" v-model="workData.workDesc" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
    </div>
  </el-dialog>

  <!-- modify Form -->
  <el-dialog title="岗位详情" :visible.sync="modifyDialogVisible">
    <el-form :model="workData" :inline="true" class="form">
      <el-form-item label="岗位" :label-width="formLabelWidth">
        <el-input class="form-item" v-model="workData.workName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="公司" :label-width="formLabelWidth">
        <el-input class="form-item" v-model="workData.companyName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="负责人" :label-width="formLabelWidth">
        <el-input class="form-item" v-model="workData.principal" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth">
        <el-input class="form-item" v-model="workData.phone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="时薪" :label-width="formLabelWidth">
        <el-input class="form-item" v-model="workData.wage" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="工作地点" :label-width="formLabelWidth">
        <el-input class="form-item" v-model="workData.workPlace" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="发布时间" :label-width="formLabelWidth">
        <el-date-picker type="date" placeholder="选择发布时间"
          class="form-item" v-model="workData.startTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="截止时间" :label-width="formLabelWidth">
        <el-date-picker type="date" placeholder="选择截止时间"
         class="form-item" v-model="workData.endTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="工作开始时间" :label-width="formLabelWidth">
        <el-date-picker type="date" placeholder="选择工作开始时间"
          class="form-item" v-model="workData.workStartTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="工作结束时间" :label-width="formLabelWidth">
        <el-date-picker type="date" placeholder="选择工作结束时间"
          class="form-item" v-model="workData.workEndTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="工作描述" :label-width="formLabelWidth">
        <el-input type="textarea" class="form-item" v-model="workData.workDesc" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
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
