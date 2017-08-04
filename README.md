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