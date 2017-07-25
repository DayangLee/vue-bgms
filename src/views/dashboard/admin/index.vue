<template>
  <div class="dashboard-hw-container">
    <div class='title'>主页</div>
    <el-row :gutter='50'>
      <el-col :xs="24" :sm="24" :md="24" :lg="14">
        <div class="card card1">
          <!-- <IEcharts :option='map'></IEcharts> -->
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="10">
        <el-card class="card card2">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;font-size:28px;">消息</span>
          </div>
          <div>
            <el-collapse @change="handleChange">
              <el-collapse-item name="1">
                <template slot="title">
                  <el-badge is-dot class="item" v-if="notRead1" v-once>[系统消息]</el-badge>
                  <span v-else>[系统消息]</span>
                  <span style="margin-left:30px;">与现实生活一致</span>
                </template>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
              </el-collapse-item>
            </el-collapse>
            <el-collapse @change="handleChange">
              <el-collapse-item name="2">
                <template slot="title">
                  <el-badge is-dot class="item" v-if="notRead2" v-once>[系统消息]</el-badge>
                  <span v-else>[系统消息]</span>
                  <span style="margin-left:30px;">与现实生活一致</span>
                </template>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-card>
      </el-col>
    </el-row>
  
    <el-row :gutter="20" class="pictures">
      <el-col :xs="12" :sm="12" :md="6" :lg="6">
        <a href="http://www.hwlantian.com/html/detail_m1.html" target="_blank">
          <img src="../../../assets/images/dashboard/img1.jpg">
        </a>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" :lg="6">
        <a href="http://www.hwlantian.com/html/detail_m2.html" target="_blank">
          <img src="../../../assets/images/dashboard/img2.jpg">
        </a>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" :lg="6">
        <a href="http://www.hwlantian.com/html/detail_n1.html" target="_blank">
          <img src="../../../assets/images/dashboard/img3.jpg">
        </a>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" :lg="6">
        <a href="http://www.hwlantian.com/html/detail_u1.html" target="_blank">
          <img src="../../../assets/images/dashboard/img4.jpg">
        </a>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import IEcharts from 'vue-echarts-v3';
// import chinaJson from '../../../assets/json/china.json';
// IEcharts.registerMap('china', chinaJson);
export default {
  // components: {
  //   IEcharts
  // },
  data: () => ({
    notRead1: true,
    notRead2: true,
  }),
  methods: {
    say: function (message) {
      alert(message);
    },
    handleChange(val) {
      console.log(val);
      console.log(val[0]);
      switch (val[0]) {
        case '1':
          this.notRead1 = false;
          break;
        case '2':
          this.notRead2 = false;
          break;
      }
    },
    showDetail: function (e) {
      console.log(e.target.innerText);
      this.$msgbox({
        title: '详情',
        message: '用户名：' + e.target.innerText,
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action
        });
      });
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
* {
  margin: 0;
}

.dashboard-hw-container {
  padding: 30px 50px;
}

.title {
  font-size: 28px;
}

.el-row {
  margin-top: 50px;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  margin-top: 10px;
}


.card {
  width: 100%;
  height: auto;
  border: 1px solid #d1dbe5;
  border-radius: 4px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
}

.echarts {
  width: 100%;
  height: 100%;
}

.vue-echarts {
  height: 100%;
  min-height: 100%;
}


.el-badge__content.is-fixed.is-dot {
  top: 10px;
}

.pictures {
  a {
    width: 100%;
    margin-top: 5px;

    img {
      width: 100%;
      -webkit-transition: all .2s linear;
      transition: all .2s linear;
      &:hover {
        margin-top: -5px;
        -moz-box-shadow: 2px 2px 15px rgba(136, 136, 136, 0.5);
        -webkit-box-shadow: 2px 2px 15px rgba(136, 136, 136, 0.5);
        box-shadow: 2px 2px 15px rgba(136, 136, 136, 0.5);
      }
    }
  }
}

@media screen and (min-width: 1200px) {
  .card {
    width: 100%;
    height: 500px;
  }
}

@media screen and (min-width: 992px) and (max-width: 1200px) {
  .card {
    width: 100%;
    height: 500px;
  }
}

@media screen and (min-width: 768px) and (max-width: 992px) {
  .card {
    width: 100%;
    height: 500px;
  }
}

@media screen and (max-width: 768px) {
  .card {
    width: 100%;
    height: 500px;
  }
}
</style>
