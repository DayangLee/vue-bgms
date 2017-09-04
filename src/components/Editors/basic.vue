<template>
  <div class="container">
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
</template>

<script>
import colorPicker from '../vue-color-picker/colorPicker'
export default {
  name: 'basicEditor',
  components: { colorPicker },
  data: () => ({
    color: '#324157',
    radius: 0,
    opacity: 0
  }),
  methods: {
    noBgColor() {
      alert('no bg color')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
* {
  margin: 0;
  padding: 0;
}

.container {
  width: 300px;
}

.clear {
  clear: both;
}


.item {
  width: 100%;
  height: 50px;
  line-height: 50px;
  .name {
    font-weight: bold;
    float: left;
    width: 20%;
    height: 100%;
    background-color: green;
  }
  .item_right {
    float: left;
    width: 78%;
    height: 100%;
    display: block;
    background-color: pink;

    .nobgColor:hover {
      cursor: pointer;
    }
    .el-input-number__decrease,
    .el-input-number__increase {
      top: 10px;
    }
    .el-input-number--small {
      width: 50px;
    }
    .el-slider__runway.show-input {
      line-height: 50px;
      width: 160px;
      margin-left: 10px;
      margin-top: 25px;
    }
    .el-slider__button-wrapper {
      top: -24px;
    }
  }
}

// .item:after {
//   clear: both;
//   content: '.';
//   display: block;
//   width: 0;
//   height: 0;
//   visibility: hidden;
// }
</style>
