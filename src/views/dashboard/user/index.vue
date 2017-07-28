<template>
<div class="dashboard-user-container">
    <div class='title'>主页</div>
    <el-row :gutter='50'>
        <el-col :xs="24" :sm="24" :md="8" :lg="8">
            <div class="card">
                <div class='card-top'>
                    <span>设备在线情况</span>
                </div>
                <div class='card-bottom'>
                    <div class="echarts">
                        <IEcharts :option="pie"></IEcharts>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8">
            <div class="card">
                <div class='card-top'>
                    <span>污染情况分布</span>
                </div>
                <div class='card-bottom'>
                  <div class="echarts">
                       <IEcharts :option="pie"></IEcharts> 
                  </div>
                </div>
            </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8">
            <div class="card">
                <div class='card-top'>
                    <span>污染极值</span>
                </div>
                <div class='card-bottom'>
                  <table>
                    <tr>
                      <td>PM2.5</td>
                      <td class="td1">200</td>
                      <td class="td2">300</td>
                    </tr>
                    <tr>
                      <td>CO2</td>
                      <td class="td1">200</td>
                      <td class="td2">300</td>
                    </tr>
                    <tr>
                      <td>甲醛</td>
                      <td class="td1">200</td>
                      <td class="td2">300</td>
                    </tr>
                    <tr>
                      <td>温度</td>
                      <td class="td1">200</td>
                      <td class="td2">300</td>
                    </tr>
                    <tr>
                      <td>湿度</td>
                      <td class="td1">200</td>
                      <td class="td2">300</td>
                    </tr>
                  </table>
                </div>
            </div>
        </el-col>
    </el-row>

    <div class="device_list">
        <el-row class="list_head">
            <el-col :xs="24" :sm="24" :md="24" :lg="10">
                <div class="list_title">
                    设备列表
                </div>
            </el-col>
            <el-col :xs="20" :sm="20" :md="20" :lg="5">
                <div class="list_search">
                    <el-input placeholder="请输入设备名称" icon="search" v-model="device_input" :on-icon-click="searchDevice">
                    </el-input>
                </div>
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="2">
                <div class="list_filter">
                    <el-popover ref="fliter" placement="bottom" width="200" trigger="click">
                        <div class="fliter">
                            <div class="fliter_title">筛选</div>
                            <div class="fliter_body">

                            </div>
                            <div class="fliter_footer">
                                <el-button size="mini">取消</el-button>
                                <el-button type="primary" size="mini">确定</el-button>
                            </div>
                        </div>
                    </el-popover>
                    <el-button type="text" v-popover:fliter><i class="fa fa-filter fa-2x"></i></el-button>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="7">
                <div class="list_info">
                    共{{onlineCount1 + offlineCount1 + onlineCount2 + offlineCount2}}个设备，{{onlineCount1 + onlineCount2}}个正在运行中
                </div>
            </el-col>
        </el-row>
        <div class="list_body">
            <el-table class="device_table" :data="deviceData" stripe highlight-current-row :default-sort="{prop: 'name', order: 'descending'}" @current-change="handleCurrentChange">
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column label="设备名称" sortable width="120">
                    <template scope="scope">
        <el-button type="text" @click="showDetail">{{ scope.row.name }}</el-button>
</template>
    </el-table-column>
    <el-table-column prop="status" label="运行状态" sortable width="120"></el-table-column>
    <el-table-column prop="pm25" label="PM2.5" sortable width="100"></el-table-column>
    <el-table-column prop="co2" label="CO2" sortable width="100"></el-table-column>
    <el-table-column prop="cho" label="甲醛" sortable width="100"></el-table-column>
    <el-table-column prop="temp" label="温度" sortable width="100"></el-table-column>
    <el-table-column prop="wet" label="湿度" sortable width="100"></el-table-column>
    <el-table-column prop="id" label="设备ID" sortable width="150"></el-table-column>
    <el-table-column prop="address" label="位置" ></el-table-column>
    <el-table-column prop="user" label="用户" ></el-table-column>
  </el-table>
