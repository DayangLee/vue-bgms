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
      <el-table-column :render-header="renderHeader" align="center" width="550">
      </el-table-column>
      <!-- <el-table-column label="设备数据" align="center" class="table1" style="left:-100px;">
                        <el-table-column prop="time" label="定时" width="160" align="center">
                        </el-table-column>
                        <el-table-column prop="filter" label="滤网" width="110" align="center">
                        </el-table-column>
                        <el-table-column prop="wind" label="风速" width="60" align="center">
                        </el-table-column>
                        <el-table-column prop="gear" label="档位" width="60" align="center">
                        </el-table-column>
                        <el-table-column prop="circle" label="循环" width="60" align="center">
                          <template scope="scope">
                            {{scope.row.circle === 1?'内':'外'}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="hit" label="热交换" width="60" align="center">
                          <template scope="scope">
                            {{scope.row.hit === 1?'内':'外'}}
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column label="设备状态" align="center">
                        <el-table-column sortable prop="pm2d5" label="PM2.5" width="100" align="center">
                        </el-table-column>
                        <el-table-column sortable prop="co2" label="CO2" width="90" align="center">
                        </el-table-column>
                        <el-table-column sortable prop="temp" label="温度" width="90" align="center">
                        </el-table-column>
                        <el-table-column sortable prop="wet" label="湿度" width="90" align="center">
                        </el-table-column>
                        <el-table-column sortable prop="cho" label="甲醛" width="90" align="center">
                        </el-table-column>
                        <el-table-column sortable prop="tvoc" label="TVOC" width="100" align="center">
                        </el-table-column>
                        <el-table-column sortable prop="lastTime" label="最后上传时间" width="150" align="center">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column label="设备信息" align="center">
                        <el-table-column prop="group" label="群组" width="150" align="center">
                        </el-table-column>
                        <el-table-column prop="location" label="位置" width="150" align="center">
                        </el-table-column>
                        <el-table-column prop="runTime" label="运行时长" width="120" align="center">
                        </el-table-column>
                        <el-table-column prop="contact" label="联系人" width="90" align="center">
                        </el-table-column>
                        <el-table-column prop="tel" label="电话" width="130" align="center">
                        </el-table-column>
                      </el-table-column> -->
  
      <el-table-column label="更多" align="center" min-width="150">
        <template scope="scope">
          <el-button type="success" size="small">详情</el-button>
          <el-button size="small" type="primary">操作</el-button>
        </template>
      </el-table-column>
    </el-table>
  
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
                      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
                      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
                    </el-tabs> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    tableList: [{
      deviceName: '空感一代',
      deviceId: 'KG-12345678',
      status: 1
    }],
    tableActiveName: 'deviceStatus'
  }),
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    renderHeader(h) {
      return (
        <el-tabs value="deviceData">
          <el-tab-pane label="设备状态" name="deviceStatus">
            <el-table-column prop="time" label="定时" width="160" align="center">
            </el-table-column>
            <el-table-column prop="filter" label="滤网" width="110" align="center">
            </el-table-column>
          </el-tab-pane>
          <el-tab-pane label="设备数据" name="deviceData">
            <el-table-column prop="time" label="定时" width="160" align="center">
            </el-table-column>
            <el-table-column prop="filter" label="滤网" width="110" align="center">
            </el-table-column>
          </el-tab-pane>
          <el-tab-pane label="设备信息" name="deviceInfo">设备信息</el-tab-pane>
        </el-tabs>
      )
    }
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
}
</style>
