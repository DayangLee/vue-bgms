import axios_service from '../utils/fetch'

export function getDeviceStatus() {
  return axios_service({
    url: '/device/manage/status',
    method: 'get'
  })
}
export function getDeviceInfo() {
  return axios_service({
    url: '/device/manage/info',
    method: 'get'
  })
}
export function getDeviceData() {
  return axios_service({
    url: '/device/manage/data',
    method: 'get'
  })
}