// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './assets/style/index.scss'
import './mock/index.js'
import './components/Icon-svg/index'
import './assets/iconfont/iconfont'
import * as filters from './filters/index'// 全局vue filter

Vue.config.productionTip = false

Vue.component('icon', Icon)
Vue.use(ElementUI)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});
function hasPermission(roles, permissionRoles) {
    if (roles.indexOf('admin') >= 0) return true; // admin权限 直接通过
    if (!permissionRoles) return true;
    if (route.meta.role.indexOf(roles)) {
        return true
    } else {
        return false
    }
}
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

const whiteList = ['/login']; // 不重定向白名单
// router.beforeEach((to, from, next) => {
//     NProgress.start();
//     if (store.getters.token) {
//         if (to.path === '/login') {
//             next({ path: '/' });
//         } else {
//             if (to.meta && to.meta.role) {
//                 if (hasPermission(store.getters.roles, to.meta.role)) {
//                     next();
//                 } else {
//                     next('/401');
//                 }
//             } else {
//                 next();
//             }
//         }
//     } else {
//         if (whiteList.indexOf(to.path) !== -1) {
//             next()
//         } else {
//             next('/login')
//         }
//     }
// });
router.beforeEach((to, from, next) => {
    console.log(to);
    console.log(from)
    NProgress.start(); // 开启Progress
    if (store.getters.token) { // 判断是否有token
        if (to.path === '/login') {
            next({ path: '/dashboard/index' });
        } else {
            if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
                store.dispatch('GetInfo').then(res => { // 拉取user_info
                    const roles = res.data.role;
                    store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
                        //router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                        //console.log(to);
                        next(to.path); // hack方法 确保addRoutes已完成
                    })
                }).catch(err => {
                    console.log(err);
                });
            } else {
                next()
                // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
                // if (hasPermission(store.getters.roles, to.meta.role)) {
                //   next();//
                // } else {
                //   next({ path: '/401', query: { noGoBack: true } });
                // }
                // 可删 ↑
            }
        }
    } else if (getCookie('Token')) { // 判断是否有token
        if (to.path === '/login') {
            next({ path: '/dashboard/index' });
        } else {
            const roles = getCookie('Token');
            
            store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
                //router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                //console.log(to);
                next(); // hack方法 确保addRoutes已完成
            })
            
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




/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');