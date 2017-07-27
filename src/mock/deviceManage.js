import Mock from 'mockjs'

const statusList = []
const infoList = []
const dataList = []
const count = 18

export default {
  getDeviceStatus: config => {
    for (let i = 0; i < count; i++) {
      statusList.push(Mock.mock({
        deviceName: '@ctitle(5, 10)',
        deviceId: 'KG-' + '@integer(1000000000,9999999999)',
        status: '@integer(0,1)',
        time: '@datetime("HH:mm:ss")' + ' - ' + '@datetime("HH:mm:ss")',
        filter: '@integer(20,100)' + '/' + '@integer(20,100)' + '/' + '@integer(20,200)',
        wind: '@integer(1,3)' + '档',
        gear: '@integer(1,4)' + '档',
        circle: '@integer(0,1)',
        hit: '@integer(0,1)'
      }))
    }
    return statusList
  },
  getDeviceInfo: config => {
    for (let i = 0; i < count; i++) {
      infoList.push(Mock.mock({
        deviceName: '@ctitle(5, 10)',
        deviceId: 'KG-' + '@integer(1000000000,9999999999)',
        group: '@ctitle(3, 7)',
        location: '@county(true)',
        runTime: '@integer(0,10000)' + 'h' + '@integer(0,59)' + 'min',
        contact: '@cname()',
        tel: '@integer(13000000000,18888888888)'
      }))
    }
    return infoList
  },
  getDeviceData: config => {
    for (let i = 0; i < count; i++) {
      dataList.push(Mock.mock({
        deviceName: '@ctitle(5, 10)',
        deviceId: 'KG-' + '@integer(1000000000,9999999999)',
        pm2d5: '@integer(10,500)',
        co2: '@integer(300,1000)',
        temp: '@integer(0,40)',
        wet: '@integer(20,99)',
        cho: '@float(0, 3, 3, 3)',
        tvoc: '@float(0, 3, 3, 3)',
        lastTime: '@datetime("yyyy/MM/dd HH:mm")'
      }))
    }
    return dataList
  }
}