import axios from 'axios';
import router from './router/index.js';
// axios.interceptors.request.use(
//
// );

//请求拦截器，添加token
axios.interceptors.request.use(
  config => {
    //自动加上认证
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token;
    } else {
      config.headers.Authorization = localStorage.token2;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
});

//响应拦截器
axios.interceptors.response.use(
  response=> {
  return response;
  },
  error=> {
  if (!!error.response) {
    console.log('error.response.status=>' + error.response.status);
    switch(error.response.status) {
      //未登录返回登录界面
      case 403:
        alert('您未登录');
        router.push({path: '/login'});
        break;
      //未登录返回登录界面
      case 401:
        alert('您未登录');
        router.push({path: '/login'});
        break;
    }
  }
  return Promise.reject(error);
});

export default axios;
