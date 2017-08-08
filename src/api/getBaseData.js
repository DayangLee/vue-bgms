import axios_service from 'utils/axios'

export function getBaseData() {
  return axios_service({
    url: '/device/adapters',
    method: 'get'
  })
}

