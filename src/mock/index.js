import Mock from 'mockjs'
import loginAPI from './login'

// 登录登出相关
Mock.mock(/\/loginbyacount/, 'post', loginAPI.loginByAcount)
Mock.mock(/\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getInfo)

export default Mock