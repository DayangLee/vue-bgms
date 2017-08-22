<template>
  <div class="data-container">

    <div class="title">
      设备 / 设备管理
    </div>
    <el-input class='searchDevice' placeholder="搜索设备" icon="search" v-model="deviceIdSearch" :on-icon-click="handleIconClick">
    </el-input>
    <div class="filter-title">
      <p class="tagsTitle">已选条件</p>
      <p class="tags">
        <el-tag class="tag" v-for="tag in tags" :key="tag.name" :closable="true" :type="tag.type" :color="tag.color" @close="handleClose(tag)">
          {{tag.name}}
        </el-tag>
      </p>
      <p class="tags-others">
        <el-select v-model="thisfilter" placeholder="请选择" @change="chooseFilter" style="width:150px;margin-right:10px;">
          <el-option v-for="item in filtersList" :key="item.value" :label="item.label" :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right;margin-top:-4px;">
              <el-button :plain="true" type="warning" size="small" icon="delete" @click.stop="removeItem(item.value)"></el-button>
            </span>
          </el-option>
        </el-select>
        <el-button type="primary" size="small" @click="newFiltersConfig">新建</el-button>
        <el-button type="primary" size="small" @click="saveFiltersConfig">保存</el-button>
      </p>
    </div>
    <div class="clear"></div>

    <el-tabs type="border-card" v-model="activeTab" class="filtersTabs">
      <el-tab-pane label="设备类型" name="deviceType">
        <div class="kg-tab">
          <button class="kg-button" @click="addkg1">
            <img src="../../assets/images/device/kg1.png">
          </button>
          <button class="kg-button" @click="addkg2">
            <img src="../../assets/images/device/kg2.png">
          </button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="数值" name="data">
        <div class="data-tab">
          <div class="data-left">
            <p class="dataItem" id="dataItem1">
              <span>PM2.5</span>
              <el-input style="margin-left:10px;" class="dataItem-input1" v-model="dataItem.pm2d5[0]"></el-input> -
              <el-input class="dataItem-input2" v-model="dataItem.pm2d5[1]"></el-input>
            </p>
            <p class="dataItem" id="dataItem2">
              <span>CO2</span>
              <el-input style="margin-left:10px;" class="dataItem-input1" v-model="dataItem.co2[0]"></el-input> -
              <el-input class="dataItem-input2" v-model="dataItem.co2[1]"></el-input>
            </p>
            <p class="dataItem" id="dataItem3">
              <span>臭氧</span>
              <el-input style="margin-left:10px;" class="dataItem-input1" v-model="dataItem.o3[0]"></el-input> -
              <el-input class="dataItem-input2" v-model="dataItem.o3[1]"></el-input>
            </p>
            <p class="dataItem" id="dataItem4">
              <span>温度</span>
              <el-input style="margin-left:10px;" class="dataItem-input1" v-model="dataItem.temp[0]"></el-input> -
              <el-input class="dataItem-input2" v-model="dataItem.temp[1]"></el-input>
            </p>
            <p class="dataItem" id="dataItem5">
              <span>噪音</span>
              <el-input style="margin-left:10px;" class="dataItem-input1" v-model="dataItem.noise[0]"></el-input> -
              <el-input class="dataItem-input2" v-model="dataItem.noise[1]"></el-input>
            </p>
            <p class="dataItem" id="dataItem6">
              <span>甲醛</span>
              <el-input style="margin-left:10px;" class="dataItem-input1" v-model="dataItem.cho[0]"></el-input> -
              <el-input class="dataItem-input2" v-model="dataItem.cho[1]"></el-input>
            </p>
            <p class="dataItem" id="dataItem7">
              <span>氧气</span>
              <el-input style="margin-left:10px;" class="dataItem-input1" v-model="dataItem.o2[0]"></el-input> -
              <el-input class="dataItem-input2" v-model="dataItem.o2[1]"></el-input>
            </p>
            <p class="dataItem" id="dataItem8">
              <span>湿度</span>
              <el-input style="margin-left:10px;" class="dataItem-input1" v-model="dataItem.hum[0]"></el-input> -
              <el-input class="dataItem-input2" v-model="dataItem.hum[1]"></el-input>
            </p>
            <p class="dataItem" id="dataItem9">
              <span>TVOC</span>
              <el-input style="margin-left:10px;" class="dataItem-input1" v-model="dataItem.tvoc[0]"></el-input> -
              <el-input class="dataItem-input2" v-model="dataItem.tvoc[1]"></el-input>
            </p>
            <p class="dataItem" id="dataItem10">
              <span>气压</span>
              <el-input style="margin-left:10px;" class="dataItem-input1" v-model="dataItem.pre[0]"></el-input> -
              <el-input class="dataItem-input2" v-model="dataItem.pre[1]"></el-input>
            </p>
          </div>
          <el-button class="data-save" type="primary" size="small" @click="saveDataItem">保存</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="状态" name="status">
        <div class="status-tab">
          <div class="status-tab-left">
            <el-button :plain="true" type="info" size="large" @click="addOpen">开机</el-button>
          </div>
          <div class="status-tab-right">
            <el-button :plain="true" type="info" size="large" @click="addClose">关机</el-button>
          </div>
          <div class="clear"></div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="位置" name="location">
        <div class="location-tab">
          <el-cascader class="filterItem-content" :options="chinaArea" v-model="filterLocation" @change="addLocation">
          </el-cascader>
        </div>
      </el-tab-pane>
      <el-tab-pane label="分组" name="group">
        <div class="group-tab">
          <el-button :plain="true" type="info" v-for='item in groupTabList' size="large" style="width:100px;margin-right:20px;" @click="addGroup(item)">{{item}}</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="序列号区间" name="series">
        <div class="series-tab">
          序列号区间&nbsp;&nbsp;
          <el-input v-model='series[0]'></el-input>
          &nbsp;——&nbsp;
          <el-input v-model='series[1]'></el-input>
          <p class="series-example">
            例： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>KG-1484133759908</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; —— &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>KG-1484133759908</span>
          </p>
          <el-button class="series-save" type="primary" size="small" @click="addSeries">保存</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="在线时间" name="time">
        <div class="time-tab">
          <el-date-picker v-model="filterTimeRange" type="datetimerange" placeholder="选择时间范围"></el-date-picker>
          <el-button class="timerange-save" type="primary" size="small" @click="addTimeRange">保存</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>

    <div class="table-row">
      <el-button :plain="true" type="info" size="small" style="float:left;" @click="slide">更多操作</el-button>
      <span style="float:right;">
        共{{deviceCount}}个设备，{{onlineCount}}个正在运行
      </span>
    </div>

    <div class="deviceTables" style="width: 100%">
      <el-table ref="multipleTable" :data="tableList" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" stripe id="table">
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column type="index" width="60" align="center">
        </el-table-column>
        <el-table-column prop="deviceName" label="设备名称" width="160" align="center">
        </el-table-column>
        <el-table-column prop="deviceId" label="设备ID" width="150" align="center">
        </el-table-column>
        <el-table-column prop="status" label="运行状态" width="100" align="center">
          <template scope="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">{{scope.row.status===1?'运行中':'关闭'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :render-header="renderHeader" align="center">
          <el-table-column v-for="col in checkTable" :prop="col.prop" :label="col.label" width="130" align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="更多" align="center" min-width="100">
          <template scope="scope">
            <el-button type="text" size="small" style="color:#13ce66;" @click="handleDetail(scope.$index, scope.row.deviceId)">详情</el-button>
            <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row.deviceId)">操作</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalItems">
      </el-pagination>
    </div>

    <el-dialog id="detailDialog" title="汉王大厦" size='large' v-model="dialogTableVisible">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-card class="box-card realStatus">
            <div class="card-header">
              当前状态
            </div>
            <div class="card-body">
              <div class="devSummary">
                <div class="devStatus">
                  <div class='statusCircle' v-bind:style="{backgroundColor: thisDevData.status === 'true' ? '#13ce66' : '#ff4949'}"></div>
                  <div class="statusText">
                    {{thisDevData.status === 'true' ? '运行中' : '关闭'}}
                  </div>
                </div>
                <div class="devTime">
                  {{thisDevData.time}}
                </div>
              </div>
              <div class="clear"></div>
              <div class="devData">
                <span>PM2.5&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span class="thisPm25" v-bind:style="{color: thisDevData.pm25 <= 35? '#01cc00': thisDevData.pm25 <= 75? '#d7c924': thisDevData.pm25<=115? '#eb8a15': thisDevData.pm25<=150? '#fe0000':thisDevData.pm25<=250?'#993365':'#8f4748'}">{{thisDevData.pm25}}</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;ug/m³</span>
              </div>
              <div class="clear"></div>
              <div class="devCho">
                <span class="dataName">甲醛</span>
                <div class="dataNum">
                  <div class="choData" v-bind:style="{backgroundColor: thisDevData.cho <= 0.08? 'RGBA(45, 223, 96, 1)': thisDevData.cho <= 0.30? 'RGBA(229, 218, 48, 1)': thisDevData.cho<= 0.75? 'RGBA(255, 150, 57, 1)': 'RGBA(239, 60, 255, 1)', width: thisDevData.cho<=0.08? ((thisDevData.cho/0.0032)+'%') : thisDevData.cho<=0.3? (((thisDevData.cho-0.08)/0.0088+25)+'%') : thisDevData.cho<=0.75? (((thisDevData.cho-0.3)/0.018+50)+'%') : thisDevData.cho<=1.5? (((thisDevData.cho-0.75)/0.03+75)+'%') : '100%' }"></div>
                </div>
                <span class="dataUnit">{{thisDevData.cho}}mg/m³</span>
              </div>
              <div class="clear"></div>
              <div class="devCO2">
                <span class="dataName">CO2</span>
                <span class="dataNum">
                  <div class="co2Data" v-bind:style="{backgroundColor: thisDevData.co2 <= 1000? 'RGBA(45, 223, 96, 1)': thisDevData.co2 <= 2000? 'RGBA(229, 218, 48, 1)':'RGBA(255, 150, 57, 1)', width: thisDevData.co2<=3000? (thisDevData.co2/30)+'%' : '100%'}"></div>
                </span>
                <span class="dataUnit">{{thisDevData.co2}}ppm</span>
              </div>
              <div class="clear"></div>
              <div class="devTemp">
                <span class="dataName">温度</span>
                <span class="dataNum">
                  <div class="tempData" v-bind:style="{backgroundColor: thisDevData.temp<=5? 'rgb(44,48,147)': thisDevData.temp<=10? 'rgb(43,194,239)': thisDevData.temp<=16? 'rgb(121,193,67)': thisDevData.temp<=24? 'rgb(254,242,0)': thisDevData.temp<=30? 'rgb(251,158,29)': 'rgb(255,62,62)', width: thisDevData.temp<=40? 2.5*thisDevData.temp+'%' : '100%'}"></div>
                </span>
                <span class="dataUnit">{{thisDevData.temp}}℃</span>
              </div>
              <div class="clear"></div>
              <div class="devWet">
                <span class="dataName">湿度</span>
                <span class="dataNum">
                  <div class="wetData" v-bind:style="{backgroundColor: thisDevData.wet<=40? 'RGBA(78,190,255,1)': thisDevData.wet<=70? 'RGBA(45,223,96,1)': 'RGBA(255,150,57,1)', width: thisDevData.wet+'%'  }"></div>
                </span>
                <span class="dataUnit">{{thisDevData.wet}}%</span>
              </div>
            </div>

          </el-card>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-card class="box-card information">
            <div class="card-header">
              详细信息
              <el-button type="text" icon="edit" @click="handleEditInformation1" v-bind:style="{display:editIcon}"></el-button>
              <el-button type="text" icon="circle-check" @click="handleEditInformation2" v-bind:style="{display:saveIcon}"></el-button>
            </div>
            <div class="card-body">
              <div class="thisDevId informationItem">
                <div>
                  <img src="../../assets/images/device/id.png" />
                </div>
                <div class="informationItemName">设备ID</div>
                <div class="informationItemData">{{thisDevData.id}}</div>
              </div>
              <div class="clear"></div>
              <div class="thisDevTime informationItem">
                <div>
                  <img src="../../assets/images/device/time.png" />
                </div>
                <div class="informationItemName">上次在线</div>
                <div class="informationItemData">{{thisDevData.time}}</div>
              </div>
              <div class="clear"></div>
              <div class="thisDevUser informationItem">
                <div>
                  <img src="../../assets/images/device/user.png" />
                </div>
                <div class="informationItemName">所属用户</div>
                <div class="informationItemData">
                  <el-select v-model="thisDevData.user" :disabled="isDisabled" placeholder="请选择">
                    <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="clear"></div>
              <div class="thisDevLocation informationItem">
                <div>
                  <img src="../../assets/images/device/location.png" />
                </div>
                <div class="informationItemName">位置</div>
                <div class="informationItemData">{{thisDevData.location}}</div>
              </div>
              <div class="clear"></div>
              <div class="thisDevGroup informationItem">
                <div>
                  <img src="../../assets/images/device/group.png" />
                </div>
                <div class="informationItemName">群组</div>
                <div class="informationItemData">
                  <el-select v-model="thisDevData.group" :disabled="isDisabled" placeholder="请选择">
                    <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="clear"></div>
              <div class="thisDevContact informationItem">
                <div>
                  <img src="../../assets/images/device/contact.png" />
                </div>
                <div class="informationItemName">联系人</div>
                <div class="informationItemData">
                  <el-input placeholder="请输入内容" v-model="thisDevData.contact" :disabled="isDisabled">
                  </el-input>
                </div>
              </div>
              <div class="clear"></div>
              <div class="thisDevTel informationItem">
                <div>
                  <img src="../../assets/images/device/phone.png" />
                </div>
                <div class="informationItemName">电话</div>
                <div class="informationItemData">
                  <el-input placeholder="请输入内容" v-model="thisDevData.tel" :disabled="isDisabled">
                  </el-input>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-card class="newWind">
        <div class="left">
          <img src="../../assets/images/device/newWind.png" />
        </div>
        <div class="right">
          <div class="rightUp">
            <div class="newWindItem thisNewWindOpen">
              <div class="newWindStatusName">
                开关
              </div>
              <div class="newWindStatusData">
                {{thisDevData.status === 'true' ? '开' : '关'}}
              </div>
            </div>
            <div class="newWindItem thisNewWindStatus">
              <div class="newWindStatusName">
                运行状态
              </div>
              <div class="newWindStatusData">
                {{thisDevData.status === 'true' ? '运行中' : '关闭'}}
              </div>
            </div>

            <div class="newWindItem thisNewWindWindSpeed">
              <div class="newWindStatusName">
                风速
              </div>
              <div class="newWindStatusData">
                {{thisDevData.windSpeed}}档
              </div>
            </div>

            <div class="newWindItem thisNewWindGear">
              <div class="newWindStatusName">
                档位
              </div>
              <div class="newWindStatusData">
                {{thisDevData.windGear}}
              </div>
            </div>

            <div class="newWindItem thisNewWindCircle">
              <div class="newWindStatusName">
                循环
              </div>
              <div class="newWindStatusData">
                {{thisDevData.circle}}
              </div>
            </div>

            <div class="newWindItem thisNewWindHit">
              <div class="newWindStatusName">
                热交换
              </div>
              <div class="newWindStatusData">
                {{thisDevData.hit}}
              </div>
            </div>

            <div class="newWindItem thisNewWindOrdertime">
              <div class="newWindStatusName">
                定时
              </div>
              <div class="newWindStatusData">
                {{thisDevData.ordertime}}
              </div>
            </div>
          </div>
          <div class="rightDown">
            <div class="newWindItem thisNewWindfirst">
              <div class="newWindStatusName">
                初效
              </div>
              <div class="newWindStatusData">
                {{thisDevData.first}}
              </div>
            </div>
            <div class="newWindItem thisNewWindsecond">
              <div class="newWindStatusName">
                中效
              </div>
              <div class="newWindStatusData">
                {{thisDevData.second}}
              </div>
            </div>
            <div class="newWindItem thisNewWindthird">
              <div class="newWindStatusName">
                高效
              </div>
              <div class="newWindStatusData">
                {{thisDevData.third}}
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <el-card class="history">
        <el-row class="historyTitle">
          <el-col :xs="24" :sm="8" :md="4" :lg="4">历史记录</el-col>
          <el-col :xs="24" :sm="16" :md="20" :lg="10">
            <el-radio-group v-model="historyRadio">
              <el-radio-button label="按年"></el-radio-button>
              <el-radio-button label="按月"></el-radio-button>
              <el-radio-button label="按日"></el-radio-button>
              <el-radio-button label="按时"></el-radio-button>
            </el-radio-group>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="10">
            <el-date-picker v-model="timepicker" type="datetimerange" placeholder="选择时间范围" size="small" @change="handleSelectTime">
            </el-date-picker>
            <el-icon name="upload2"></el-icon>
          </el-col>
        </el-row>

        <div class="components-container">
          <div class='chart-container'>
            <barChart width="100%"></barChart>
            <!-- <keyboardChart height='100%' width='100%' ></keyboardChart> -->
          </div>
          <div class="chooseDataType">
            <div>检测项目</div>
            <el-button>PM2.5
              <img src="../../assets/images/device/gray.png" />
            </el-button>
            <div class="clear"></div>
            <el-button>CO2
              <img src="../../assets/images/device/green.png" />
            </el-button>
            <div class="clear"></div>
            <el-button>甲醛
              <img src="../../assets/images/device/yellow.png" />
            </el-button>
            <div class="clear"></div>
            <el-button>温度
              <img src="../../assets/images/device/purple.png" />
            </el-button>
            <div class="clear"></div>
            <el-button>湿度
              <img src="../../assets/images/device/blue.png" />
            </el-button>
          </div>
        </div>
      </el-card>
    </el-dialog>

    <el-dialog id="operateDialog" title="编辑设备信息" v-model="dialogTableVisible2">
      <div class="operateItem">
        <div class="operateName">设备操作</div>
        <div class="operateSettings1">
          <div class="settingsItem">
            <p>开关</p>
            <el-switch v-model="value1" on-text="" off-text="">
            </el-switch>
          </div>
          <div class="settingsItem">
            <p>内循环</p>
            <el-switch v-model="value1" on-text="" off-text="">
            </el-switch>
          </div>
          <div class="settingsItem">
            <p>外循环</p>
            <el-switch v-model="value1" on-text="" off-text="">
            </el-switch>
          </div>
          <div class="settingsItem">
            <p>热交换</p>
            <el-switch v-model="value1" on-text="" off-text="">
            </el-switch>
          </div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="clear"></div>
      <div class="operateItem">
        <div class="operateName">档位调节</div>
        <div class="operateSettings">
          <el-radio-group v-model="radio1">
            <el-radio :label="1">一档</el-radio>
            <el-radio :label="2">二档</el-radio>
            <el-radio :label="3">三档</el-radio>
            <el-radio :label="4">四档</el-radio>
            <el-radio :label="5">自动</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="clear"></div>
      <div class="operateItem3">
        <div class="operateName3">定时设置</div>
        <div class="operateSettings3">
          <el-time-picker is-range v-model="timepicker1" placeholder="选择时间范围">
          </el-time-picker>
        </div>
      </div>
      <div class="clear"></div>
      <div class="operateItem">
        <div class="operateName">设备名称</div>
        <div class="operateSettings">
          <el-input v-model="thisDevData.name" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div class="clear"></div>
      <div class="operateItem5">
        <div class="operateName5">设备分组</div>
        <div class="operateSettings5">
          <el-select v-model="thisDevData.group" placeholder="请选择">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="clear"></div>
      <div class="operateItem">
        <div class="operateName">位置信息</div>
        <div class="operateSettings">
          <el-input v-model="thisDevData.location" placeholder="请输入内容"></el-input>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible2 = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDeviceStatus, getDeviceInfo, getDeviceData } from '../../api/deviceManage'
