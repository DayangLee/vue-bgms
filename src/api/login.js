import axios_service from 'utils/login_axios'
import md5 from 'js-md5'

export function loginByAcount(acount, password) {
  const auth = "Basic " + btoa(acount + ":" + md5(password))
  console.log(auth)
  return axios_service({
    url: '/user',
    method: 'get',
    headers: { auth: auth }
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