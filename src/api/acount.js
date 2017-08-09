import axios_service from 'utils/axios'
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

export function userInfo() {
  return axios_service({
    url: '/user',
    method: 'get'
  })
}

export function getSession() {
  return axios_service({
    url: '/user/sessionId',
    method: 'get'
  })
}

export function changeNickname(user) {
  return axios_service({
    url: '/user',
    method: 'put',
    data: user
  })
}

export function changeUserInfo(user,token) {
  const auth = 'Token ' + token
  return axios_service({
    url: '/user',
    method: 'post',
    data: user,
    headers: { Authorization: auth }
  })
}

export function getVerifyCode(type, num) {
  return axios_service({
    url: '/user/verify/fetch/' + type + '/' + num,
    method: 'post'
  })
}

export function checkVerifyCode(type,num,code){
  const auth = 'Token ' + code
  return axios_service({
    url: '/user/verify/check/' + type + '/' + num,
    method:'post',
    headers: { Authorization: auth }
  })
}

export function uniqueCheck(type,num){
  return axios_service({
    url:'/user/' + type + '/' + num,
    method:'head'
  })
}

export function getBaseData() {
  return axios_service({
    url: '/device/adapters',
    method: 'get'
  })
}