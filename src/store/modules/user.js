import { loginByAcount, logout } from 'api/acount'
import { getCookie, setCookie, removeCookie } from 'utils/auth'

const user = {
  state: {
    acount: '',
    userToken: getCookie('userToken'),
    roles: [],
    name: '',
    avatar: ''
  },
  mutations: {
    SET_ACOUNT: (state, acount) => {
      state.acount = acount
    },
    SET_TOKEN: (state, token) => {
      state.userToken = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    LOGIN_SUCCESS: () => {
      console.log('login success')
    }
  },
  actions: {
    LoginByAcount({ commit }, userInfo) {
      const acount = userInfo.acount.trim()
      const password = userInfo.password
      return new Promise((resolve, reject) => {
        loginByAcount(acount, password).then(response => {
          console.log(response)
          const data = response.data
          window.sessionStorage.setItem('userInfo',JSON.stringify(data))
          if(data.roles.length !== 0 && data.roles[0] == 'ROLE_USER'){
            setCookie('userToken','user')
            commit('SET_TOKEN', 'user')
            commit('SET_ACOUNT', acount)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        const role = getCookie('userToken')
        console.log(role)
        commit('SET_ROLES', role)
        resolve(role)
      });
    },
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', '')
          removeCookie('userToken')
          window.sessionStorage.clear()
          resolve()
        }).catch(error => {
          reject(error)
        });
      });
    },
    FedLogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        removeCookie('userToken')
        resolve()
      })
    }
  }
}

export default user;