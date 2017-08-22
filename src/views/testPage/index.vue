<template>
  <div class="data-container" style="width: 100%">
    <el-table ref="multipleTable" :data="tableList" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" stripe id="table">
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column type="index" width="60" align="center">
      </el-table-column>
      <el-table-column prop="deviceName" label="设备名称" width="170" align="center">
      </el-table-column>
      <el-table-column prop="deviceId" label="设备ID" width="150" align="center">
      </el-table-column>
      <el-table-column prop="status" label="运行状态" width="100" align="center">
        <template scope="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">{{scope.row.status===1?'运行中':'关闭'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :render-header="renderHeader" align="center">
        <el-table-column v-for="col in table" :prop="col.prop" :label="col.label" width="130" align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="更多" align="center" min-width="110">
        <template scope="scope">
          <el-button type="text" size="small" style="color:#13ce66;" @click="handleDetail(scope.$index, scope.row.deviceId)">详情</el-button>
          <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row.deviceId)">操作</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    tableList: [{
      deviceName: '空感一代',
      deviceId: 'KG-12345678',
      status: 1,
      pm2d5: 233,
      co2: 233,
      temp: 23,
      hum: 33,
      cho: 233,
      tvoc: 233,
      uploadtime: 233,
      timing: '06:00 - 15:00',
      filter: '128/60/52',
      wind: '3档',
      gear: '手动',
      circle: '内',
      hot: '开',
      group: '汉王科技大厦',
      address: '北京市昌平区沙河镇',
      runtime: '12h+30min',
      contact: '李大洋',
      tel: '13521347060'
    }, {
      deviceName: '空感一代',
      deviceId: 'KG-12345678',
      status: 0,
      pm2d5: 233,
      co2: 233,
      temp: 23,
      hum: 33,
      cho: 233,
      tvoc: 233,
      uploadtime: 233,
      timing: '06:00 - 15:00',
      filter: '128/60/52',
      wind: '3档',
      gear: '自动',
      circle: '内',
      hot: '开',
      group: '汉王科技大厦',
      address: '北京市昌平区沙河镇',
      runtime: '12h+30min',
      contact: '李大洋',
      tel: '13521347060'
    }],
    table: [
      { prop: 'pm2d5', label: 'PM2.5' },
      { prop: 'co2', label: 'CO2' },
      { prop: 'temp', label: '温度' },
      { prop: 'hum', label: '湿度' },
      { prop: 'cho', label: '甲醛' },
      { prop: 'tvoc', label: 'TVOC' }
    ]
  }),
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleHeader1() {
      this.table = [
        { prop: 'pm2d5', label: 'PM2.5' },
        { prop: 'co2', label: 'CO2' },
        { prop: 'temp', label: '温度' },
        { prop: 'hum', label: '湿度' },
        { prop: 'cho', label: '甲醛' },
        { prop: 'tvoc', label: 'TVOC' }
      ]
      document.getElementById('button1').style.color = '#20a0ff'
      document.getElementById('button2').style.color = 'black'
      document.getElementById('button3').style.color = 'black'
    },
    handleHeader2() {
      this.table = [
        { prop: 'timing', label: '定时' },
        { prop: 'filter', label: '滤网' },
        { prop: 'wind', label: '风速' },
        { prop: 'gear', label: '档位' },
        { prop: 'circle', label: '循环' },
        { prop: 'hot', label: '热交换' }
      ]
      document.getElementById('button2').style.color = '#20a0ff'
      document.getElementById('button1').style.color = 'black'
      document.getElementById('button3').style.color = 'black'
    },
    handleHeader3() {
      this.table.splice(0, this.table.length)
      this.table = [
        { prop: 'group', label: '群组' },
        { prop: 'address', label: '位置' },
        { prop: 'runtime', label: '运行时长' },
        { prop: 'contact', label: '联系人' },
        { prop: 'tel', label: '电话' },
        { prop: 'uploadtime', label: '最后上传时间' }
      ]
      document.getElementById('button3').style.color = '#20a0ff'
      document.getElementById('button1').style.color = 'black'
      document.getElementById('button2').style.color = 'black'
    },
    renderHeader(createElement, { _self }) {
      return createElement(
        'div',
        {
          'class': 'renderTableHead'
        },
        [
          createElement('el-button', {
            attrs: { type: 'text', id: 'button1' },
            on: { click: this.handleHeader1 }
          }, ['设备数据']
          ),
          createElement('el-button', {
            attrs: { type: 'text', id: 'button2' },
            on: { click: this.handleHeader2 }
          }, ['设备状态']
          ),
          createElement('el-button', {
            attrs: { type: 'text', id: 'button3' },
            on: { click: this.handleHeader3 }
          }, ['设备信息']
          )
        ]
      );
    },
    // renderHeader(h) {
    //   return (
    //     <div>
    //       <el-button type="text" onClick={this.handleHeader1}>设备状态</el-button>
    //       <el-button type="text" onClick={this.handleHeader2}>设备数据</el-button>
    //       <el-button type="text" onClick={this.handleHeader3}>设备信息</el-button>
    //     </div>
    //   )
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.data-container {
  padding: 30px 50px;
  width: 100%;
  .el-tabs__nav {
    width: 100%;
    .el-tabs__item {
      width: 33%;
    }
  }
  .renderTableHead {
    .el-button {
      font-weight: bold;
    }
    .el-button--text {
      color: black;
      &:hover {
        color: #20a0ff;
      }
      &:focus {
        color: #20a0ff;
      }
      &:active {
        color: #20a0ff;
      }
    }

    #button1 {
      color: #20a0ff;
      float: left;
      width: 30%;
    }
    #button2 {
      float: left;
      width: 30%;
    }
    #button3 {
      float: left;
      width: 30%;
    }
  }
}
</style>
