  <template>
  <div>
    <el-table :data="tableList" style="width: 100%">
      <el-table-column prop="deviceName" label="名称" width="180">
      </el-table-column>
      <el-table-column v-for="col in formThead" :prop="col.prop" :label="col.label">
      </el-table-column>
      <el-table-column label="更多" align="center" min-width="150">
        <template scope="scope">
          <el-button type="success" size="small">详情</el-button>
          <el-button size="small" type="primary">操作</el-button>
        </template>
      </el-table-column>
    </el-table>
  
    <div @click='add'>
      点我
    </div>
    <div @click='cut'>
      再点我
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    tableList: [{
      deviceName: '空感一代',
      deviceId: 'KG-12345678',
      status: 1,
      time1: '1111',
      filter1: '1111',
      time2: '2222',
      filter2: '2222',
      time3: '3333',
      filter3: '3333',
      pm2d51: '2333',
      pm2d52: '2333',
      pm2d53: '2333'
    }],
    formThead: [{ prop: 'time1', label: '时间1' },
    { prop: 'filter1', label: '滤网1' }],
    dialogVisible: false,
    checkList: ['apple', 'banana'],
  }),
  methods: {
    add() {
      this.formThead = [{ prop: 'time2', label: '时间2' },
      { prop: 'filter2', label: '滤网2' },
      { prop: 'pm2d52', label: 'PM2.52' }]
    },
    cut() {
      this.formThead = [
        { prop: 'time1', label: '时间1' },
        { prop: 'filter1', label: '滤网1' }
      ]
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleHeader1() {
      this.table.splice(0, this.table.length)
      this.table = [
        { prop: 'time1', label: '时间1' },
        { prop: 'filter1', label: '滤网1' }
      ]
    },
    handleHeader2() {
      this.table.splice(0, this.table.length)
      this.table = [
        { prop: 'time2', label: '时间2' },
        { prop: 'filter2', label: '滤网2' },
        { prop: 'pm2d52', label: 'PM2.52' }
      ]
    },
    handleHeader3() {
      this.table.splice(0, this.table.length)
      this.table = [
        { prop: 'time3', label: '时间3' },
        { prop: 'filter3', label: '滤网3' },
        { prop: 'pm2d53', label: 'PM2.53' }
      ]
    },
    renderHeader(createElement, { _self }) {
      return createElement(
        'div',
        {
          'class': 'renderTableHead'
        },
        [
          createElement('el-button', {
            attrs: { type: 'text' },
            on: { click: this.handleHeader1 }
          }, ['设备状态']
          ),
          createElement('el-button', {
            attrs: { type: 'text' },
            on: { click: this.handleHeader2 }
          }, ['设备数据']
          ),
          createElement('el-button', {
            attrs: { type: 'text' },
            on: { click: this.handleHeader3 }
          }, ['设备信息']
          )
        ]
      );
    },
    // renderHeader(h) {
    //   return (
    //     <div>
    //       <el-button type="text" on-click="this.tab=1">设备状态</el-button>
    //       <el-button type="text" on-click="this.tab=2">设备数据</el-button>
    //       <el-button type="text" on-click="this.tab=1">设备信息</el-button>
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
  }
}
</style>
