import axios_service from '../utils/fetch'

export function getUserData() {
  return axios_service({
    url: '/user/manage/data',
    method: 'get'
  })
}