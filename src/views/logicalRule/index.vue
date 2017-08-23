<template>
  <div class="data-container">

    <div class="title">
      联动规则
    </div>
    <el-button type="primary" id="addrule">新建规则</el-button>

    <el-card class="box-card" v-for="item in liandong">
      <h3>名称：{{item.name}}</h3>
      <div class="card-body">
        <div class="block">
          <h4>设备</h4>
          <el-card class="small-card" :body-style="{padding: '0px'}">
            <div v-for="deviceItem in item.device">{{deviceItem}}</div>
            <div>
              <el-button type="text" @click="addDevice">
                <icon-svg icon-class="tianjia" class="icon"></icon-svg>
              </el-button>
            </div>
          </el-card>
        </div>
        <div class="icon-block">
          <icon-svg icon-class="changjiantou" class="icon1"></icon-svg>
        </div>
        <div class="block">
          <h4>规则</h4>
          <el-card class="small-card" :body-style="{padding: '0px'}">
            <div v-for="ruleItem in item.rules">{{ruleItem}}</div>
            <div>
              <el-button type="text" @click="addRules">
                <icon-svg icon-class="tianjia" class="icon"></icon-svg>
              </el-button>
            </div>
          </el-card>
        </div>
        <div class="icon-block">
          <icon-svg icon-class="changjiantou" class="icon1"></icon-svg>
        </div>
        <div class="block">
          <h4>控制板</h4>
          <el-card class="small-card" :body-style="{padding: '0px'}">
            <div v-for="panelItem in item.panel">{{panelItem}}</div>
            <div>
              <el-button type="text" @click="addPanel">
                <icon-svg icon-class="tianjia" class="icon"></icon-svg>
              </el-button>
            </div>
          </el-card>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    liandong: [{
      name: '汉王大厦',
      device: [
        'KG-12345678',
        'KG-12345679',
        'KG-12345670'
      ],
      panel: [
        'KZB-001',
        'KZB-002',
        'KZB-003',
        'KZB-004'
      ],
      rules: [
        'PM2.5 >= 75 时开机',
        'PM2.5 <= 15 时关机'
      ]
    }, {
      name: '汉王蓝天',
      device: [
        'KG-12345678',
        'KG-12345679',
        'KG-12345670'
      ],
      panel: [
        'KZB-001',
        'KZB-002',
        'KZB-003',
        'KZB-004'
      ],
      rules: [
        'PM2.5 >= 75 时开机',
        'PM2.5 <= 15 时关机'
      ]
    }]
  }),
  methods: {
    addDevice() {
      alert('添加设备')
    },
    addRules() {
      alert('添加规则')
    },
    addPanel() {
      alert('添加控制板')
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
  .title {
    font-size: 24px;
  }
  #addrule {
    margin-top: 20px;
  }
  .box-card {
    width: 100%;
    margin-top: 40px;
    margin-bottom: 20px;
    h3 {
      margin-top: 0px;
    }
    .card-body {
      width: 90%;
      margin: auto;
      .block {
        float: left;
        width: 25%;
        margin-bottom: 40px;
        text-align: center;
        .small-card {
          margin-top: 20px;
          div {
            height: 40px;
            line-height: 40px;
            border-top: 1px solid #d1dbe5;
            &:first-child {
              border-top: none;
            }
            .el-button {
              padding: 0;
              .icon {
                width: 40px;
                height: 40px;
              }
            }
          }
        }
      }
      .icon-block {
        float: left;
        width: 12%;
        text-align: center;
        .icon1 {
          width: 60%;
          height: 50px;
          margin-top: 100px;
        }
      }
    }
  }
}
</style>

