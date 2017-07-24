import { loginByAcount, logout, getInfo } from '../../api/login'
import Cookies from 'js-cookie'

const user = {
  state: {
    user: '',
    status: '',
    acount: '',
    auth_type: '',
    token: Cookies.get('token'),
    uid: undefined,
    roles: '',
    name: '',
    avater: ''
  },
  mutations: {
    SET_AUTH_TYPE: (state, type) => {
      state.auth_type = type;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_ACOUNT: (state, acount) => {
      state.acount = acount;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_UID: (state, uid) => {
      state.uid = uid;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    LOGIN_SUCCESS: () => {
      console.log('login success')
    },
    LOGOUT_USER: state => {
      state.user = '';
    }
  },
  actions: {
    LoginByAcount({ commit }, userInfo) {
      const acount = userInfo.acount.trim();
      const password = userInfo.password;
      return new Promise((resolve, reject) => {
        loginByAcount(acount, password).then(response => {
          const data = response.data;
          console.log(response)
          Cookies.set('Token', data.token);
          commit('SET_TOKEN', data.token);
          commit('SET_ACOUNT', acount);
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data;
          commit('SET_ROLES', data.role);
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          commit('SET_UID', data.uid);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', '');
          Cookies.remove('Token');
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
}

export default user;