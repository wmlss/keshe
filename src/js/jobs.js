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
        addDialogVisible: false, //control add's dialog open
        modifyDialogVisible: false, //control modify's dialog open
        formLabelWidth: '130px',
        selectedIndex: {}, //选中的work的table中的索引
        workData: {
          workName: '',
          companyName: '',
          principal: '',
          phone: '',
          wage: '',
          workPlace: '',
          startTime: '',
          endTime: '',
          workStartTime: '',
          workEndTime: '',
        }, //显示的详情,选中的work的深度复制
        compamyOption: [], //记录可选择的公司
        ruleForm: {
         workName: '',
         companyName: '',
         principal: '',
         phone: '',
         wage: '',
         workPlace: '',
         startTime: '',
         endTime: '',
         workStartTime: '',
         workEndTime: '',
       },
        rules: {
          workName: [
            { required: true, message: '请输入岗位名称', trigger: 'blur' },
          ],
         companyName: [
            { required: true, message: '请输入公司名称', trigger: 'change' },
         ],
         principal: [
            { required: true, message: '请输入负责人名称', trigger: 'blur' },
         ],
         phone: [
            { required: true, message: '请输入电话', trigger: 'blur' },
         ],
         wage: [
            { required: true, message: '请输入时薪', trigger: 'blur' },
         ],
         workPlace: [
            { required: true, message: '请输入工作地点', trigger: 'blur' },
         ],
         startTime: [
            { required: true, message: '请选择发布日期', trigger: 'change' },
         ],
         endTime: [
            { required: true, message: '请选择截止日期', trigger: 'change' },
         ],
         workStartTime: [
            { required: true, message: '请选择工作开始日期', trigger: 'change' },
         ],
         workEndTime: [
            { required: true, message: '请选择工作结束日期', trigger: 'change' },
         ],
        }
      };
    },
  mounted: function () {
    this.getJobs();
  },
  methods: {
    //处理申请
    handleApply: async function(index, row) {
      var data = {
        workId : row._id,
        studentId : localStorage.token
      }
     await axios
         .post(this.domain + '/api/apply/add', data)
         .then(res=> {
           if(res.status == 200) {
             this.$message('已申请');
           }
         })
         .catch(err=> {
            tool.error('申请失败');
          });
    },
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
    //获取岗位数据
    getJobs: async function() {
      var applyedWorkId = [];
      await axios.get(this.domain + '/api/apply/getAll' )
      .then(res=> {
        res.data.forEach(item=> {
          //此学号已申请的
          if (item.student.studentId == localStorage.token) {
            applyedWorkId.push(item.work._id)
          }
        });
      })
      .catch(err=> {
        tool.error('获取信息失败');
      });

      axios.get(this.domain + '/api/work/get' )
      .then(res=> {
        var tableData = [];
        res.data.forEach(item=> {
          if (item.bool && (applyedWorkId.indexOf(item._id)==-1) ) {
            item.startTime = tool.getYMD(item.startTime);
            item.endTime = tool.getYMD(item.endTime);
            item.workStartTime = tool.getYMD(item.workStartTime);
            item.workEndTime = tool.getYMD(item.workEndTime);
            tableData.push(item);
          }
        });
        this.tableData = tableData;
      })
      .catch(err=> {
        console.log(err);
        // tool.error(err, '获取信息失败');
      });

    },
    //获取可选公司数据
    getCompanys: async function() {
      var res = await axios.get(this.domain + '/api/company/get' ).catch(err=> {
        tool.error('获取信息失败');
      });
      this.compamyOption = res.data;
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
