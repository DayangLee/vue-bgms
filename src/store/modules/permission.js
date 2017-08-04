import { constantRouterMap } from '../../router'

function hasPermission(roles, route) {
    if (route.meta && route.meta.role) {
        if (route.meta.role.indexOf(roles) !== -1) {
            return true
        } else {
            return false
        }
    } else {
        return true
    }
}

function filterAsyncRouter(routerMap, roles) {
    const accessedRouters = routerMap.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles)
            }
            return true
        }
        return false
    })
   // console.log(accessedRouters)
    return accessedRouters
}

const permission = {
    state: {
        routers: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.routers = routers
        }
    },
    actions: {
        GenerateRoutes({ commit }, data) {
            return new Promise(resolve => {
                const { roles } = data
                let accessedRouters
                if (roles.indexOf('admin') >= 0 || roles.indexOf('agent') >= 0) {
                    accessedRouters = constantRouterMap
                } else {
                    accessedRouters = filterAsyncRouter(constantRouterMap, roles)
                }
                commit('SET_ROUTERS', accessedRouters)
                resolve()
            })
        }
    }
}

export default permission