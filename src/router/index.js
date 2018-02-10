import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = resolve=> require(['@/page/login.vue'], resolve);
const navigation = resolve=> require(['@/page/navigation.vue'], resolve);
const jobManage = resole=> require(['@/page/jobManage.vue'], resole);
const jobCheck = resolve=> require(['@/page/jobCheck.vue'], resolve);
const jobAssess = resolve=> require(['@/page/jobAssess.vue'], resolve);
const jobAdjust = resolve=> require(['@/page/jobAdjust.vue'], resolve);
const jobApply = resolve=> require(['@/page/jobApply.vue'], resolve);
const companyManage = resolve=> require(['@/page/companyManage.vue'], resolve);

const routes = [
  {
    path: '/login',
    component: login
  },
  {
    path: '/',
    component: navigation,
    name: '',
    children: [{
      path: '/jobManage',
      component: jobManage,
      meta: ['岗位设置'],
    },{
      path: '/jobCheck',
      component: jobCheck,
      meta: ['岗位审核'],
    },{
      path: '/jobAssess',
      component: jobAssess,
      meta: ['岗位考核'],
    },{
      path: '/jobAdjust',
      component: jobAdjust,
      meta: ['岗位调整'],
    },{
      path: '/jobApply',
      component: jobApply,
      meta: ['岗位申请'],
    },{
      path: '/companyManage',
      component: companyManage,
      meta: ['企业管理'],
    },]
  },
];

export default new Router({
  mode: 'history',
  routes,
  strict: process.env.NODE_ENV !== 'production',
});
