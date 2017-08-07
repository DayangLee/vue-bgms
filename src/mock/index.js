import Mock from 'mockjs'
import KGMapDataAPI from './KGMap'
import deviceDataListAPI from './deviceDataList'
import deviceManageAPI from './deviceManage'
import userManageAPI from './userManage'


// dashboard ---- KG 分布数据相关
Mock.mock(/\/data\/KG/, 'get', KGMapDataAPI.getKGData)

// 设备数据 ---- KG一代、KG二代、新风数据列表相关
Mock.mock(/\/data\/list/, 'get', deviceDataListAPI.getDeviceDataList)

// 设备管理 ---- 设备状态、设备信息、设备数据列表相关
Mock.mock(/\/device\/manage\/status/, 'get', deviceManageAPI.getDeviceStatus)
Mock.mock(/\/device\/manage\/info/, 'get', deviceManageAPI.getDeviceInfo)
Mock.mock(/\/device\/manage\/data/, 'get', deviceManageAPI.getDeviceData)

// 用户管理 ---- 列表相关
Mock.mock(/\/user\/manage\/data/, 'get', userManageAPI.getUserData)

export default Mock