<template>
  <div class="data-container">
  
    <div class="title">
      设备 / 设备管理
    </div>
  
    <span class="tagsTitle">已选条件</span>
    <el-tag class="tags" v-for="tag in tags" :key="tag.name" :closable="true" :type="tag.type" @close="handleClose(tag)">
      {{tag.name}}
    </el-tag>
  
    <div class="filters">
      <div class="filterItem">
        <span class="filterItem-title">设备类型</span>
        <el-checkbox-group class="filterItem-content" v-model="filterDeviceType" size="small">
          <el-checkbox-button v-for="item in deviceTypeList" :label="item" :key="item">{{item}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
  
      <div class="filterItem">
        <span class="filterItem-title">数据</span>
        <div class="filterItem-content">
          <p class="dataItem" id="dataItem1">
            <span>PM2.5</span>
            <el-input @focus="inputFocus" @blur="inputBlur"></el-input> -
            <el-input @focus="inputFocus" @blur="inputBlur"></el-input>
            <el-button type="success" size="small" v-show="focus0">确定</el-button>
          </p>
          <p class="dataItem" id="dataItem2">
            <span>温度</span>
            <el-input @focus="inputFocus" @blur="inputBlur"></el-input> -
            <el-input @focus="inputFocus" @blur="inputBlur"></el-input>
            <el-button type="success" size="small" v-show="focus[1]">确定</el-button>
          </p>
          <p class="dataItem" id="dataItem3">
            <span>湿度</span>
            <el-input @focus="inputFocus" @blur="inputBlur"></el-input> -
            <el-input @focus="inputFocus" @blur="inputBlur"></el-input>
            <el-button type="success" size="small" v-show="focus3">确定</el-button>
          </p>
          <p class="dataItem" id="dataItem4">
            <span>CO2</span>
            <el-input @focus="inputFocus" @blur="inputBlur"></el-input> -
            <el-input @focus="inputFocus" @blur="inputBlur"></el-input>
            <el-button type="success" size="small" v-show="focus4">确定</el-button>
          </p>
          <p class="dataItem" id="dataItem5">
            <span>甲醛</span>
            <el-input @focus="inputFocus" @blur="inputBlur"></el-input> -
            <el-input @focus="inputFocus" @blur="inputBlur"></el-input>
            <el-button type="success" size="small" v-show="focus5">确定</el-button>
          </p>
          <p class="dataItem" id="dataItem6">
            <span>TVOC</span>
            <el-input @focus="inputFocus" @blur="inputBlur"></el-input> -
            <el-input @focus="inputFocus" @blur="inputBlur"></el-input>
            <el-button type="success" size="small" v-show="focus6">确定</el-button>
          </p>
          <p class="dataItem" id="dataItem7">
            <span>臭氧</span>
            <el-input @focus="inputFocus" @blur="inputBlur"></el-input> -
            <el-input @focus="inputFocus" @blur="inputBlur"></el-input>
            <el-button type="success" size="small" v-show="focus7">确定</el-button>
          </p>
          <p class="dataItem" id="dataItem8">
            <span>氧气</span>
            <el-input @focus="inputFocus" @blur="inputBlur"></el-input> -
            <el-input @focus="inputFocus" @blur="inputBlur"></el-input>
            <el-button type="success" size="small" v-show="focus8">确定</el-button>
          </p>
        </div>
      </div>
  
      <div class="filterItem">
        <span class="filterItem-title">状态</span>
        <el-checkbox-group class="filterItem-content" v-model="filterDeviceStatus" size="small">
          <el-checkbox-button v-for="item in deviceStatusList" :label="item" :key="item">{{item}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
  
      <div class="filterItem">
        <span class="filterItem-title">位置</span>
        <el-cascader class="filterItem-content" :options="chinaArea" v-model="filterLocation" @change="filterLocationMethod">
        </el-cascader>
      </div>
  
      <div class="filterItem">
        <span class="filterItem-title">分组</span>
        <el-select class="filterItem-content" v-model="filterGroupList" filterable multiple placeholder="请选择">
          <el-option v-for="item in groupList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
  
      <div class="filterItem filterItem6">
        <span class="filterItem-title">序列号区间</span>
        <div class="filterItem-content">
          <el-input></el-input> -
          <el-input></el-input>
        </div>
      </div>
  
      <div class="filterItem">
        <span class="filterItem-title">在线时间</span>
        <div class="filterItem-content">
          <el-date-picker v-model="filterTimeRange" type="datetimerange" placeholder="选择时间范围">
          </el-date-picker>
        </div>
      </div>
  
    </div>
  
    <el-input class='searchDevice' placeholder="搜索设备" icon="search" v-model="deviceIdSearch" :on-icon-click="handleIconClick">
    </el-input>
  
    <el-tabs v-model="deviceManageTabs" type="card" @tab-click="handleClick">
  
      <el-tab-pane label="设备状态" name="first">
  
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="10">
            <div class="block">
              <span class="wrapper">
                <el-button :plain="true" type="info" size="small">批量操作</el-button>
                <el-button :plain="true" type="info" size="small">打开</el-button>
                <el-button :plain="true" type="info" size="small">关闭</el-button>
                <el-button :plain="true" type="info" size="small">更多操作</el-button>
              </span>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8">
            <el-checkbox-group v-model="checkList" class="block" @change="handleCheckList">
              <el-checkbox label="全部"></el-checkbox>
              <el-checkbox label="运行中"></el-checkbox>
              <el-checkbox label="关机"></el-checkbox>
              <el-checkbox label="异常"></el-checkbox>
            </el-checkbox-group>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6">
            <div class="block">
              共{{deviceCount}}个设备，{{onlineCount}}个正在运行
            </div>
          </el-col>
        </el-row>
  
        <el-table ref="multipleTable" :data="statusList" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" stripe>
          <el-table-column type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column type="index" width="60" align="center">
          </el-table-column>
          <el-table-column prop="deviceName" label="设备名称" width="170" align="center">
          </el-table-column>
          <el-table-column prop="deviceId" label="设备ID" width="150" align="center">
          </el-table-column>
          <!-- <el-table-column label="开关" width="80" align="center">
                                                                                                                                                            <template scope="scope">
                                                                                                                                                              <el-switch v-model="scope.row.open" on-color="#13ce66" off-color="#ff4949" on-text="" off-text="">
                                                                                                                                                              </el-switch>
                                                                                                                                                            </template>
                                                                                                                                                          </el-table-column> -->
          <el-table-column prop="status" label="运行状态" width="100" align="center">
            <template scope="scope">
              <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">{{scope.row.status===1?'运行中':'关闭'}}</el-tag>
            </template>
          </el-table-column>
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
            <!-- <template scope="scope">
                                                                                                                                                              <el-switch v-model="scope.row.hit" on-color="#13ce66" off-color="#ff4949" on-text="" off-text="">
                                                                                                                                                              </el-switch>
                                                                                                                                                            </template> -->
          </el-table-column>
          <el-table-column label="更多" align="center" min-width="150">
            <template scope="scope">
              <el-button type="success" size="small" @click="handleDetail(scope.$index, scope.row.deviceId)">详情</el-button>
              <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row.deviceId)">操作</el-button>
            </template>
          </el-table-column>
        </el-table>
  
      </el-tab-pane>
      <el-tab-pane label="设备信息" name="second">
        <div class="block" style="float:right;">
          共{{deviceCount}}个设备，{{onlineCount}}个正在运行
        </div>
        <div class="clear"></div>
  
        <el-table ref="multipleTable" :data="infoList" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" stripe>
          <el-table-column type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column type="index" width="60" align="center">
          </el-table-column>
          <el-table-column prop="deviceName" label="设备名称" width="160" align="center">
          </el-table-column>
          <el-table-column prop="deviceId" label="设备ID" width="160" align="center">
          </el-table-column>
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
          <el-table-column label="更多" align="center" min-width="150">
            <template scope="scope">
              <el-button type="success" size="small" @click="handleDetail(scope.$index, scope.row.deviceId)">详情</el-button>
              <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row.deviceId)">操作</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
  
      <el-tab-pane label="设备数据" name="third">
        <div class="block" style="float:right;">
          共{{deviceCount}}个设备，{{onlineCount}}个正在运行
        </div>
        <div class="clear"></div>
  
        <el-table ref="multipleTable" :data="dataList" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" stripe>
          <el-table-column type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column type="index" width="50" align="center">
          </el-table-column>
          <el-table-column prop="deviceName" label="设备名称" width="180" align="center">
          </el-table-column>
          <el-table-column prop="deviceId" label="设备ID" width="180" align="center">
          </el-table-column>
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
          <el-table-column label="更多" align="center" min-width="150">
            <template scope="scope">
              <el-button type="success" size="small" @click="handleDetail(scope.$index, scope.row.deviceId)">详情</el-button>
              <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row.deviceId)">操作</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  
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
                <!-- <div class='statusCircle' v-bind:style="{backgroundColor: thisDevData.status === 'true' ? '#13ce66' : '#ff4949'}"></div> -->
                <!-- <div class="statusText"> -->
                {{thisDevData.status === 'true' ? '运行中' : '关闭'}}
                <!-- </div> -->
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
import { regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
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
    tags: [
      { name: '标签一', type: '' },
      { name: '标签二', type: 'gray' },
      { name: '标签三', type: 'primary' },
      { name: '标签四', type: 'success' },
      { name: '标签五', type: 'warning' },
      { name: '标签六', type: 'danger' }
    ],
    deviceTypeList: deviceTypeList,
    filterDeviceType: [],
    deviceStatusList: ['开机', '关机'],
    filterDeviceStatus: [],
    chinaArea: regionDataPlus,
    filterLocation: [],
    groupList: groupList,
    filterGroupList: [],
    filterTimeRange: [new Date(2017, 7, 1, 10, 10), new Date(2017, 8, 1, 10, 10)],
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
    focus0: false
  }),
  components: {
    barChart
  },
  methods: {
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    filterLocationMethod(value) {
      console.log(value)
      console.log(CodeToText[this.filterLocation[0]])
      console.log(CodeToText[this.filterLocation[1]])
      console.log(CodeToText[this.filterLocation[2]])
    },
    inputFocus(e) {
      const index = parseInt(e.path[2].id.substr(e.path[2].id.length - 1)) - 1;
      console.log(index)
      //this.focus[index] = true
      //this.focus[0] = true
      this.focus0 = true
      console.log(this.focus[index])

    },
    inputBlur(e) {
      const index = parseInt(e.path[2].id.substr(e.path[2].id.length - 1)) - 1;
      console.log(index)
      //this.focus[index] = false
      //this.focus[0] = false
      this.focus0 = false
      console.log(this.focus[index])
      //this.focus[index] = false

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
    this.getData()
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

  .tagsTitle {
    font-size: 16px;
    margin-right: 5px;
  }
  .tags {
    margin-top: 20px;
    margin-right: 2px;
  }

  .filters {
    margin-top: 20px;

    .filterItem {
      height: 45px;
      height: auto;
      min-height: 45px;
      line-height: 45px;
      overflow: hidden;
      border &:after {
        visibility: hidden;
        display: block;
        font-size: 0;
        content: " ";
        clear: both;
        height: 0;
      }
      .filterItem-title {
        float: left;
        font-size: 14px;
        width: 80px;
        text-align: center;
      }
      .filterItem-content {
        margin-left: 80px;
        height: auto;
        height: 40px;
        min-height: 40px;
        .dataItem {
          float: left;
          width: 150px;
          margin-top: 0px;
          margin-bottom: 0px;
          span {
            font-size: 12px;
          }
          .el-input {
            width: 40px;
            height: 20px;
            .el-input__inner {
              height: 20px;
            }
          }
          .el-button {
            position: absolute;
            margin-left: 5px;
            margin-top: 12px;
            line-height: 8px;
            z-index: 99;
          }
        }
      }
      .el-cascader.filterItem-content {
        margin-left: 0px;
        .el-cascader__label {
          line-height: 45px;
        }
      }

      .el-select.filterItem-content {
        margin-left: 0px;
        .el-input {
          height: 30px;
          line-height: 30px;
          .el-input__inner {
            height: 30px;
          }
          .el-input__icon.el-icon-caret-top {
            top: 60%;
          }
        }
      }
    }

    .filterItem6 {
      .el-input {
        width: 224px;
      }
    }
  }

  .el-input.searchDevice {
    position: relative;
    top: 80px;
    left: 80%;
    width: 15%;
    z-index: 10;
  }

  .el-tabs {
    margin-top: 50px;
    .block {
      margin-top: 10px;
    }
    .el-table {
      margin-top: 30px;
    }
  }

  .pagination {
    margin: 50px auto;
    text-align: center;
  }

  #detailDialog .el-dialog {
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
}
</style>