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
        searchVal: '', //记录搜索文字
        tableData: [], //table data
        workData: {}, //add's or modify's work Data
        addDialogVisible: false, //control add's dialog open
        modifyDialogVisible: false, //control modify's dialog open
        formLabelWidth: '130px',
      };
    },
  mounted: function () {
    this.getJobs();
  },
  methods: {
    //处理搜索
    handleSearch: async function() {
      var res = await axios
                       .get(this.domain + '/api/work/search/' + this.searchVal)
                       .catch(err=> {
                          tool.error('搜索失败');
                        });
      this.$message('搜索成功');
      this.tableData = res.data;
    },
    //处理发布
    handleRelease: async function(index, row) {
      if (row.bool) {
        this.$message('该岗位已发布');
        return ;
      }
      var res = await axios
                       .put(this.domain + '/api/work/update/' + row._id, {'bool': true})
                       .catch(err=> {
                          tool.error('发布失败');
                        });
      this.$message('发布成功');
      this.getJobs();
      this.modifyDialogVisible  = false;
    },
    //处理取消发布
    handleCancel: async function(index, row) {
      if (!row.bool) {
        this.$message('该岗位未发布');
        return ;
      }
      var res = await axios
                       .put(this.domain + '/api/work/update/' + row._id, {'bool': false})
                       .catch(err=> {
                          tool.error('取消发布失败');
                        });
      this.$message('取消发布成功');
      this.getJobs();
      this.modifyDialogVisible  = false;
    },
    //处理删除
    handleDel: async function(index, row) {
      await axios
              .delete(this.domain + '/api/work/delete/' + row._id)
              .then(res=> {
                if(res.status == 200) {
                  this.$message('删除成功');
                  this.getJobs();
                }
              })
              .catch(err=> {
                 tool.error('删除失败');
               });
    },
    //获取岗位数据
    getJobs: async function() {
      var res = await axios.get(this.domain + '/api/work/get' ).catch(err=> {
        tool.error('获取信息失败');
      });
      res.data.forEach(item=> {
        item.boolVal = item.bool ? '已发布' : '未发布';
        item.startTime = tool.getYMD(item.startTime);
        item.endTime = tool.getYMD(item.endTime);
        item.workStartTime = tool.getYMD(item.workStartTime);
        item.workEndTime = tool.getYMD(item.workEndTime);
      });
      console.log(res.data[0].bool);
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
