import axios_service from 'utils/axios'

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
  const auth = 'Token ' + token.trim()
  return axios_service({
    url: '/user',
    method: 'put',
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
export function getPhoneVerifyCode(type, num, user) {
  return axios_service({
    url: '/user/verify/fetch/' + type + '/' + num,
    method: 'post',
    data: user
  })
}
export function getEmailVerifyCode(type, num, user) {
  return axios_service({
    url: '/user/verify/fetch/' + type + '/' + num,
    method: 'post',
    data: user
  })
}

export function checkVerifyCode(type,num,code){
  const auth = 'Token ' + code.trim()
  return axios_service({
    url: '/user/verify/check/' + type + '/' + num,
    method:'post',
    headers: { Authorization: auth }
  })
}

export function uniqueCheck(type,num){
  return axios_service({
    url: '/user/' + type + '/' + num,
    method: 'head'
  })
}

export function postAvatar(data){
  return axios_service({
    url: '/user/upload/avatar',
    method: 'post',
    data: data
  })
}

export function getBaseData() {
  return axios_service({
    url: '/device/adapters',
    method: 'get'
  })
}