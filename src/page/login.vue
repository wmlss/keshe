<!-- 登录界面 -->
<template>
  <div id="login">
  <!-- 登录框 -->
  <div class="overLay"></div>
    <el-form>
          <h2>系统登录</h2>
          <el-form-item label="账号">
            <el-input type="text" auto-complete="off" v-model='username'></el-input>
          </el-form-item>

          <el-form-item label="密码">
              <el-input type="password" auto-complete="off" v-model='password'></el-input>
              <!-- <el-checkbox auto-complete="off" style="float:left">记住密码</el-checkbox> -->
          </el-form-item>

          <el-form-item>
              <el-button type="info" style="width:150px" @click='Login'>登录</el-button>
          </el-form-item>
    </el-form>

  </div>
</template>

<style>
/*背景遮罩层*/
.overLay {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: -1;
    background-color: rgb(71,86,105);
    opacity: 0.5;
    width:100%;
    height: 100%;
}
/*登录框*/
    #login{
      width:30%;
      padding:3%;
      background-color: white;
      margin:0 auto;
      text-align: center;
    }
</style>

<script>
  import axios from './../axiosWrap.js';
  import config from '../config/config.js';
  import tool from '../js/tool.js'
  import router from '../router/index.js'

  export default {
    data() {
      return{
        username:'',
        password:'',
        domain: config.domain,
      }
  },
  methods:{
    Login: async function(){
      // axios.post(this.domain + 'api/root/login',{
      //   id: this.username,
      //   psd: this.password
      // }).then(
      //   (res)=>{
      //     // if(res.data.code==1){
      //     //   this.$router.push('/home')
      //     // }else{
      //     //   this.$message({type:'error',message:res.data.msg})
      //     // }
      //   }).catch((err)=>{
      //     this.$message({type:'error',message:'服务器连接错误！'})
      //   })
      var params = {
        id: this.username,
        psd: this.password
      };
      axios
       .post(this.domain + '/api/student/login', params)
       .then(res=> {
         var status = res.status;
         if (status == 200) {
           if (this.username == 'root') {
             this.$router.push('/root/jobManage');
             localStorage.token2 = 'root';
           } else {
             this.$router.push('/student/jobs');
             localStorage.token = res.data.id;
           }
         }
       })
       .catch(err=> {
          var data = err.response.data;
          this.$message(data.msg);
        });
    }
  }
}
</script>
