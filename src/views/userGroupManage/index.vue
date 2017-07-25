<template>
  <div class="data-container">
  
    <div class="title">
      设备 / 设备分组管理
    </div>
  
    <div class="buttons">
      <el-button type="primary" size="large" @click="addNewGroup">新建分组</el-button>
    </div>
  
    <el-card class="box-card">
      <el-collapse v-model="activeNames" @change="handleChange" accordion>
        <el-collapse-item name="1">
          <template slot="title">
            汉王大厦
            <i class="header-icon el-icon-delete define" @click.stop="handleDelete"></i>
            <i class="header-icon el-icon-plus define" @click.stop="handleAdd"></i>
            <i class="header-icon el-icon-edit define" @click.stop="handleEdit"></i>
          </template>
          <el-collapse v-model="activesNames1" accordion>
            <el-collapse-item name="1-1">
              <template slot="title">
                <icon name="users" class="icon2"></icon>
                &nbsp;&nbsp;&nbsp;用户组一
                <i class="header-icon el-icon-delete define" @click.stop="handleDelete"></i>
                <i class="header-icon el-icon-plus define" @click.stop="handleAdd"></i>
                <i class="header-icon el-icon-edit define" @click.stop="handleEdit"></i>
              </template>
              <div v-for="item in groupItem" :key="item" class="text item">
                <icon name="user" class="icon2" style="margin-left:30px;"></icon>
                <span style="margin-left:30px;">{{item.name}}</span>
                <span style="margin-left:30px;">{{item.group}}</span>
                <span style="margin-left:30px;">设备数量： {{item.count}}</span>
                <span style="margin-left:60px;">备注： {{item.note}}</span>
                <i class="header-icon el-icon-delete define1" @click.stop="handleDeleteItem(item.id)"></i>
              </div>
              <div class="clear"></div>
            </el-collapse-item>
            <el-collapse-item name="1-2">
              <template slot="title">
                <icon name="users" class="icon2"></icon>
                &nbsp;&nbsp;&nbsp;用户组二
                <i class="header-icon el-icon-delete define" @click.stop="handleDelete"></i>
                <i class="header-icon el-icon-plus define" @click.stop="handleAdd"></i>
                <i class="header-icon el-icon-edit define" @click.stop="handleEdit"></i>
              </template>
              <div v-for="item in groupItem" :key="item" class="text item">
                <icon name="user" class="icon2" style="margin-left:30px;"></icon>
                <span style="margin-left:30px;">{{item.name}}</span>
                <span style="margin-left:30px;">{{item.group}}</span>
                <span style="margin-left:30px;">设备数量： {{item.count}}</span>
                <span style="margin-left:60px;">备注： {{item.note}}</span>
                <i class="header-icon el-icon-delete define1" @click.stop="handleDeleteItem(item.id)"></i>
              </div>
              <div class="clear"></div>
            </el-collapse-item>
            <el-collapse-item name="1-3">
              <template slot="title">
                <icon name="users" class="icon2"></icon>
                &nbsp;&nbsp;&nbsp;用户组三
                <i class="header-icon el-icon-delete define" @click.stop="handleDelete"></i>
                <i class="header-icon el-icon-plus define" @click.stop="handleAdd"></i>
                <i class="header-icon el-icon-edit define" @click.stop="handleEdit"></i>
              </template>
              <div v-for="item in groupItem" :key="item" class="text item">
                <icon name="user" class="icon2" style="margin-left:30px;"></icon>
                <span style="margin-left:30px;">{{item.name}}</span>
                <span style="margin-left:30px;">{{item.group}}</span>
                <span style="margin-left:30px;">设备数量： {{item.count}}</span>
                <span style="margin-left:60px;">备注： {{item.note}}</span>
                <i class="header-icon el-icon-delete define1" @click.stop="handleDeleteItem(item.id)"></i>
              </div>
              <div class="clear"></div>
            </el-collapse-item>
          </el-collapse>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            汉王大厦
            <i class="header-icon el-icon-delete define" @click.stop="handleDelete"></i>
            <i class="header-icon el-icon-plus define" @click.stop="handleAdd"></i>
            <i class="header-icon el-icon-edit define" @click.stop="handleEdit"></i>
          </template>
          <div v-for="item in groupItem" :key="item" class="text item">
            <img src="../../assets/deviceManage/id.png">
            <span style="margin-left:30px;">{{item.id}}</span>
            <span style="margin-left:30px;">{{item.name}}</span>
            <img v-if="item.status===1" style="margin-left:30px;" src="../../assets/deviceManage/online.png" class="statusIcon">
            <img v-else style="margin-left:30px;" src="../../assets/deviceManage/offline.png" class="statusIcon">
            <span style="margin-left:10px;">{{item.status===1?'运行中':'关闭'}}</span>
            <i class="header-icon el-icon-delete define1" @click.stop="handleDeleteItem(item.id)"></i>
            <i class="header-icon el-icon-edit define1" @click.stop="handleEditItem(item.id)"></i>
          </div>
          <div class="clear"></div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            汉王大厦
            <i class="header-icon el-icon-delete define" @click.stop="handleDelete"></i>
            <i class="header-icon el-icon-plus define" @click.stop="handleAdd"></i>
            <i class="header-icon el-icon-edit define" @click.stop="handleEdit"></i>
          </template>
          <div v-for="item in groupItem" :key="item" class="text item">
            <img src="../../assets/deviceManage/id.png">
            <span style="margin-left:30px;">{{item.id}}</span>
            <span style="margin-left:30px;">{{item.name}}</span>
            <img v-if="item.status===1" style="margin-left:30px;" src="../../assets/deviceManage/online.png" class="statusIcon">
            <img v-else style="margin-left:30px;" src="../../assets/deviceManage/offline.png" class="statusIcon">
            <span style="margin-left:10px;">{{item.status===1?'运行中':'关闭'}}</span>
            <i class="header-icon el-icon-delete define1" @click.stop="handleDeleteItem(item.id)"></i>
            <i class="header-icon el-icon-edit define1" @click.stop="handleEditItem(item.id)"></i>
          </div>
          <div class="clear"></div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            汉王大厦
            <i class="header-icon el-icon-delete define" @click.stop="handleDelete"></i>
            <i class="header-icon el-icon-plus define" @click.stop="handleAdd"></i>
            <i class="header-icon el-icon-edit define" @click.stop="handleEdit"></i>
          </template>
          <div v-for="item in groupItem" :key="item" class="text item">
            <img src="../../assets/deviceManage/id.png">
            <span style="margin-left:30px;">{{item.id}}</span>
            <span style="margin-left:30px;">{{item.name}}</span>
            <img v-if="item.status===1" style="margin-left:30px;" src="../../assets/deviceManage/online.png" class="statusIcon">
            <img v-else style="margin-left:30px;" src="../../assets/deviceManage/offline.png" class="statusIcon">
            <span style="margin-left:10px;">{{item.status===1?'运行中':'关闭'}}</span>
            <i class="header-icon el-icon-delete define1" @click.stop="handleDeleteItem(item.id)"></i>
            <i class="header-icon el-icon-edit define1" @click.stop="handleEditItem(item.id)"></i>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  
    <el-dialog id="addNewGroupDialog" title="新建分组" v-model="addNewGroupDialogVisible">
      <el-form :model="newGroupForm" :rules="rules" ref="newGroupForm" label-width="100px">
        <el-form-item label="分组名称" prop="name">
          <el-input v-model="newGroupForm.name"></el-input>
        </el-form-item>
        <el-form-item label="添加人员">
          <el-select v-model="newGroupForm.user" placeholder="请选择人员">
            <el-option v-for="item in allUserList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" style="float:right;">添加</el-button>
        </el-form-item>
        <el-form-item label="人员列表">
          <el-table :data="newGroupForm.userList" style="width: 100%" height="200">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="name" label="用户名称" width="120">
            </el-table-column>
          <el-table-column prop="company" label="公司名称" width="120">
            </el-table-column>
            <el-table-column label="更多" align="center" min-width="150">
              <template scope="scope">
                <el-button type="primary" icon="delete" size="small" @click="handleNewDeviceListItem(scope.$index, scope.row.Id)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
  
      <div slot="footer" class="dialog-footer">
        <el-button @click="addNewGroupDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewGroupDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    addNewGroupDialogVisible: false,
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
    newGroupForm: {
      name: '',
      user: '',
      userList: [{
        name: '张三',
        company: '汉王蓝天'
      }, {
        name: '李四',
        company: '汉王蓝天'
      }, {
        name: '老王',
        company: '汉王蓝天'
      }, {
        name: '张三1',
        company: '汉王蓝天'
      }, {
        name: '李四1',
        company: '汉王蓝天'
      }, {
        name: '老王1',
        company: '汉王蓝天'
      }]
    },
    allUserList: [{
      value: '张三',
      label: '张三'
    }, {
      value: '李四',
      label: '李四'
    }, {
      value: '老王',
      label: '老王'
    }],
    activeNames: [],
    groupItem: [{
      name: '李大洋',
      group: '汉王蓝天',
      count: 10,
      note: ''
    }, {
      name: '大洋李',
      group: '汉王蓝天',
      count: 10,
      note: '哈哈哈'
    }],
    rules: {
      name: [{ required: true, message: '请输入分组名称', trigger: 'blur' }]
    }
  }),
  components: {},
  methods: {
    addNewGroup() {
      this.addNewGroupDialogVisible = true;
    },
    handleChange() {
      console.log(this.activeNames);
    },
    handleEdit() {
      alert('edit');
    },
    handleAdd() {
      alert('add');
    },
    handleDelete() {
      alert('delete');
    },
    handleEditItem(id) {
      alert('editItem' + id);
    },
    handleDeleteItem(id) {
      alert('deleteItem' + id);
    },
    handleNewDeviceListItem(index, id) {
      alert('index' + '  id');
    }
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

  .buttons {
    margin-top: 30px;
    .el-button {
      width: 150px;
    }
  }

  .box-card {
    width: 80%;
    margin: 50px auto;

    .define {
      float: right;
      line-height: 43px;
      margin-left: 8px;
      padding-right: 18px;
    }
    .text.item {
      height: 30px;
      line-height: 30px;
      margin-top: 5px;
      border: 1px solid #d1dbe5;
      img {
        width: 20px;
        vertical-align: middle;
        margin-left: 10px;
      }
      .statusIcon {
        width: 11px;
        height: 11px;
        vertical-align: middle;
      }
      .define1 {
        float: right;
        line-height: 30px;
        margin-left: 8px;
        padding-right: 18px;
        &:hover {
          cursor: pointer
        }
      }
    }
  }

  #addNewGroupDialog .el-dialog {
    width: 45%;
    margin: auto;

    .el-dialog__header {
      padding-top: 20px;
      padding-bottom: 20px;
      padding-left: 20px;
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

      .el-form {
        margin-top: 20px;
      }
    }
  }
}
</style>
