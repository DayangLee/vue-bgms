import Mock from 'mockjs'

const KGList = []
const newWindList = []
const count = 8

for (let i = 0; i < count; i++) {
  KGList.push(Mock.mock({
    deviceName: '@ctitle(5, 10)',
    deviceId: 'KG-' + '@integer(1000000000,9999999999)',
    status: '@integer(0,1)',
    group: '@ctitle(3, 10)',
    location: '@county(true)',
    user: '@ctitle(3, 10)'
  }));
  newWindList.push(Mock.mock({
    deviceName: '@ctitle(5, 10)',
    deviceId: 'KG-' + '@integer(1000000000,9999999999)',
    status: '@integer(0,1)',
    group: '@ctitle(3, 10)',
    location: '@county(true)',
    user: '@ctitle(3, 10)'
  }));
}

export default {
  getDeviceDataList: config => {
    //console.log(config)
    var devType = config.url.substr(config.url.length - 1, 1)
    const type = devType
    //console.log(type)
    if (type === '1' || type === '2') {
      return KGList
    } else {
      return newWindList
    }
  }
}