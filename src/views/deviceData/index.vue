<template>
  <div class="data-container">
    <div class="title">
      设备 / 设备总览
    </div>

    <el-tabs v-model="deviceInfoTabs" type="border-card" @tab-click="handleClick">

      <el-tab-pane label="空感一代" name="1">
        <div class="box box1">
          <el-card>
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;font-size:26px;">设备在线情况</span>
            </div>
            <div style="width:100%;">
              <div class="echarts1">
                <circleChart :circleOption="circleOption1"></circleChart>
              </div>
              <div class="text">共{{allKG1Count}}台设备</div>
            </div>
          </el-card>
        </div>
        <div class="box box2">
          <el-card>
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;font-size:26px;">污染分布</span>
            </div>
            <div class="echarts2">
              <ringChart :ringOption="ringOption1"></ringChart>
            </div>
          </el-card>
        </div>
        <div class="box box3">
          <el-card>
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;font-size:26px;">污染极值</span>
            </div>
            <div>
              <table>
                <tr>
                  <td>PM2.5</td>
                  <td style="color:rgb(93, 190, 255);">{{dataRange.pm2d5.min}}ug/m³</td>
                  <td style="color:rgb(232, 140, 140);">{{dataRange.pm2d5.max}}ug/m³</td>
                </tr>
                <tr>
                  <td>CO2</td>
                  <td style="color:rgb(93, 190, 255);">{{dataRange.co2.min}}ppm</td>
                  <td style="color:rgb(232, 140, 140);">{{dataRange.co2.max}}ppm</td>
                </tr>
                <tr>
                  <td>甲醛</td>
                  <td style="color:rgb(93, 190, 255);">{{dataRange.cho.min}}mg/m³</td>
                  <td style="color:rgb(232, 140, 140);">{{dataRange.cho.max}}mg/m³</td>
                </tr>
                <tr>
                  <td>温度</td>
                  <td style="color:rgb(93, 190, 255);">{{dataRange.temp.min}}℃</td>
                  <td style="color:rgb(232, 140, 140);">{{dataRange.temp.max}}℃</td>
                </tr>
                <tr>
                  <td>湿度</td>
                  <td style="color:rgb(93, 190, 255);">{{dataRange.wet.min}}%</td>
                  <td style="color:rgb(232, 140, 140);">{{dataRange.wet.max}}%</td>
                </tr>
              </table>
            </div>
          </el-card>
        </div>
        <div class="clear"></div>

        <div class="dataTable">
          <el-card>
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;font-size:26px;">空感一代设备列表</span>
              <el-input class='searchDevice1' placeholder="搜索设备" icon="search" v-model="deviceIdSearch" :on-icon-click="handleSearch">
              </el-input>
              <div class="block">
                共{{allKG1Count}}个设备，{{onlineKG1Count}}个正在运行
              </div>
            </div>
            <div class="KG1CardBody">
              <el-table ref="multipleTable" :data="KG1List" border tooltip-effect="dark" style="width: 100%" stripe>
                <el-table-column type="index" width="120" min-width="80" align="center">
                </el-table-column>
                <el-table-column prop="name" label="设备名称" width="180" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="device.id" label="设备ID" width="180" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="status" label="运行状态" width="140" min-width="120" align="center">
                  <template scope="scope">
                    <img v-if="scope.row.status===1" src="../../assets/images/device/online.png" class="statusIcon">
                    <img v-else src="../../assets/images/device/offline.png" class="statusIcon">
                    <span style="margin-left:10px;">{{scope.row.status===1?'运行中':scope.row.status===0?'离线':'已失效'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="device.geolocation.formatted_address" label="位置" width="380" min-width="210" align="center">
                </el-table-column>
                <el-table-column prop="user" label="用户" align="center">
                </el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalItems">
                </el-pagination>
              </div>
            </div>
          </el-card>
        </div>

      </el-tab-pane>

      <el-tab-pane label="空感二代" name="2">
        <div class="box box1">
          <el-card>
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;font-size:26px;">设备在线情况</span>
            </div>
            <div style="width:100%;">
              <div class="echarts1">
                <circleChart :circleOption="circleOption2"></circleChart>
              </div>
              <div class="text">共{{allKG2Count}}台设备</div>
            </div>
          </el-card>
        </div>
        <div class="box box2">
          <el-card>
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;font-size:26px;">污染分布</span>
            </div>
            <div class="echarts2">
              <ringChart :ringOption="ringOption2"></ringChart>
            </div>
          </el-card>
        </div>
        <div class="box box3">
          <el-card>
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;font-size:26px;">污染极值</span>
            </div>
            <div>
              <table>
                <tr>
                  <td>PM2.5</td>
                  <td style="color:rgb(93, 190, 255);">{{dataRange.pm2d5.min}}ug/m³</td>
                  <td style="color:rgb(232, 140, 140);">{{dataRange.pm2d5.max}}ug/m³</td>
                </tr>
                <tr>
                  <td>CO2</td>
                  <td style="color:rgb(93, 190, 255);">{{dataRange.co2.min}}ppm</td>
                  <td style="color:rgb(232, 140, 140);">{{dataRange.co2.max}}ppm</td>
                </tr>
                <tr>
                  <td>甲醛</td>
                  <td style="color:rgb(93, 190, 255);">{{dataRange.cho.min}}mg/m³</td>
                  <td style="color:rgb(232, 140, 140);">{{dataRange.cho.max}}mg/m³</td>
                </tr>
                <tr>
                  <td>温度</td>
                  <td style="color:rgb(93, 190, 255);">{{dataRange.temp.min}}℃</td>
                  <td style="color:rgb(232, 140, 140);">{{dataRange.temp.max}}℃</td>
                </tr>
                <tr>
                  <td>湿度</td>
                  <td style="color:rgb(93, 190, 255);">{{dataRange.wet.min}}%</td>
                  <td style="color:rgb(232, 140, 140);">{{dataRange.wet.max}}%</td>
                </tr>
              </table>
            </div>
          </el-card>
        </div>
        <div class="clear"></div>

        <div class="dataTable">
          <el-card>
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;font-size:26px;">空感二代设备列表</span>
              <el-input class='searchDevice1' placeholder="搜索设备" icon="search" v-model="deviceIdSearch" :on-icon-click="handleSearch">
              </el-input>
              <div class="block">
                共{{KG2Count}}个设备，{{KG2OnlineCount}}个正在运行
              </div>
            </div>
            <div class="KG1CardBody">
              <el-table ref="multipleTable" :data="KG2List" border tooltip-effect="dark" style="width: 100%" stripe>
                <el-table-column type="index" width="120" min-width="80" align="center">
                </el-table-column>
                <el-table-column prop="deviceName" label="设备名称" width="180" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="deviceId" label="设备ID" width="180" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="status" label="运行状态" width="140" min-width="120" align="center">
                  <template scope="scope">
                    <img v-if="scope.row.status===1" src="../../assets/images/device/online.png" class="statusIcon">
                    <img v-else src="../../assets/images/device/offline.png" class="statusIcon">
                    <span style="margin-left:10px;">{{scope.row.status===1?'运行中':'关闭'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="location" label="位置" width="380" min-width="210" align="center">
                </el-table-column>
                <el-table-column prop="user" label="用户" align="center">
                </el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalItems">
                </el-pagination>
              </div>
            </div>
          </el-card>
        </div>
      </el-tab-pane>

      <el-tab-pane label="新风" name="3">
        <div class="box box1">
          <el-card>
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;font-size:26px;">设备在线情况</span>
            </div>
            <div style="width:100%;">
              <div class="echarts1">
                <circleChart :circleOption="circleOption3"></circleChart>
              </div>
              <div class="text">共{{allNWCount}}台设备</div>
            </div>
          </el-card>
        </div>
        <div class="box box2">
          <el-card>
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;font-size:26px;">污染分布</span>
            </div>
            <div class="echarts2">
              <ringChart :ringOption="ringOption3"></ringChart>
            </div>
          </el-card>
        </div>
        <div class="box box3">
          <el-card class="box-card grid-content bg-purple">
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;font-size:26px;">污染极值</span>
            </div>
            <div>
              <table>
                <tr>
                  <td>PM2.5</td>
                  <td style="color:rgb(93, 190, 255);">{{dataRange.pm2d5.min}}ug/m³</td>
                  <td style="color:rgb(232, 140, 140);">{{dataRange.pm2d5.max}}ug/m³</td>
                </tr>
                <tr>
                  <td>CO2</td>
                  <td style="color:rgb(93, 190, 255);">{{dataRange.co2.min}}ppm</td>
                  <td style="color:rgb(232, 140, 140);">{{dataRange.co2.max}}ppm</td>
                </tr>
                <tr>
                  <td>甲醛</td>
                  <td style="color:rgb(93, 190, 255);">{{dataRange.cho.min}}mg/m³</td>
                  <td style="color:rgb(232, 140, 140);">{{dataRange.cho.max}}mg/m³</td>
                </tr>
                <tr>
                  <td>温度</td>
                  <td style="color:rgb(93, 190, 255);">{{dataRange.temp.min}}℃</td>
                  <td style="color:rgb(232, 140, 140);">{{dataRange.temp.max}}℃</td>
                </tr>
                <tr>
                  <td>湿度</td>
                  <td style="color:rgb(93, 190, 255);">{{dataRange.wet.min}}%</td>
                  <td style="color:rgb(232, 140, 140);">{{dataRange.wet.max}}%</td>
                </tr>
              </table>
            </div>
          </el-card>
        </div>
        <div class="clear"></div>

        <div class="dataTable">
          <el-card>
            <div slot="header" class="clearfix">
              <span style="line-height: 36px;font-size:26px;">新风设备列表</span>
              <el-input class='searchDevice1' placeholder="搜索设备" icon="search" v-model="deviceIdSearch" :on-icon-click="handleSearch">
              </el-input>
              <div class="block">
                共{{NWCount}}个设备，{{NWOnlineCount}}个正在运行
              </div>
            </div>
            <div class="KG1CardBody">
              <el-table ref="multipleTable" :data="newwindList" border tooltip-effect="dark" style="width: 100%" stripe>
                <el-table-column type="index" width="120" min-width="80" align="center">
                </el-table-column>
                <el-table-column prop="deviceName" label="设备名称" width="180" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="deviceId" label="设备ID" width="180" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="status" label="运行状态" width="140" min-width="120" align="center">
                  <template scope="scope">
                    <img v-if="scope.row.status===1" src="../../assets/images/device/online.png" class="statusIcon">
                    <img v-else src="../../assets/images/device/offline.png" class="statusIcon">
                    <span style="margin-left:10px;">{{scope.row.status===1?'运行中':'关闭'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="location" label="位置" width="380" min-width="210" align="center">
                </el-table-column>
                <el-table-column prop="user" label="用户" align="center">
                </el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalItems">
                </el-pagination>
              </div>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import circleChart from '../../components/CircleChart/index'
import ringChart from '../../components/RingChart/index'
import { getBaseData, getDeviceDetail } from 'api/device'
import { circleOption, ringOption } from 'utils/echarts'
export default {
  components: {
    circleChart, ringChart
  },
  data: () => ({
    deviceInfoTabs: '1',
    allKG1Count: 233,
    allKG2Count: 233,
    allNWCount: 233,
    onlineKG1Count: 233,
    KG1circleCount: [0, 0],
    deviceIdSearch: '',
    KG1Count: 0,
    KG1OnlineCount: 0,
    KG2Count: 0,
    KG2OnlineCount: 0,
    NWCount: 0,
    NWOnlineCount: 0,
    currentPage: 1,
    totalItems: 100,
    dataRange: {
      pm2d5: { min: 23, max: 233 },
      co2: { min: 88, max: 888 },
      cho: { min: 0.001, max: 1.333 },
      temp: { min: 2, max: 40 },
      wet: { min: 13, max: 98 }
    },
    KG1List: null,
    KG2List: null,
    newwindList: null,
    tableData1: [{
      deviceName: '汉王大厦空感一代',
      deviceId: 'KG-1484133759908',
      status: 1,
      group: '北京汉王蓝天',
      location: '北京市昌平区沙河镇沙河路97号新元科技园C座401汉王蓝天',
      user: '小拳拳捶你胸口大坏蛋嘤嘤嘤'
    }],
    circleOption1: circleOption,
    ringOption1: ringOption,
    circleOption2: circleOption,
    ringOption2: ringOption,
    circleOption3: circleOption,
    ringOption3: ringOption
  }),
  computed: {
  },
  created() {
    getBaseData().then(res => {
      //console.log(res.data)
      const KGtable = []
      let online = 5
      let offline = 0
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].device.serial == 'KG') {
          getDeviceDetail(res.data[i].id).then(data => {
            console.log(data.data)
            res.data[i].status = 0
            offline++
          }).catch(err1 => {
            const status = err1.response.status
            if (status == 500) {
              res.data[i].status = -1
              offline++
            }
          })
          KGtable.push(res.data[i])
        }
      }

      this.KG1List = res.data
      this.allCount = this.KG1List.length
      this.circleOption1.series[0].data[0].value = online
      this.circleOption1.series[0].data[1].value = offline
    }).catch(err => {
      this.$message.error('啊哦，出了点儿问题，稍等一会儿再试一下！');
    })
  },
  mounted: function() {

  },
  methods: {
    handleClick(tab, ev) {
    },
    handleSearch(ev) {
      console.log(ev);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
  min-width: 1300px;
  .title {
    font-size: 24px;
  }

  .el-tabs {
    margin-top: 50px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box {
    width: 33%;
    float: left;
  }

  .box2 {
    .el-card {
      margin: auto;
    }
  }
  .box3 {
    .el-card {
      float: right;
      table {
        margin-top: -10px;
      }
    }
  }
  .el-card {
    margin-bottom: 20px;
    height: 400px;
    width: 380px;
    min-width: 350px;
    .text {
      width: 100%;
      text-align: center;
      font-size: 20px;
      margin-top: 10px;
    }
    .echarts1 {
      width: 100%;
      height: 280px;
      margin-top: -30px;
      .echarts {
        width: 100%;
        height: 100%;
      }
    }
    .echarts2 {
      width: 100%;
      height: 330px;
      margin-top: -30px;
      .echarts {
        width: 100%;
        height: 100%;
      }
    }


    table {
      width: 90%;
      margin-left: 8%;
      tr {
        height: 60px;
        line-height: 50px;
        td {
          width: 30%;
        }
      }
    }
  }

  .dataTable {
    width: 100%;
    margin-top: 40px;
    .el-card {
      width: 100%;
      height: auto;
    }
    .el-input.searchDevice1 {
      float: right;
      width: 15%; // margin-top: 0.5%;
      z-index: 10;
    }
    .block {
      float: right;
      line-height: 36px;
      margin-right: 30px;
    }
    .KG1CardBody {
      width: 100%;
      margin: auto;
    }
    .el-table {
      width: 100%;
      margin: auto;
    }
    .pagination {
      margin: 50px auto;
      text-align: center;
    }
  }
}
</style>
