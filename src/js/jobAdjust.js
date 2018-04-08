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
        workTable: [], //记录岗位列表数据
        searchVal: '', //记录搜索文字
        workData: {}, //add's or modify's work Data
        clickedApply: {}, //记录选中的申请
        workDialogVisible: false, //control add's dialog open
        modifyDialogVisible: false, //control modify's dialog open
        formLabelWidth: '130px',
      };
    },
  mounted: function () {
    this.getApplys();
  },
  methods: {
    // handleAdd: function() {
    //   this.addDialogVisible = true;
    // },
    // handleEdit: function(row) {
    //   this.workData = deepCopy(row);
    //   this.modifyDialogVisible  = true;
    // },
    workDetail(row) {
      this.workData = deepCopy(row.work);
      this.modifyDialogVisible  = true;
    },
    //处理发布
    handleAdjust: async function(index, row) {
      this.clickedApply = tool.deepCopy(row); //记录选中的申请
      var res = await axios.get(this.domain + '/api/work/get' ).catch(err=> {
        tool.error('获取信息失败');
      });
      res.data.forEach(item=> {
        item.startTime = tool.getYMD(item.startTime);
        item.endTime = tool.getYMD(item.endTime);
        item.workStartTime = tool.getYMD(item.workStartTime);
        item.workEndTime = tool.getYMD(item.workEndTime);
      });
      this.workTable = res.data;
      this.workDialogVisible = true;
    },
    //处理新选择的岗位（进行调整）
    handleAdjusted: async function(index, row) {
      var data = {
        studentId: this.clickedApply.student.studentId,
        workId: this.clickedApply.work._id,
        newWorkId: row._id,
        'bool': true
      };
      var res = await axios
                       .put(this.domain + '/api/apply/adjust/', data)
                       .catch(err=> {
                          tool.error('调整失败');
                        });
      this.$message('调整成功');
      this.getApplys();
      this.workDialogVisible = false;
    },
    //获取申请详情数据
    getApplys: async function() {
      var res = await axios.get(this.domain + '/api/apply/getAll' ).catch(err=> {
        tool.error('获取信息失败');
      });

      res.data.forEach(item=> {
        item.work.startTime = tool.getYMD(item.work.startTime);
        item.work.endTime = tool.getYMD(item.work.endTime);
        item.work.workStartTime = tool.getYMD(item.work.workStartTime);
        item.work.workEndTime = tool.getYMD(item.work.workEndTime);
        item.boolVal = item.bool ? '允许' : '待批准';
      });
      this.tableData = res.data;
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
