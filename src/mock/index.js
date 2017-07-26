import Mock from 'mockjs'
import loginAPI from './login'
import KGMapDataAPI from './KGMap'

// 登录登出相关
Mock.mock(/\/loginbyacount/, 'post', loginAPI.loginByAcount)
Mock.mock(/\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getInfo)

// KG 分布数据相关
Mock.mock(/\/data\/KG/,'get',KGMapDataAPI.getKGData)

export default Mock