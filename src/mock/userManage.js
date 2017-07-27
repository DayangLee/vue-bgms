import Mock from 'mockjs'

const dataList = []
const count = 18

export default {
  getUserData: config => {
    for (let i = 0; i < count; i++) {
      dataList.push(Mock.mock({
        group: '@ctitle(3, 7)',
        userName: '@cname()',
        companyName: '@ctitle(5, 10)',
        tel: '@integer(13000000000,18888888888)',
        deviceCount: '@integer(10,1000)',
        lastTime: '@datetime("yyyy/MM/dd HH:mm")',
        note: '测试'
      }))
    }
    return dataList
  }
}