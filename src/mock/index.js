import Mock from 'mockjs'
import loginAPI from './login'
import KGMapDataAPI from './KGMap'
import deviceDataListAPI from './deviceDataList'

// 登录登出相关
Mock.mock(/\/loginbyacount/, 'post', loginAPI.loginByAcount)
Mock.mock(/\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getInfo)

// dashboard KG 分布数据相关
Mock.mock(/\/data\/KG/, 'get', KGMapDataAPI.getKGData)

// 设备数据 KG一代、KG二代、新风数据列表相关
Mock.mock(/\/data\/list/, 'get', deviceDataListAPI.getDeviceDataList)

export default Mock