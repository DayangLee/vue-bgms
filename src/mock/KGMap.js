import { param2Obj } from '../utils'

const KG1MapData = [
  { name: '北京', value: 25 },
  { name: '天津', value: 45 },
  { name: '上海', value: 763 },
  { name: '重庆', value: 425 },
  { name: '河北', value: 678 },
  { name: '河南', value: 58 },
  { name: '云南', value: 76 },
  { name: '辽宁', value: 69 },
  { name: '黑龙江', value: 345 },
  { name: '湖南', value: 46 },
  { name: '安徽', value: 534 },
  { name: '山东', value: 745 },
  { name: '新疆', value: 5 },
  { name: '江苏', value: 876 },
  { name: '浙江', value: 43 },
  { name: '江西', value: 65 },
  { name: '湖北', value: 765 },
  { name: '广西', value: 346 },
  { name: '甘肃', value: 643 },
  { name: '山西', value: 765 },
  { name: '内蒙古', value: 876 },
  { name: '陕西', value: 43 },
  { name: '吉林', value: 88 },
  { name: '福建', value: 43 },
  { name: '贵州', value: 65 },
  { name: '广东', value: 876 },
  { name: '青海', value: 234 },
  { name: '西藏', value: 34 },
  { name: '四川', value: 876 },
  { name: '宁夏', value: 234 },
  { name: '海南', value: 25 },
  { name: '台湾', value: 466 },
  { name: '香港', value: 44 },
  { name: '澳门', value: 55 }
]

const KG2MapData = [
  { name: '北京', value: 67 },
  { name: '天津', value: 687 },
  { name: '上海', value: 24 },
  { name: '重庆', value: 46 },
  { name: '河北', value: 87 },
  { name: '安徽', value: 555 },
  { name: '新疆', value: 444 },
  { name: '浙江', value: 333 },
  { name: '江西', value: 222 },
  { name: '山西', value: 777 },
  { name: '内蒙古', value: 545 },
  { name: '吉林', value: 542 },
  { name: '福建', value: 222 },
  { name: '广东', value: 98 },
  { name: '西藏', value: 55 },
  { name: '四川', value: 74 },
  { name: '宁夏', value: 111 },
  { name: '香港', value: 111 },
  { name: '澳门', value: 444 }
]

export default {
  getKGData: config => {
    console.log(config);
    var devType = config.url.substr(config.url.length - 1, 1)
    const type = devType
    console.log(type)
    if(type === '1'){
      return KG1MapData
    } else {
      return KG2MapData
    }
  }
}