</div>
<div class="list_pagination">
  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="device_list_currentPage"
  layout="total, prev, pager, next, jumper"
  :total="onlineCount1 + offlineCount1 + onlineCount2 + offlineCount2">
</el-pagination>
</div>
</div>

<div class="user_list">
<el-row class="list_head">
  <el-col :xs="24" :sm="24" :md="24" :lg="10">
    <div class="list_title">
      账户列表
    </div>
  </el-col>
  <el-col :xs="24" :sm="24" :md="24" :lg="7">
    <div class="list_search">
      <el-input placeholder="请输入设备名称" icon="search" v-model="device_input" :on-icon-click="searchDevice">
      </el-input>
    </div>
  </el-col>

  <el-col :xs="24" :sm="24" :md="24" :lg="7">
    <div class="list_info">
      共{{onlineCount1 + offlineCount1 + onlineCount2 + offlineCount2}}个设备，{{onlineCount1 + onlineCount2}}个正在运行中
    </div>
  </el-col>
</el-row>
<div class="list_body">
  <el-table class="device_table" :data="deviceData" stripe highlight-current-row :default-sort = "{prop: 'name', order: 'descending'}" @current-change="handleCurrentChange">
    <el-table-column type="index" width="50">
    </el-table-column>
    <el-table-column label="设备名称" sortable width="120">
      <template scope="scope">
<el-button type="text" @click="showDetail">
    {{ scope.row.name }}</el-button>
</template>
    </el-table-column>
    <el-table-column prop="status" label="运行状态" sortable width="120"></el-table-column>
    <el-table-column prop="pm25" label="PM2.5" sortable width="100"></el-table-column>
    <el-table-column prop="co2" label="CO2" sortable width="100"></el-table-column>
    <el-table-column prop="cho" label="甲醛" sortable width="100"></el-table-column>
    <el-table-column prop="temp" label="温度" sortable width="100"></el-table-column>
    <el-table-column prop="wet" label="湿度" sortable width="100"></el-table-column>
    <el-table-column prop="id" label="设备ID" sortable width="150"></el-table-column>
    <el-table-column prop="address" label="位置" ></el-table-column>
    <el-table-column prop="user" label="用户" ></el-table-column>
  </el-table>
</div>
<div class="list_pagination">
  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="device_list_currentPage"
  layout="total, prev, pager, next, jumper"
  :total="onlineCount1 + offlineCount1 + onlineCount2 + offlineCount2">
</el-pagination>
</div>
</div>
    </div>
</template>

