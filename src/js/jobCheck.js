import head_top from '../components/headTop';

export default {
  components: {
    head_top,
  },
  data() {
      return {
        tableData: [], //table data
        workData: {}, //add's or modify's work Data
        addDialogVisible: false, //control add's dialog open
        modifyDialogVisible: false, //control modify's dialog open
        formLabelWidth: '130px',
      };
    },
  mounted: function () {

    for(var i=0; i<20; i++) {
      var num = i + 1;
      var item = {
        workName: 'work name ' + num,
        companyName: 'company name ' + num,
        principal: 'company ' + num,
        phone: 'phone ' + num,
        wage: 'wage ' + num,
        workPlace: 'workPlace ' + num,
        startTime: 'startTime ' + num,
        endTime: 'endTime ' + num,
        workStartTime: 'workStartTime ' + num,
        workEndTime: 'workEndTime ' + num,
        workDesc: 'workDesc ' + num,
      };
      this.tableData.push(item);
    }
  },
  methods: {
    handleAdd: function() {
      this.addDialogVisible = true;
    },
    handleEdit: function(row) {
      this.workData = deepCopy(row);
      this.modifyDialogVisible  = true;
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
