<template>
  <div class="data-container">

    <div class="title">
      大屏页面配置
      <el-button type="success" style="float:right;" @click="save">保存</el-button>
      <el-button type="primary" style="float:right;margin-right:40px;" @click="play">预览</el-button>
    </div>

    <el-tabs type="border-card" class="header">
      <el-tab-pane>
        <span slot="label">
          <icon-svg icon-class="tupian1"></icon-svg>
          图片
        </span>
        <div class="pic_ele">
          <div class="box1">
            <div class="preview_box">
              <img src="../../assets/images/dashboard/img4.jpg">
            </div>
            <a href="javascript:;" class="a-upload">
              <input type="file" name="" id="uploadImage">更换图片
            </a>
          </div>
          <div class="box2">
            <div class="item">
              <p class="name">圆角</p>
              <div class="item_right">
                <el-slider v-model="radius" show-input :show-input-controls="false">
                </el-slider>
              </div>
            </div>
            <div class="item">
              <p class="name">透明</p>
              <div class="item_right">
                <el-slider v-model="opacity" show-input :show-input-controls="false">
                </el-slider>
              </div>
            </div>
          </div>
          <div class="box3">
            <p>位置</p>
            <div class="item">
              <p class="name">X轴</p>
              <div class="item_right">
                <el-slider v-model="radius" show-input :show-input-controls="false">
                </el-slider>
              </div>
            </div>
            <div class="item">
              <p class="name">Y轴</p>
              <div class="item_right">
                <el-slider v-model="opacity" show-input :show-input-controls="false">
                </el-slider>
              </div>
            </div>
            <div class="item">
              <p class="name">层级</p>
              <div class="item_right">
                <el-slider v-model="opacity" show-input :show-input-controls="false">
                </el-slider>
              </div>
            </div>
          </div>
          <div class="box4">
            <p>大小</p>
            <div class="item">
              <p class="name">宽</p>
              <div class="item_right">
                <el-slider v-model="radius" show-input :show-input-controls="false">
                </el-slider>
              </div>
            </div>
            <div class="item">
              <p class="name">高</p>
              <div class="item_right">
                <el-slider v-model="opacity" show-input :show-input-controls="false">
                </el-slider>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane>
        <span slot="label">
          <icon-svg icon-class="wenben"></icon-svg>
          文本
        </span>
        <div class="text_ele">
          <div class="box1">
            <div class="item">
              <p class="name">室外名称</p>
              <div class="item_right">
                <el-input v-model="out_text" placeholder="请输入内容"></el-input>
              </div>
            </div>
            <div class="item">
              <p class="name">城市选择</p>
              <div class="item_right">
                <el-select v-model="city" filterable remote placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
                  <el-option v-for="item in cityOption" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="box2">
            <p>数据类型</p>
            <el-radio-group v-model="text_type" style="margin-top:10px;width:98%;line-height:30px;">
              <el-radio label="pm2d5">PM2.5</el-radio>
              <el-radio label="temp">温度</el-radio>
              <el-radio label="hum">湿度</el-radio>
              <el-radio label="updateTime">更新时间</el-radio>
              <el-radio label="rank">污染等级</el-radio>
            </el-radio-group>
          </div>
          <div class="box3">
            <div class="item">
              <p class="name">背景色</p>
              <div class="item_right">
                <span class="nobgColor" @click="noBgColor" style="margin-left:20px;">
                  <img src="../../assets/images/editor/forbidden.png" />
                </span>
                <colorPicker v-model="color" style="margin-top:5px;margin-left:15px;"></colorPicker>
              </div>
            </div>
            <div class="item">
              <p class="name">圆角</p>
              <div class="item_right">
                <el-slider v-model="radius" show-input :show-input-controls="false">
                </el-slider>
              </div>
            </div>
            <div class="item">
              <p class="name">透明</p>
              <div class="item_right">
                <el-slider v-model="opacity" show-input :show-input-controls="false">
                </el-slider>
              </div>
            </div>
          </div>
          <div class="box4"></div>
          <div class="box5"></div>
          <div class="box6"></div>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <icon-svg icon-class="shebei"></icon-svg>
          设备数据
        </span>
        设备数据元素
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <icon-svg icon-class="tianqi"></icon-svg>
          室外天气
        </span>
        室外天气元素
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <icon-svg icon-class="shijian"></icon-svg>
          北京时间
        </span>
        北京时间元素
      </el-tab-pane>
    </el-tabs>

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

      <div class="right">

        <div class="right_body">

        </div>
      </div>

    </div>
    <div class="clear"></div>

  </div>