import barChart from '../../components/BarChart/index'
import { timeFormat } from 'utils/format'
import { provinceAndCityData, CodeToText, TextToCode } from 'element-china-area-data'
const deviceTypeList = ['空感一代', '空感二代', '新风控制板']
const groupList = [{
  value: '选项1',
  label: '分组一'
}, {
  value: '选项2',
  label: '分组二'
}, {
  value: '选项3',
  label: '分组三'
}, {
  value: '选项4',
  label: '分组四'
}, {
  value: '选项5',
  label: '分组五'
}]
export default {
  data: () => ({
    tags: [],
    filtersList: [{
      value: 'Beijing',
      label: '北京'
    }, {
      value: 'Shanghai',
      label: '上海'
    }, {
      value: 'Nanjing',
      label: '南京'
    }, {
      value: 'Chengdu',
      label: '成都'
    }, {
      value: 'Shenzhen',
      label: '深圳'
    }, {
      value: 'Guangzhou',
      label: '广州'
    }],
    thisfilter: '',
    activeTab: 'deviceType',
    dataItem: {
      pm2d5: ['', ''],
      co2: ['', ''],
      o3: ['', ''],
      temp: ['', ''],
      noise: ['', ''],
      cho: ['', ''],
      o2: ['', ''],
      hum: ['', ''],
      tvoc: ['', ''],
      pre: ['', '']
    },
    filterStatus: '',
    groupTabList: ['分组一', '分组二', '分组三', '分组四'],
    series: ['', ''],
    deviceTypeList: deviceTypeList,
    filterDeviceType: [],
    deviceStatusList: ['开机', '关机'],
    filterDeviceStatus: [],
    chinaArea: provinceAndCityData,
    filterLocation: [],
    groupList: groupList,
    filterGroupList: [],
    filterTimeRange: [new Date(2017, 7, 1, 10, 10), new Date(2017, 8, 1, 10, 10)],
    tableList: [{
      deviceName: '空感一代',
      deviceId: 'KG-12345678',
      status: 1
    }],
    deviceIdSearch: '',
    deviceManageTabs: 'first',
    currentPage: 1,
    totalItems: 100,
    checkList: ['全部'],
    statusList: null,
    infoList: null,
    dataList: null,
    deviceCount: 1000,
    onlineCount: 333,
    thisId: '',
    dialogTableVisible: false,
    dialogTableVisible2: false,
    historyRadio: '按时',
    value1: true,
    value2: true,
    radio1: 1,
    form: {
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    },
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
      uploadtime: '2017/08/22 10:00',
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
      uploadtime: '2017/08/22 10:00',
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
    checkTable: [
      { prop: 'pm2d5', label: 'PM2.5' },
      { prop: 'co2', label: 'CO2' },
      { prop: 'temp', label: '温度' },
      { prop: 'hum', label: '湿度' },
      { prop: 'cho', label: '甲醛' },
      { prop: 'tvoc', label: 'TVOC' }
    ],
    formLabelWidth: '120px',
    thisDevData: {
      id: 'KG-1484133759908',
      name: '办公室',
      status: 'false',
      time: '2017年4月16日 11:03',
      pm25: '233',
      cho: '0.08',
      co2: '2500',
      temp: '10',
      wet: '85',
      user: '大洋李',
      location: '北京市昌平区沙河镇新元科技园',
      group: '汉王蓝天科技',
      contact: 'LJY',
      tel: '13521347060',
      windSpeed: '3',
      windGear: '自动',
      circle: '内',
      hit: '关',
      ordertime: '05:00 -- 07:00',
      first: '126',
      second: '258',
      third: '36'
    },
    options1: [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }],
    timepicker: [new Date(2017, 6, 1, 10, 10), new Date(2017, 6, 12, 10, 10)],
    timepicker1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
    isDisabled: true,
    editIcon: 'inline-block',
    saveIcon: 'none',
    focus: [true, false],
    focus0: false,
    focus1: false,
    focus2: false,
    focus3: false,
    focus4: false,
    focus5: false,
    focus6: false,
    focus7: false,
    focus8: false
  }),
  components: {
    barChart
  },
  methods: {
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
      console.log(this.tags)
    },
    removeItem(e) {
      let list = []
      this.filtersList.forEach(item => {
        if (item.value !== e) {
          list.push(item)
        }
      })
      this.filtersList = list
    },
    chooseFilter() {
      console.log(this.thisfilter)
    },
    newFiltersConfig() {
      this.tags = []
    },
    saveFiltersConfig() {
      this.$prompt('请输入名称', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.filtersList.push({
          value: escape(value),
          label: value
        })
        this.$message({
          type: 'success',
          message: value + '保存成功！'
        });
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '保存失败，请重试！'
        });
      });
    },
    addkg1() {
      let num = 0;
      this.tags.forEach(item => {
        if (item.name !== '空感一代') {
          num++;
        }
      })
      if (num === this.tags.length) {
        this.tags.push({
          name: '空感一代',
          color: '#D8BFD8'
        })
      }
    },
    addkg2() {
      let num = 0;
      this.tags.forEach(item => {
        if (item.name !== '空感二代') {
          num++;
        }
      })
      if (num === this.tags.length) {
        this.tags.push({
          name: '空感二代',
          color: '#483D8B'
        })
      }
    },
    addOpen() {
      let num = 0;
      this.tags.forEach(item => {
        if (item.name !== '开机') {
          num++;
        }
      })
      if (num === this.tags.length) {
        this.tags.push({
          name: '开机',
          color: '#1E90FF'
        })
      }
    },
    addClose() {
      let num = 0;
      this.tags.forEach(item => {
        if (item.name !== '关机') {
          num++;
        }
      })
      if (num === this.tags.length) {
        this.tags.push({
          name: '关机',
          color: '#FFA500'
        })
      }
    },
    addGroup(e) {
      console.log(e)
      let num = 0;
      this.tags.forEach(item => {
        if (item.name !== e) {
          num++;
        }
      })
      if (num === this.tags.length) {
        this.tags.push({
          name: e,
          color: '#228B22'
        })
      }
    },
    addLocation(value) {
      console.log(value)
      let city = CodeToText[this.filterLocation[1]]
      let num = 0
      if (value[0] == '110000') {
        city = '北京市'
      } else if (value[0] == '310000') {
        city = '上海市'
      } else if (value[0] == '120000') {
        city = '天津市'
      } else if (value[0] == '500000') {
        city = '重庆市'
      } else if (value[0] == '710000') {
        city = '台湾省'
      } else if (value[0] == '810000') {
        city = '香港'
      } else if (value[0] == '820000') {
        city = '澳门'
      }

      this.tags.forEach(item => {
        if (item.name !== city) {
          num++;
        }
      })
      if (num === this.tags.length) {
        this.tags.push({
          name: city,
          color: '#FFD700'
        })
      }
    },
    addSeries() {
      if (this.series[0] !== '' && this.series[1] !== '') {
        if (this.series[0].substr(0, 3) == 'KG-' && this.series[1].substr(0, 3) == 'KG-') {
          let min = this.series[0].substr(3)
          let max = this.series[1].substr(3)
          let num = 0
          if (min <= max) {
            this.tags.forEach(item => {
              if (item.name !== this.series[0] + ' -- ' + this.series[1]) {
                num++;
              }
            })
            if (num === this.tags.length) {
              this.tags.push({
                name: this.series[0] + ' -- ' + this.series[1],
                color: '#F4A460'
              })
            }
          } else {
            this.showWarningMessage('序列号区间')
          }
        } else {
          this.showWarningMessage('序列号')
        }
      }
    },
    addTimeRange() {
      let time1 = timeFormat(this.filterTimeRange[0])
      let time2 = timeFormat(this.filterTimeRange[1])
      let num = 0
      this.tags.forEach(item => {
        if (item.name !== time1 + ' -- ' + time2) {
          num++;
        }
      })
      if (num === this.tags.length) {
        this.tags.push({
          name: time1 + ' -- ' + time2,
          color: '#696969'
        })
      }
    },
    saveDataItem() {
      this.addDataItemTags('pm2d5', 'PM2.5', '#5F9EA0')
      this.addDataItemTags('co2', '二氧化碳', '#FF00FF')
      this.addDataItemTags('o3', '臭氧', '#8A2BE2')
      this.addDataItemTags('temp', '温度', '#4682B4')
      this.addDataItemTags('noise', '噪音', '#B22222')
      this.addDataItemTags('cho', '甲醛', '#00FF7F')
      this.addDataItemTags('o2', '氧气', '#FF69B4')
      this.addDataItemTags('hum', '湿度', '#9400D3')
      this.addDataItemTags('tvoc', 'TVOC', '#B0E0E6')
      this.addDataItemTags('pre', '气压', '#FF4500')
    },
    addDataItemTags(type, name, color) {
      if (this.dataItem[type][0] !== '' && this.dataItem[type][1] !== '') {
        if (isNaN(this.dataItem[type][0]) || isNaN(this.dataItem[type][1])) {
          this.showWarningMessage(name)
        } else {
          if (this.dataItem[type][0] <= this.dataItem[type][1]) {
            let num = 0;
            this.tags.forEach(item => {
              if (item.name !== name + ' ' + this.dataItem[type][0] + '-' + this.dataItem[type][1]) {
                num++;
              }
            })
            if (num === this.tags.length) {
              this.tags.push({
                name: name + ' ' + this.dataItem[type][0] + '-' + this.dataItem[type][1],
                color: color
              })
            }
          } else {
            this.showWarningMessage(name)
          }
        }
      }
    },
    handleHeader1() {
      this.checkTable = [
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
      this.checkTable = [
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
      this.checkTable = [
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
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleIconClick(ev) {
      console.log(ev);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleCheckList(val) {
      console.log(`选中项: ${val}`);
    },
    handleDetail(index, id) {
      console.log(index, id);
      this.dialogTableVisible = true;
      this.thisId = id;
      console.log(this.dialogTableVisible);
      // this.dialogTableVisible = true;
    },
    handleEdit(index, id) {
      console.log(index, id);
      this.dialogTableVisible2 = true;
      this.thisId = id;
      console.log(this.dialogTableVisible2);
    },
    handleSelectTime(val) {
      console.log(val);
    },
    handleEditInformation1(val) {
      console.log(val);
      if (this.isDisabled === true) {
        this.isDisabled = !this.isDisabled;
        this.editIcon = 'none';
        this.saveIcon = 'inline-block';
      }
    },
    handleEditInformation2(val) {
      console.log(val);
      if (this.isDisabled === false) {
        this.isDisabled = !this.isDisabled;
        this.editIcon = 'inline-block';
        this.saveIcon = 'none';
      }
    },
    showWarningMessage(val) {
      this.$message({
        showClose: true,
        message: '警告哦，' + val + '数据范围有误，请重新输入',
        type: 'warning',
        duration: 5000
      })
    },
    getData() {
      getDeviceStatus().then(res => {
        this.statusList = res.data
      }),
        getDeviceInfo().then(res => {
          this.infoList = res.data
        }),
        getDeviceData().then(res => {
          this.dataList = res.data
        })
    }
  },
  created() {
    //this.getData()
  }

}
</script>

<style rel="stylesheet/scss" lang="scss">
.clear {
  clear: both;
}



.data-container {
  padding: 30px 50px;
  width: 100%;

  .title {
    font-size: 24px;
  }

  .filter-title {
    margin-top: 40px;
    width: 100%;
  }
  .tagsTitle {
    font-size: 16px;
    margin-right: 15px;
    margin-top: 23px;
    float: left;
  }
  .tags {
    width: 60%;
    float: left;
    margin-top: 20px;
    .tag {
      margin-top: 5px;
      margin-right: 10px;
    }
  }
  .tags-others {
    width: 30%;
    float: right;
    text-align: right;
  }
  .searchDevice {
    position: absolute;
    top: 90px;
    width: 250px;
    z-index: 10;
    right: 50px;
  }

  .filtersTabs {
    margin-top: 10px;

    .kg-tab {
      width: 100%;
      height: 180px;
      text-align: center;
      margin: 10px auto;
      input[type="button"],
       ::-webkit-file-upload-button,
      button {
        align-items: flex-start;
        text-align: center;
        cursor: default;
        border-width: 0;
        border-style: none;
        border-color: rgba(0, 0, 0, 0);
        background-color: rgba(0, 0, 0, 0);
      }

      button::-moz-focus-inner {
        border-width: 0;
        border-style: none;
        border-color: rgba(0, 0, 0, 0);
      }

      .kg-button {
        width: 150px;
        height: 160px;
        display: inline-block;
        margin-top: 5px;
        margin-right: 10px;
        &:hover {
          cursor: pointer;
        }
        &:active {
          border: 2px solid #20a0ff;
          border-radius: 4px;
          box-sizing: border-box;
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
        }
        &:focus {
          border: none;
        }
        img {
          width: 120px;
        }
      }
    }

    .data-tab {
      width: 100%;
      .data-left {
        width: 95%;
        margin-left: 1%;
        float: left;
        .dataItem {
          float: left;
          width: 190px;
          margin-top: 10px;
          margin-bottom: 0px;
          span {
            font-size: 12px;
            width: 30px;
            display: inline-block;
          }
          .el-input {
            width: 60px;
            height: 20px;
            .el-input__inner {
              height: 20px;
              font-size: 12px;
            }
          }
        }
      }
      .data-save {
        position: absolute;
        bottom: 15px;
        right: 30px;
      }
    }

    .status-tab {
      width: 100%;
      margin: 20px auto;
      .status-tab-left {
        width: 45%;
        float: left;
        text-align: right;
      }
      .status-tab-right {
        width: 45%;
        float: right;
        text-align: left;
      }
    }

    .location-tab {
      width: 100%;
      margin: 20px auto;
      text-align: center;
    }

    .group-tab {
      width: 96%;
      margin: 20px auto;
      text-align: center;
    }

    .series-tab {
      width: 100%;
      margin: 10px auto;
      text-align: center;
      .el-input {
        width: 200px;
      }
      .series-example {
        margin-top: 10px;
        span {
          color: #8391a5
        }
      }
      .series-save {
        position: absolute;
        bottom: 15px;
        right: 30px;
      }
    }

    .time-tab {
      width: 100%;
      margin: 20px auto;
      text-align: center;
      .timerange-save {
        position: absolute;
        bottom: 15px;
        right: 30px;
      }
    }
  }

  .table-row {
    margin-top: 50px;
  }

  .deviceTables {
    margin-top: 100px;
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
}

.pagination {
  margin: 50px auto;
  text-align: center;
}

#detailDialog .el-dialog {
  z-index: 9999;
  width: 80%;
  margin-top: -5%;
  margin-bottom: 5%;

  .el-dialog__header {
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 50px;
  }
  .el-dialog__title {
    line-height: 1;
    font-size: 28px;
    font-weight: 500;
    color: #1f2d3d;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .el-dialog__body {
    border-top: 2px solid #d1dbe5;
    width: 95%;
    margin: 0 auto;
    padding-top: 10px;
  }

  .el-card {
    margin-top: 20px;
  }

  .card-header {
    font-size: 18px;
    padding-bottom: 20px;
    border-bottom: 1px solid #d1dbe5;

    .el-button.el-button--text {
      float: right;
      &:hover {
        cursor: pointer;
      }
    }
  }

  .card-body {
    height: 300px;
    margin-top: 20px;

    .devSummary {
      .statusCircle {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        float: left;
      }
      .statusText {
        float: left;
        margin-left: 10px;
      }
      .devTime {
        float: right;
      }
    }

    .devData {
      margin-top: 20px;
      text-align: center;
      .thisPm25 {
        font-size: 60px;
        font-weight: bold;
      }
      span:first-child,
      span:last-child {
        font-size: 16px;
        font-weight: 400;
      }
    }

    .devCO2,
    .devCho,
    .devTemp,
    .devWet {
      height: 30px;
      line-height: 30px;
      margin: 10px auto;
    }
    .devCho {
      margin-top: 50px;
    }
    .dataName {
      font-size: 18px;
      margin-left: 10%;
      float: left;
    }
    .dataNum {
      width: 48%;
      height: 10px;
      background-color: rgba(0, 153, 255, 0.2);
      border-radius: 5px;
      float: left;
      margin-left: 8%;
      margin-top: 10px;
      position: relative;
      z-index: 10;

      .choData,
      .co2Data,
      .tempData,
      .wetData {
        z-index: 999;
        height: 10px;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 5px;
      }
    }
    .dataUnit {
      font-size: 16px;
      margin-left: 5%;
    }
  }

  .information {
    .informationItem {
      width: 90%;
      margin: 10px 0 0 10%;
      height: 30px;
      line-height: 30px;
      div {
        float: left;
      }
      img {
        width: 20px;
        height: 20px;
        margin-top: 5px;
      }
      .informationItemName {
        width: 30%;
        font-size: 18px;
        margin-left: 5%;
      }
      .informationItemData {
        color: rgb(153, 153, 153);
        font-size: 18px;
      }
    }
  }

  .newWind {
    height: 190px;

    .left {
      width: 15%;
      height: 80%;
      float: left;
      border-right: 1px solid #d1dbe5;
      margin-bottom: 2px;
      img {
        width: 80%;
        height: 150px;
      }
    }
    .right {
      width: 85%;
      float: left;

      .rightUp {
        width: 100%;
        height: 80px;
        border-bottom: 1px solid #d1dbe5;

        .statusCircle {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          float: left;
        }
        .statusText {
          float: left;
          margin-left: 10px;
        }

        .newWindItem {
          height: 50px;
          text-align: center;
          font-size: 18px;
          float: left;
        }
        .newWindStatusName {
          margin-top: 10px;
        }
        .newWindStatusData {
          text-align: center;
          margin-top: 8px;
          color: rgb(153, 153, 153);
        }
        .thisNewWindOpen {
          width: 12%;
        }
        .thisNewWindStatus {
          width: 12%;
        }
        .thisNewWindWindSpeed {
          width: 12%;
        }
        .thisNewWindGear {
          width: 12%;
        }
        .thisNewWindCircle {
          width: 12%;
        }
        .thisNewWindHit {
          width: 12%;
        }
        .thisNewWindOrdertime {
          width: 15%;
        }
      }

      .rightDown {
        width: 100%;

        .newWindItem {
          height: 50px;
          text-align: center;
          font-size: 18px;
          float: left;
        }
        .newWindStatusName {
          margin-top: 15px;
        }
        .newWindStatusData {
          text-align: center;
          margin-top: 8px;
          color: rgb(153, 153, 153);
        }
        .thisNewWindfirst,
        .thisNewWindsecond,
        .thisNewWindthird {
          width: 12%;
        }
      }
    }
  }

  .history {
    .historyTitle {
      font-size: 18px;
      padding-bottom: 20px;
      border-bottom: 1px solid #d1dbe5;

      .el-icon-upload2 {
        margin-left: 8px;
        &:hover {
          cursor: pointer;
        }
      }
    }

    .components-container {
      margin: 30px auto;
      height: 400px;
      position: relative;
      background-color: rgba(242, 242, 242, 1);

      .chart-container {
        position: relative;
        width: 80%;
        height: 100%;
        float: left;
      }
      .chooseDataType {
        position: relative;
        width: 20%;
        height: 100%;
        float: left;
        text-align: center;
        color: rgb(153, 153, 153);
        div:first-child {
          font-size: 22px;
          padding-top: 5%;
          padding-bottom: 5%;
        }

        .el-button {
          margin-top: 8%;
          width: 70%;

          img {
            margin-left: 5%;
            width: 50%;
          }
        }
      }
    }
  }
}

#operateDialog .el-dialog {
  width: 800px;
  margin-bottom: 5%;
  margin-top: -5%;
  .el-dialog__header {
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 50px;
  }
  .el-dialog__title {
    line-height: 1;
    font-size: 28px;
    font-weight: 500;
    color: #1f2d3d;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .el-dialog__body {
    border-top: 2px solid #d1dbe5;
    width: 95%;
    margin: 0 auto;
    padding-top: 10px;
  }
  .operateItem {
    height: 70px;
    line-height: 70px;
    width: 100%;
    margin-top: 20px;
    .operateName {
      font-size: 18px;
      color: rgb(153, 153, 153);
      float: left;
      width: 100px;
    }
    .operateSettings1 {
      float: left;
      width: 60%;
      line-height: 20px;
      margin-left: 10%;

      .settingsItem {
        width: 20%;
        float: left;
        border: 2px solid rgba(204, 153, 0, 1);
        border-radius: 5px;
        text-align: center;
        margin-left: 5%;
        padding-bottom: 15px;
      }
    }
    .operateSettings {
      width: 60%;
      float: left;
      margin-left: 10%;

      .el-radio-group {
        width: 100%;
        .el-radio {
          padding-left: 5%;
        }
      }
      .el-date-editor {
        margin-left: 5%;
      }
      .el-input {
        width: 50%;
        margin-left: 5%;
      }
    }
  }

  .operateItem3 {
    width: 100%;
    margin-top: 20px;
    .operateName3 {
      font-size: 18px;
      color: rgb(153, 153, 153);
      float: left;
      width: 10%;
    }
    .operateSettings3 {
      width: 60%;
      float: left;
      margin-left: 100px;
      .el-date-editor {
        width: 50%;
        margin-left: 5%;
      }
    }
  }

  .operateItem5 {
    width: 100%;
    margin-top: 20px;
    .operateName5 {
      font-size: 18px;
      color: rgb(153, 153, 153);
      float: left;
      width: 10%;
    }
    .operateSettings5 {
      width: 60%;
      float: left;
      margin-left: 100px;
      .el-select {
        width: 50%;
        margin-left: 5%;
      } // .el-input {
      //   width: 100%;
      //   margin-left: 10%;
      // }
      .el-select-dropdown {
        margin-top: -20px;
      }
    }
  }
}
</style>