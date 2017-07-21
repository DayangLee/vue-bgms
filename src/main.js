// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './assets/style/index.scss'

Vue.config.productionTip = false

Vue.component('icon', Icon)
Vue.use(ElementUI)


const whiteList = ['./login'];  // 不重定向白名单
// router.beforeEach((to, from, next) => {
//   NProgress.start();
//   if (store.getters.token) {
//     if (to.path === '/login') {
//       next({ path: '/' });
//     } else {
//       if (to.meta && to.meta.role) {
//         if (hasPermission(store.getters.roles, to.meta.role)) {
//           next();
//         } else {
//           next('/401');
//         }
//       } else {
//         next();
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next()
//     } else {
//       next('/login')
//     }
//   }
// });
// router.afterEach(() => {
//   NProgress.done();
// });




/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
