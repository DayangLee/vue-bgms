// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'mock/index.js'
import 'assets/iconfont/iconfont'
import IconSvg from 'components/Icon-svg/index.vue'
import * as filters from './filters/index'// 全局vue filter
import { getCookie } from './utils/auth'

Vue.config.productionTip = false

Vue.component('icon-svg', IconSvg)
Vue.use(ElementUI)

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});

const whiteList = ['/login'];// 不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start(); // 开启Progress
    if (getCookie('userToken')) { // 判断是否有token
        if (to.path === '/login') {
            next({ path: '/' });
        } else {
            if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
                store.dispatch('GetInfo').then(res => { // 拉取user_info
                    const roles = res.data.role;
                    store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
                        next({ ...to }); // hack方法 确保addRoutes已完成
                    })
                }).catch(() => {
                    store.dispatch('FedLogOut').then(() => {
                        next({ path: '/login' });
                    })
                })
            } else {
                next();
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        } else {
            next('/login'); // 否则全部重定向到登录页
            NProgress.done(); // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
        }
    }
});
router.afterEach(() => {
    NProgress.done(); // 结束Progress
});

// const whiteList = ['/login']; // 不重定向白名单
// router.beforeEach((to, from, next) => {
//     console.log(to);
//     console.log(from)
//     NProgress.start(); // 开启Progress
//     if (store.getters.token) { // 判断是否有token
//         if (to.path === '/login') {
//             next({ path: '/dashboard/index' });
//         } else {
//             if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
//                 store.dispatch('GetInfo').then(res => { // 拉取user_info
//                     const roles = res.data.role;
//                     store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
//                         //router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
//                         //console.log(to);
//                         next(to.path); // hack方法 确保addRoutes已完成
//                     })
//                 }).catch(err => {
//                     console.log(err);
//                 });
//             } else {
//                 next()
//             }
//         }
//     } else {
//         if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
//             next()
//         } else {
//             next('/login'); // 否则全部重定向到登录页
//             NProgress.done(); // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
//         }
//     }
// });


/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');