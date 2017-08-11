import axios_service from 'utils/login_axios'
import md5 from 'js-md5'

export function loginByAcount(acount, password) {
  const auth = "Basic " + btoa(acount + ":" + md5(password))
  window.sessionStorage.setItem('auth', auth)
  return axios_service({
    url: '/user',
    method: 'get',
    headers: { Authorization: auth }
  })
}

export function logout() {
  return axios_service({
    url: '/user/logout',
    method: 'post'
  })
}
