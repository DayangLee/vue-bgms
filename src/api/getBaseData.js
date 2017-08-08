import axios_service from 'utils/axios'

export function getBaseData() {
  const auth = window.sessionStorage.getItem('auth')
  return axios_service({
    url: '/adapters',
    method: 'get',
    headers: { Authorization: auth }
  })
}

