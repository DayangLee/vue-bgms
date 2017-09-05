import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(Router)
import Layout from '../views/layout/Layout'

const Login = _import('login/index')
const Err404 = _import('error404/index')
const testPage = _import('testPage/index')

const Dashboard = _import('dashboard/index')
const DeviceData = _import('deviceData/index')
const DeviceManage = _import('deviceManage/index')
const DeviceGroupManage = _import('deviceGroupManage/index')
const UserManage = _import('userManage/index')
const UserGroupManage = _import('userGroupManage/index')
const AuthManage = _import('authManage/index')
const AcountManage = _import('acountManage/index')
const PersonalCenter = _import('PersonalCenter/index')
const LogicalRule = _import('logicalRule/index')
const BigScreen = _import('bigScreen/index')


// import Login from '../views/login/index'
// import Err404 from '../views/error404/index'
// import testPage from 'views/testPage/index'
// import Dashboard from '../views/dashboard/index'
// import DeviceData from '../views/deviceData/index'
// import DeviceManage from '../views/deviceManage/index'
// import DeviceGroupManage from '../views/deviceGroupManage/index'
// import UserManage from '../views/userManage/index'
// import UserGroupManage from '../views/userGroupManage/index'
// import AuthManage from '../views/authManage/index'
// import AcountManage from '../views/acountManage/index'
// import PersonalCenter from '../views/PersonalCenter/index'



/**
 * icon : the icon show in the sidebar
 * hidden : if hidden:true will not show in the sidebar
 * noDropdown : if noDropdown:true will not has submenu
 * meta : { role: ['admin'] }  will control the page role
 **/

export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  { path: '/404', component: Login, hidden: true },
  { path: '/401', component: Login, hidden: true },
  {
    path: '/dashboard',
    component: Layout,
    noDropdown: true,
    name: '主页',
    icon: 'zhuye',
    children: [{ path: 'index', component: Dashboard, name: '主页' }]
  },
  {
    path: '/device',
    component: Layout,
    redirect: '/device',
    name: '设备',
    icon: 'xiala',
    children: [
      { path: 'index', component: DeviceData, name: '设备总览', icon: 'shebeishuju' },
      { path: 'manage', component: DeviceManage, name: '设备管理', icon: 'shebeiguanli' }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    name: '用户',
    icon: 'xiala',
    meta: { role: ['admin', 'agent'] },
    children: [
      { path: 'index', component: UserManage, name: '用户管理', icon: 'yonghu' },
      { path: 'group-manage', component: UserGroupManage, name: '用户组管理', icon: 'yonghuzu-shixin' },
      { path: 'auth-manage', component: Err404, name: '权限管理', icon: 'quanxianguanli' },
      { path: 'acount-manage', component: AcountManage, name: '账号管理', icon: 'zhanghaoguanli' }
    ]
  },
  {
    path: '/liandong',
    component: Layout,
    redirect: '/liandong',
    noDropdown: true,
    icon: 'biaojianluojiguanxi',
    children: [{ path: 'index', component: LogicalRule, name: '联动规则' }]
  },
  {
    path: '/daping',
    component: Layout,
    redirect: '/daping',
    noDropdown: true,
    icon: 'dapingyemian',
    children: [{ path: 'index', component: BigScreen, name: '大屏页面' }]
  },
  {
    path: '/person',
    component: Layout,
    redirect: '/person',
    noDropdown: true,
    icon: 'gerenzhongxinicon',
    children: [{ path: 'index', component: PersonalCenter, name: '个人中心' }]
  },
  {
    path: '/test',
    component: Layout,
    redirect: '/test',
    noDropdown: true,
    icon: 'gerenzhongxinicon',
    children: [{ path: 'index', component: testPage, name: '页面测试' }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  //mode: 'history', //后端支持可开
  //scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});