import axios_service from '../utils/fetch'

export function loginByAcount(acount, password) {
  const data = {
    acount, password
  }
  return axios_service({
    url: '/loginbyacount',
    method: 'post',
    data
  })
}

export function logout() {
  return axios_service({
    url: '/logout',
    method: 'post'
  })
}

export function getInfo(token) {
  return axios_service({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}