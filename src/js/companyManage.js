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
        companyData: {}, //add's or modify's work Data
        addDialogVisible: false, //control add's dialog open
        modifyDialogVisible: false, //control modify's dialog open
        formLabelWidth: '130px',
        selectedIndex: {}, //选中的company的table中的索引
        companyData: {}, //显示的详情,选中的company的深度复制
      };
    },
  mounted: function () {
    this.getCompanys();
  },
  methods: {
    handleAdd: function() {
      this.companyData = {};
      this.addDialogVisible = true;
    },
    handleAdded: async function() {
      var data = this.companyData;
      var res = await axios
                       .post(this.domain + '/api/company/add/', data)
                       .catch(err=> {
                          tool.error('添加失败');
                        });
      this.$message('添加成功');
      this.getCompanys();
      this.addDialogVisible = false;
    },
    //处理搜索
    handleSearch: async function() {
      var res = await axios
                       .get(this.domain + '/api/company/search/' + this.searchVal)
                       .catch(err=> {
                          tool.error('搜索失败');
                        });
      this.$message('搜索成功');
      this.tableData = res.data;
    },
    //处理打开详情
    handleEdit: function(index, row) {
      this.selectedIndex = index;
      this.companyData = deepCopy(row);
      this.modifyDialogVisible  = true;
    },
    //处理修改提交
    handleEdited: async function() {
      var data = this.companyData;
      var res = await axios
                       .put(this.domain + '/api/company/update/' + data._id, data)
                       .catch(err=> {
                          tool.error('修改失败');
                        });
      this.$message('修改成功');
      this.tableData[this.selectedIndex] = this.companyData;
      this.getCompanys();
      this.modifyDialogVisible  = false;
    },
    //处理删除
    handleDelete: async function(index, row) {
      var res = await axios
                       .delete(this.domain + '/api/company/delete/' + row._id)
                       .catch(err=> {
                          tool.error('删除失败');
                        });
      this.$message('删除成功');
      this.getCompanys();
      this.modifyDialogVisible  = false;
    },
    //获取岗位数据
    getCompanys: async function() {
      var res = await axios.get(this.domain + '/api/company/get' ).catch(err=> {
        tool.error('获取信息失败');
      });
      this.tableData = res.data;
    }
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
