import axios_service from '../utils/fetch'

export function getKGMapData(type) {
  return axios_service({
    url: '/data/KG',
    method: 'get',
    params: { type }
  })
}
