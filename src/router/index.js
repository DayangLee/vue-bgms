import Vue from 'vue'
import Router from 'vue-router'

import Login from '../views/login/index.vue'
// import Err404 from '../views/error/404.vue'

import Layout from '../views/layout/Layout.vue'
import Hello from '../views/Hello/index.vue'

Vue.use(Router)

// export default new Router({
//   mode: 'history',
//   routes: [
//     {
//       path: '/',
//       name: 'Login',
//       component: Login
//     }
//   ]
// })

/**
 * icon : the icon show in the sidebar
 * hidden : if hidden:true will not show in the sidebar
 * noDropdown : if noDropdown:true will not has submenu
 * meta : { role: ['admin'] }  will control the page role
 **/

export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  { path: '/404', component: Hello, hidden: true },
  { path: '/401', component: Hello, hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{ path: 'dashboard', component: Hello }]
  },
  {
    path: '/introduction',
    component: Layout,
    redirect: '/introduction/index',
    icon: 'xinrenzhinan',
    noDropdown: true,
    children: [{ path: 'index', component: Hello, name: '简述' }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    name: '权限测试',
    icon: 'quanxian',
    meta: { role: ['admin'] },
    noDropdown: true,
    children: [{ path: 'index', component: Hello, name: '权限测试页', meta: { role: ['admin'] } }]
  },
  {
    path: '/components',
    component: Layout,
    redirect: '/components/index',
    name: '组件',
    icon: 'zujian',
    children: [
      { path: 'index', component: Hello, name: '介绍 ' },
      { path: 'tinymce', component: Hello, name: '富文本编辑器' },
      { path: 'markdown', component: Hello, name: 'Markdown' }
    ]
  },
  {
    path: '/charts',
    component: Layout,
    redirect: '/charts/index',
    name: '图表',
    icon: 'tubiaoleixingzhengchang',
    children: [
      { path: 'index', component: Hello, name: '介绍' },
      { path: 'keyboard', component: Hello, name: '键盘图表' },
      { path: 'keyboard2', component: Hello, name: '键盘图表2' }
    ]
  },
  {
    path: '/errorpage',
    component: Layout,
    redirect: 'noredirect',
    name: '错误页面',
    icon: '404',
    children: [
      { path: '401', component: Hello, name: '401' },
      { path: '404', component: Hello, name: '404' }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];