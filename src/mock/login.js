import { param2Obj } from '../utils'

const userMap = {
  admin: {
    role: 'admin',
    token: 'admin',
    avater: 'src/assets/images/avater/1.jpg',
    name: '汉王管理员',
    uid: '001'
  },
  agent: {
    role: 'agent',
    token: 'agent',
    avater: 'src/assets/images/avater/2.jpg',
    name: '代理商',
    uid: '002'
  },
  user: {
    role: 'user',
    token: 'user',
    avater: 'src/assets/images/avater/3.jpg',
    name: '用户',
    uid: '003'
  }
}

export default {
  loginByAcount: config => {
    const { acount } = JSON.parse(config.body);
    return userMap[acount.split('@')[0]];
  },
  getInfo: config => {
    const { token } = param2Obj(config.url);
    if (userMap[token]) {
      return userMap[token];
    } else {
      return Promise.reject('a');
    }
  },
  logout: () => 'success'
};