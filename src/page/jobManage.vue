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
      <el-button type="primary" icon="el-icon-search" round @click="handleAdd">新增</el-button>
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
      prop="workPlace">
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
  <el-dialog title="新增岗位" :visible.sync="addDialogVisible">
    <el-form  ref="ruleForm" :model="workData" :inline="true" class="form " :rules="rules" >
      <el-form-item label="岗位" :label-width="formLabelWidth" prop="workName">
        <el-input class="form-item" v-model="workData.workName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="公司" :label-width="formLabelWidth" prop="companyName">
        <!-- <el-input class="form-item" v-model="workData.companyName" auto-complete="off"></el-input> -->
        <el-select v-model="workData.companyName" class="form-item" placeholder="请选择公司">
          <el-option
            v-for="item in compamyOption"
            :key="item._id"
            :label="item.label"
            :value="item.companyName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="负责人" :label-width="formLabelWidth" prop="principal">
        <el-input class="form-item" v-model="workData.principal" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
        <el-input class="form-item" v-model="workData.phone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="时薪" :label-width="formLabelWidth" prop="wage">
        <el-input class="form-item" v-model="workData.wage" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="工作地点" :label-width="formLabelWidth" prop="workPlace">
        <el-input class="form-item" v-model="workData.workPlace" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="发布时间" :label-width="formLabelWidth" prop="startTime">
        <el-date-picker type="date" placeholder="选择发布时间"
          class="form-item" v-model="workData.startTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="截止时间" :label-width="formLabelWidth" prop="endTime">
        <el-date-picker type="date" placeholder="选择截止时间"
         class="form-item" v-model="workData.endTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="工作开始时间" :label-width="formLabelWidth" prop="workStartTime">
        <el-date-picker type="date" placeholder="选择工作开始时间"
          class="form-item" v-model="workData.workStartTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="工作结束时间" :label-width="formLabelWidth" prop="workEndTime">
        <el-date-picker type="date" placeholder="选择工作结束时间"
          class="form-item" v-model="workData.workEndTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="工作描述" :label-width="formLabelWidth" >
        <el-input type="textarea" class="form-item" v-model="workData.workDesc" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAdded">确 定</el-button>
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
      <el-button type="primary" @click="handleEdited">确 定</el-button>
    </div>
  </el-dialog>
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
