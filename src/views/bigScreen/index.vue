<template>
  <div class="data-container">

    <div class="title">
      大屏页面配置
      <el-button type="primary" style="float:right;" @click="save">保存</el-button>
      <el-button type="primary" style="float:right;margin-right:40px;" @click="play">预览</el-button>
    </div>
    <div class="body">
      <div class="left">
        <el-tabs v-model="activeName" type="border-card" @tab-remove="removeTab" style="height:600px;">
          <el-tab-pane label="页面模板" name="first">
            <el-button @click="addTab('modela')">modela</el-button>
            <el-button @click="addTab('modelb')">modelb</el-button>
            <el-button @click="addTab('modelc')">modelc</el-button>
            <el-button @click="addTab('modeld')">modeld</el-button>
            <el-button @click="addTab('hotel')">hotel</el-button>
            <el-button @click="addTab('工厂')">工厂</el-button>
            <el-button @click="addTab('学校')">学校</el-button>
          </el-tab-pane>
          <el-tab-pane v-if="model.name" :label="model.name" :name="model.name" closable>
            {{model.content}}
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- <div class="right">

            </div> -->
      <div class="right">
        <!-- <div class="right_header">
              <span style="font-size:18px;">
                <icon-svg icon-class="cloud-element" class="icon1"></icon-svg>
                添加元素
              </span>

              <el-button style="margin-left:10px;" @click="addElement('pic')">
                <icon-svg icon-class="tupian1"></icon-svg>&nbsp;图片</el-button>
              <el-button style="margin-left:10px;" @click="addElement('text')">
                <icon-svg icon-class="wenben"></icon-svg>&nbsp;文本</el-button>
              <el-button style="margin-left:10px;" @click="addElement('outside')">
                <icon-svg icon-class="tianqi"></icon-svg>&nbsp;室外天气</el-button>
              <el-button style="margin-left:10px;" @click="addElement('device')">
                <icon-svg icon-class="shebei"></icon-svg>&nbsp;设备数据</el-button>
              <el-button style="margin-left:10px;" @click="addElement('time')">
                <icon-svg icon-class="shijian"></icon-svg>&nbsp;时间</el-button>
            </div> -->
        <div class="right_body">

        </div>
      </div>

    </div>
    <div class="clear"></div>

  </div>
</template>

<script>
export default {
  data: () => ({
    activeName: 'first',
    model: {
      name: null,
      content: null
    }
  }),
  methods: {
    addTab(targetName) {
      this.model.name = targetName
      this.model.content = targetName
      this.activeName = targetName;
    },
    removeTab(targetName) {
      this.activeName = 'first'
      this.model = {
        name: null,
        content: null
      }
    },
    addElement(val) {
      alert(val)
    },
    save() {
      alert('save')
    },
    play() {
      alert('play')
      window.open('http://www.baidu.com')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.clear {
  clear: both;
}

.data-container {
  padding: 30px 50px;
  width: 100%;
  min-width: 1400px;
  .title {
    font-size: 24px;
  }
  .body {
    margin-top: 30px;
    width: 100%;
  }
  .left {
    width: 200px;
    float: left;
    .el-button {
      width: 150px;
      margin: 10px 10px;
    }
  }
  .right {
    margin-left: 200px;
    .right_header {
      padding-left: 20px;
    }
    .right_body {
      background-color: rgb(204, 204, 204);
      width: 96%;
      height: 0px;
      overflow: hidden;
      margin-left: 4%; // margin-top: 20px;
      padding-bottom: 54%;
    }
  } // .right {
  //   width: 240px;
  //   height: 200px;
  //   float: right;
  //   background-color: blue;
  // }
}
</style>

