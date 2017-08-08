import axios from 'axios'
import store from '../store'
import { Message } from 'element-ui'

// 创建 axios 实例
const service = axios.create({
  baseURL: 'http://app.hw99lt.com', // api 的 base_url
  withCredentials: true,
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    console.log(config)
    return config
  },
  error => {
    console.log('err' + error);// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
)

// respone拦截器
service.interceptors.response.use(
  response => response,
  error => {
    console.log('err' + error);// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
)

export default service