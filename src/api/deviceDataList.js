import axios_service from '../utils/fetch'

export function getDeviceDataList(type) {
  return axios_service({
    url: '/data/list',
    method: 'get',
    params: { type }
  })
}