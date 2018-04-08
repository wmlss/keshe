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

const studentNav = resolve=> require(['@/page/studentNav.vue'], resolve);
const jobs = resolve=> require(['@/page/jobs.vue'], resolve);
const studentApply = resolve=> require(['@/page/studentApply.vue'], resolve);
const studentApplyed = resolve=> require(['@/page/studentApplyed.vue'], resolve);

const routes = [
  {
    path: '/login',
    component: login
  },
  {
    path: '/root',
    component: navigation,
    name: '',
    children: [{
      path: '/root/jobManage',
      component: jobManage,
      meta: ['岗位设置'],
    },{
      path: '/root/jobCheck',
      component: jobCheck,
      meta: ['岗位审核'],
    },{
      path: '/root/jobAssess',
      component: jobAssess,
      meta: ['岗位考核'],
    },{
      path: '/root/jobAdjust',
      component: jobAdjust,
      meta: ['岗位调整'],
    },{
      path: '/root/jobApply',
      component: jobApply,
      meta: ['岗位申请'],
    },{
      path: '/root/companyManage',
      component: companyManage,
      meta: ['企业管理'],
    },]
  },
  {
    path: '/student',
    component: studentNav,
    name: '',
    children: [{
      path: '/student/jobs',
      component: jobs,
      meta: ['岗位列表'],
    },{
      path: '/student/studentApply',
      component: studentApply,
      meta: ['申请中'],
    },{
      path: '/student/studentApplyed',
      component: studentApplyed,
      meta: ['已通过'],
    },]
  },
];

export default new Router({
  mode: 'history',
  routes,
  strict: process.env.NODE_ENV !== 'production',
});