</template>

<script>
import colorPicker from '../../components/vue-color-picker/colorPicker'
const cityList = ['北京', '上海', '广州', '深圳', '南京']
export default {
  components: { colorPicker },
  data: () => ({
    activeName: 'first',
    color: 'red',
    radius: 0,
    opacity: 0,
    out_text: '',
    city: '',
    hotCities: cityList,
    list: [],
    cityOption: [],
    loading: false,
    text_type: '',
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
    },
    noBgColor() {
      alert('no bg color')
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.cityOption = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.cityOption = [];
      }
    }
  },
  mounted() {
    this.list = this.hotCities.map(item => {
      return { value: item, label: item };
    })
    this.cityOption = this.hotCities.map(item => {
      return { value: item, label: item };
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
* {
  margin: 0;
  padding: 0;
}

.clear {
  clear: both;
}

.box1,
.box2,
.box3,
.box4,
.box5,
.box6 {
  float: left;
}

.data-container {
  padding: 30px 50px;
  width: 100%;
  min-width: 1400px;
  .title {
    font-size: 24px;
  }

  .header {
    width: 100%;
    margin-top: 20px;

    .el-tabs__content {
      height: 198px;
    }
  }

  .item {
    width: 100%;
    height: 50px;
    line-height: 50px;
    .name {
      font-weight: bold;
      float: left;
      width: 15%;
      height: 100%;
    }
    .item_right {
      float: left;
      width: 78%;
      height: 100%;

      .nobgColor:hover {
        cursor: pointer;
      }
      .el-input-number--small {
        width: 50px;
      }
      .el-slider__runway.show-input {
        line-height: 50px;
        width: 70%;
        margin-left: 0px;
        margin-top: 25px;
      }
      .el-slider__button-wrapper {
        top: -24px;
      }
    }
  }

  .pic_ele {
    .box1 {
      width: 20%;
      padding-right: 2%;
      border-right: 1px solid #d1dbe5;
      .preview_box {
        width: 100%;
        img {
          width: 100%;
          height: 120px;
        }
      }
      .a-upload {
        padding: 1px 10px;
        height: 30px;
        width: 100%;
        background: white;
        line-height: 30px;
        position: relative;
        cursor: pointer;
        color: rgba(0, 0, 0, .7);
        border-radius: 4px;
        overflow: hidden;
        display: inline-block;
        *display: inline;
        *zoom: 1;
        text-align: center;
        margin-top: 10px;
        text-align: center;
        font-size: 18px;
        border: 1px solid #ddd;
      }

      .a-upload input {
        position: absolute;
        height: 30px;
        line-height: 30px;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
        cursor: pointer
      }

      .a-upload:hover {
        color: #444;
        background: #eee;
        border-color: #ccc;
        text-decoration: none;
        cursor: pointer;
      }
    }
    .box2,
    .box3,
    .box4 {
      width: 25%;
      height: 168px;
      margin-left: 1%;
      padding-left: 20px;
      padding-right: 10px;
      border-right: 1px solid #d1dbe5;
      font-weight: bold;
    }
    .box4 {
      border: none;
    }
  }

  .text_ele {
    .box1 {
      width: 15%;
      height: 168px;
      border-right: 1px solid #d1dbe5;
      font-weight: bold;
      .name {
        font-weight: bold;
        width: 40%;
      }
      .item_right {
        width: 56%;
      }
    }
    .box2 {
      width: 15%;
      height: 168px;
      padding-left: 20px;
      border-right: 1px solid #d1dbe5;
      font-weight: bold;
      .el-radio {
        margin-left: 0;
        margin-right: 8px;
      }
    }
    .box3 {
      width: 20%;
      height: 168px;
      padding-left: 15px;
      border-right: 1px solid #d1dbe5;
      font-weight: bold;
      .name {
        width: 25%;
      }
      .item_right {
        width: 70%;
        .el-slider__runway.show-input {
          width: 60%;
        }
      }
    }
  }




  .body {
    margin-top: 30px;
    width: 100%;
  }
  .left {
    width: 300px;
    float: left;
    .el-button {
      width: 250px;
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
      width: 80%;
      height: 0px;
      overflow: hidden;
      margin-left: 20%; // margin-top: 20px;
      padding-bottom: 48%;
    }
  } // .right {
  //   width: 240px;
  //   height: 200px;
  //   float: right;
  //   background-color: blue;
  // }
}
</style>

