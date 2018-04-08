export default {
  //deep copy object
  deepCopy: function(original) {
    var obj = {};
    var keys = Object.keys(original);

    for (var i=0; i<keys.length; i++) {
      var val = original[keys[i]];
      if (typeof val  === 'object') {
        obj[keys[i]] = this.deepCopy(val);
      } else {
        obj[keys[i]] = val;
      }
    }
    return obj;
  },
  //获得年月日
  getYMD: function(str) {
    var date = new Date(str);
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  },
  //后台交互错误处理
  error: function(err, mes) {
    mes = mes || '系统出错';
    console.log(err);
    this.$message.error(mes);
  }
}