<script>
import IEcharts from 'vue-echarts-v3';
export default {
    components: {
        IEcharts
    },
    data: () => ({
        onlineCount1: 8888,
        offlineCount1: 888,
        onlineCount2: 666,
        offlineCount2: 666,
        device_input: '',
        device_list_currentPage: 2,
        deviceData: [{
            name: '2016-05-01',
            id: 'KG-123456789',
            user: 'admin',
            status: '运行中',
            pm25: 10,
            co2: 233,
            cho: 0.012,
            temp: 16,
            wet: 48,
            address: '上海市普陀区金沙江路 1518 弄'
        }, {
            name: '2016-05-03',
            id: 'KG-123456789',
            user: 'admin',
            status: '离线',
            pm25: 15,
            cho: 0.002,
            co2: 133,
            temp: 26,
            wet: 43,
            address: '上海市普陀区金沙江路 1518 弄'
        }, {
            name: '2016-05-02',
            id: 'KG-123456789',
            user: 'admin',
            status: '离线',
            pm25: 100,
            cho: 0.032,
            co2: 23,
            temp: 36,
            wet: 22,
            address: '上海市普陀区金沙江路 1518 弄'
        }, {
            name: '2016-05-08',
            id: 'KG-123456789',
            user: 'admin',
            status: '运行中',
            pm25: 5,
            cho: 0.08,
            co2: 453,
            temp: 10,
            wet: 55,
            address: '上海市普陀区金沙江路 1518 弄'
        }, {
            name: '2016-05-04',
            id: 'KG-123456789',
            user: 'admin',
            status: '运行中',
            pm25: 2,
            cho: 0.072,
            co2: 600,
            temp: -16,
            wet: 46,
            address: '上海市普陀区金沙江路 1518 弄'
        }, {
            name: '2016-05-06',
            id: 'KG-123456789',
            user: 'admin',
            status: '运行中',
            pm25: 55,
            cho: 0.12,
            co2: 813,
            temp: 22,
            wet: 83,
            address: '上海市普陀区金沙江路 1518 弄'
        }, {
            name: '2016-05-10',
            id: 'KG-123456789',
            user: 'admin',
            status: '运行中',
            pm25: 80,
            cho: 0.042,
            co2: 188,
            temp: -6,
            wet: 43,
            address: '上海市普陀区金沙江路 1518 弄'
        }],
        pie: {
            color: ["#20a0ff", "#13CE66", "#F7BA2A", "#FF4949", "#61a0a8"],
            title: {
                show: false
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                show: false
            },
            series: [{
                name: '销量',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                lableLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: [{
                        value: 335,
                        name: 'PM2.5'
                    },
                    {
                        value: 310,
                        name: 'CO2'
                    },
                    {
                        value: 234,
                        name: '甲醛'
                    },
                    {
                        value: 135,
                        name: '温度'
                    },
                    {
                        value: 548,
                        name: '湿度'
                    }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        },
    }),
    methods: {
        say: function(message) {
            alert(message);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        searchDevice(ev) {
            alert(this.device_input);
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        showDetail: function(e) {
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
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            console.log(`当前页: ${val}`);
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-user-container {
    padding: 30px 50px;
}
* {
    margin: 0;
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
    border-radius: 4px;
    margin-top: 10px;
}

.card {
    width: 100%;
    height: auto;
    border: 1px solid #d1dbe5;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
}

.card-top {
    font-size: 20px;
    padding-left: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #d1dbe5;
}
.image {
    width: 100%;
    display: block;
}
.card-bottom {
    height: 300px;
}

.echarts {
    width: 100%;
    height: 100%;
}
.vue-echarts {
  width: 100%;
  min-width: 100%;
    height: 100%;
    min-height: 100%;
    z-index: 99;
}
.card-bottom>table {
  font-size: 18px;
  margin-left: 20px;
}
.card-bottom>table>tr {
  height: 57px;
  line-height: 57px;
}
.card-bottom>table>tr>td {
  width: 45%;
  text-align: center;
}
.td1 {
  color: rgba(0, 153, 255, 0.7);
}
.td2 {
  color: rgba(204, 0, 0, 0.7);
}

.device_list,
.user_list {
    width: 100%;
    height: auto;
    border: 1px solid #d1dbe5;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    margin-top: 50px;
}
.list_head {
    width: 94%;
    border-bottom: 1px solid #d1dbe5;
    margin-left: 3%;
    margin-top: 15px;
    padding-bottom: 10px;
}

.list_title {
    text-align: left;
    font-size: 24px;
    line-height: 50px;
}
.list_search > .el-input {
    width: 80%;
    margin-top: 5px;
}
.list_fliter {
    line-height: 50px;
}

.list_info {
    line-height: 50px;
}
.device_table {
    width: 94%;
    margin: 20px auto;
}
.list_pagination {
    width: 100%;
}
.el-pagination {
    width: 500px;
    margin: 30px auto;

}
@media screen and (min-width: 1200px) {
    .text1 {
        font-size: 14px;
    }
    .text2 {
        font-size: 22px;
    }
    .card3 {
        width: 100%;
        height: 450px;
    }
}
@media screen and (min-width: 992px) and (max-width: 1200px) {
    .text1 {
        font-size: 14px;
    }
    .text2 {
        font-size: 22px;
    }
    .card3 {
        width: 100%;
        height: 500px;
    }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
    .text1 {
        font-size: 14px;
    }
    .text2 {
        font-size: 24px;
    }
    .card3 {
        width: 100%;
        height: 500px;
    }
}
@media screen and (max-width : 768px) {
    .text1 {
        font-size: 14px;
    }
    .text2 {
        font-size: 28px;
    }
    .card3 {
        width: 100%;
        height: 500px;
    }
}
</style>
