import Vue from 'vue'
import Router from 'vue-router'

import Login from '../views/login/index'
// import Err404 from '../views/error/404.vue'

import Layout from '../views/layout/Layout'
import Dashboard from '../views/dashboard/index'
import DeviceData from '../views/deviceData/index'
import DeviceManage from '../views/deviceManage/index'
import DeviceGroupManage from '../views/deviceGroupManage/index'
import UserManage from '../views/userManage/index'
import UserGroupManage from '../views/userGroupManage/index'
import AuthManage from '../views/authManage/index'
import AcountManage from '../views/acountManage/index'
import PersonalCenter from '../views/PersonalCenter/index'

Vue.use(Router)


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
      { path: 'manage', component: DeviceManage, name: '设备管理', icon: 'shebeiguanli' },
      { path: 'group-manage', component: DeviceGroupManage, name: '设备分组管理', icon: 'fenpeishebeizu' }
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
      { path: 'auth-manage', component: AuthManage, name: '权限管理', icon: 'quanxianguanli' },
      { path: 'acount-manage', component: AcountManage, name: '账号管理', icon: 'zhanghaoguanli' }
    ]
  },
  {
    path: '/person',
    component: Layout,
    redirect: '/person',
    noDropdown: true,
    icon: 'gerenzhongxinicon',
    children: [{ path: 'index', component: PersonalCenter, name: '个人中心' }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  //mode: 'history', //后端支持可开
  //scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});