import head_top from '../components/headTop';
import config from '../config/config.js';
import tool from './tool.js'
import axios from '../axiosWrap.js';

export default {
  components: {
    head_top,
  },
  data() {
      return {
        domain: config.domain,
        tableData: [], //table data
        searchVal: '', //记录搜索文字
        workData: {}, //add's or modify's work Data
        addDialogVisible: false, //control add's dialog open
        modifyDialogVisible: false, //control modify's dialog open
        formLabelWidth: '130px',
      };
    },
  mounted: function () {
    this.getApplys();
  },
  methods: {
    workDetail(row) {
      this.workData = deepCopy(row.work);
      this.modifyDialogVisible  = true;
    },
    //处理取消岗位申请
    handleCancel: async function(index, row) {
      var data = {
        studentId: localStorage.token,
        workId: row.work._id,
      };
      await axios
             .delete(this.domain + '/api/apply/delete', {
                params: data
              })
             .then(res=> {
               if(res.status == 200) {
                 this.$message('取消申请成功');
                 this.getApplys();
               }
             })
             .catch(err=> {
                tool.error('取消申请失败');
              });
    },
    //获取岗位数据
    getApplys: async function() {
      await axios.get(this.domain + '/api/apply/getAll' )
      .then(res=> {
        var tableData = [];
        res.data.forEach(item=> {
          //未批准则可显示且限定为此学号的
          if (!item.bool && item.student.studentId == localStorage.token) {
            item.work.startTime = tool.getYMD(item.work.startTime);
            item.work.endTime = tool.getYMD(item.work.endTime);
            item.work.workStartTime = tool.getYMD(item.work.workStartTime);
            item.work.workEndTime = tool.getYMD(item.work.workEndTime);
            item.boolVal = item.bool ? '允许' : '待批准';
            tableData.push(item);
          }
        });
        this.tableData = tableData;
      })
      .catch(err=> {
        tool.error('获取信息失败');
      });
    },
  }
};
//obj deep copy
function deepCopy(original) {
  var obj = {};
  var keys = Object.keys(original);

  for (var i=0; i<keys.length; i++) {
    var val = original[keys[i]];
    if (typeof val  === 'object') {
      obj[keys[i]] = deepCopy(val);
    } else {
      obj[keys[i]] = val;
    }
  }
  return obj;
}
