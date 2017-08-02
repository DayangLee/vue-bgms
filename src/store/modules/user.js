import { loginByAcount, logout, getInfo } from 'api/login'
import { getToken, setToken, removeToken } from 'utils/auth'

const user = {
  state: {
    acount: '',
    token: getToken(),
    roles: [],
    name: '',
    avatar: ''
  },
  mutations: {
    SET_ACOUNT: (state, acount) => {
      state.acount = acount
    },
    SET_TOKEN: (state, token) => {
      state.token = token
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
      console.log(acount)
      const password = userInfo.password
      return new Promise((resolve, reject) => {
        loginByAcount(acount, password).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          commit('SET_ACOUNT', acount)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          commit('SET_ROLES', data.role)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        });
      });
    },
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        });
      });
    },
    FedLogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user;