# vue-bgms

> 基于 Vue 和 Element-ui 的后台管理系统

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:822
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## note
``` bash
#  dialog内点击某一元素展开第二个dialog，这两个dialog应平级，不要嵌套

#  Vue方法中setTimeout改变变量的值无效，需要把data里的变量继承过来重新封装一下
let that = this;
this.rightAnswer = false;
setTimeout(function() {
  that.rightAnswer = true;
}, 1500)
```

## 个人中心逻辑
#### 1. 邮箱：
| 操作 | phoneVerified | phone | emailVerified | email | 验证码发送至 |
| --------   | :-----:  | :----:  |  :---:  | :---:  | :---: |
| 添加(手机已验证)| &radic; |     | 	&times;  | &times;  |  phone|
| 添加(手机未验证) | &times; |   |&times;  | &times; |email(新输入的)|
| 验证  |    | |&times;  | &radic;  |  email|
| 修改(邮箱必验证，手机已验证)|&radic;||&radic;|&radic;|phone或email(用户选择)|
| 修改(邮箱必验证，手机未验证)|&times;||&radic;|&radic;|email|

##### 流程图：
```flow
  st=>start: Start
  e=>end: End
  c1=>condition: A
  c2=>condition: B
  c3=>condition: C
  io=>inputoutput: D

  st->c1(no)->e
  c2(no)->e
  c3(no)->e
  c1(yes,right)->c2(yes,right)->c3(yes,right)->io
  io->e
```

#### 2. 手机：
| 操作 | phoneVerified | phone | emailVerified | email | 验证码发送至 |
| --------   | :-----:  | :----:  |  :---:  | :---:  | :---: |
| 添加(邮箱已验证)| &times; |  &times; | 	&radic;  |  |  email|
| 添加(邮箱未验证) | &times; | &times;  |&times;  | |phone(新输入的)|
| 验证  |&times;  | &radic;  |  |  | phone |
| 修改(手机必验证，邮箱已验证)|&radic;|&radic;|&radic;||phone或email(用户选择)|
| 修改(手机必验证，邮箱未验证)|&radic;|&radic;|&times;||phone|

* 更新信息
  * 获取验证码
  * 更新用户信息: PUT /user，在request header里添加Authorization
* check验证码
  * 只能check验证过的邮箱或手机