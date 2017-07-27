<template>
  <div class="data-container">
  
    <div class="title">
      用户 / 用户管理
    </div>
  
    <!--<el-button class="addNewUser" type="primary" size="large" @click="handleAddUser">新建用户</el-button>-->
  
    <el-input class='searchUser' placeholder="搜索用户" icon="search" v-model="UserSearch" :on-icon-click="handleIconClick">
    </el-input>
  
    <el-table ref="multipleTable" :data="userList" border tooltip-effect="dark" style="width: 100%" stripe>
      <el-table-column type="index" width="60" align="center">
      </el-table-column>
      <el-table-column sortable prop="group" label="群组" width="150" align="center">
      </el-table-column>
      <el-table-column sortable prop="userName" label="用户名" width="120" align="center">
      </el-table-column>
      <el-table-column sortable prop="companyName" label="公司名称" width="180" align="center">
      </el-table-column>
      <el-table-column sortable prop="tel" label="手机号" width="150" align="center">
      </el-table-column>
      <el-table-column sortable prop="deviceCount" label="设备数量" width="120" align="center">
      </el-table-column>
      <el-table-column sortable prop="lastTime" label="最新上线时间" width="150" align="center">
      </el-table-column>
      <el-table-column prop="note" label="备注" width="100" align="center">
      </el-table-column>
      <el-table-column label="更多" align="center" min-width="100">
        <template scope="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row.deviceId)">操作</el-button>
        </template>
      </el-table-column>
    </el-table>
  
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalItems">
      </el-pagination>
    </div>
  
    <el-dialog id="addUserDialog" title="新建用户" v-model="dialogTableVisible1">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelData">
        <el-form-item label="群组">
          <el-input v-model="formLabelData.group"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="formLabelData.userName"></el-input>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input v-model="formLabelData.type"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="formLabelData.type"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formLabelData.type"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible1 = false">确 定</el-button>
      </div>
    </el-dialog>
  
    <el-dialog id="operateDialog" title="编辑用户信息" v-model="dialogTableVisible2">
      <el-form :model="editUserForm" :rules="editUserRules" ref="editUserForm" label-width="100px" class="">
        <el-form-item label="群组" prop="group">
          <el-select v-model="editUserForm.group" placeholder="请选择分组">
            <el-option v-for="item in groups" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="editUserForm.name"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="company">
          <el-input v-model="editUserForm.company"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="tel">
          <el-input v-model="editUserForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="设备数量" prop="count">
          <el-input v-model="editUserForm.count" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="最近上线时间" prop="lastTime">
          <el-input v-model="editUserForm.lastTime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input type="textarea" v-model="editUserForm.note"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editUserForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserData } from '../../api/userManage'
export default {
  data: () => ({
    UserSearch: '',
    currentPage: 1,
    totalItems: 100,
    userList: [],
    labelPosition: 'left',
    formLabelData: {
      group: '',
      userName: '',
      name: '',
      region: '',
      type: ''
    },
    dialogTableVisible1: false,
    dialogTableVisible2: false,
    editUserForm: {
      group: '',
      name: '张全蛋',
      company: '北京汉王蓝天科技有限公司',
      tel: '13521347060',
      email: 'dayanglee2015@163.com',
      count: '10',
      lastTime: '2017-06-27 11:50:59',
      note: ''
    },
    groups: [{
      value: 'group1',
      label: '分组一'
    }, {
      value: 'group2',
      label: '分组二'
    }, {
      value: 'group3',
      label: '分组三'
    }, {
      value: 'group4',
      label: '分组四'
    }],
    editUserRules: {
      // group: [
      //   { required: true, message: '请选择分组', trigger: 'blur' }
      // ],
      name: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
      ],
      tel: [
        { length: 11, message: '请输入正确的手机号码', trigger: 'blur' }
      ],
      email: [
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
      ]
    }
  }),
  methods: {
    handleAddUser() {
      this.dialogTableVisible1 = true;
    },
    handleIconClick(ev) {
      console.log(ev);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleEdit(index, id) {
      console.log(index, id);
      this.dialogTableVisible2 = true;
      this.thisId = id;
      console.log(this.dialogTableVisible2);
    },
    submitForm(formName) {
      alert('submit   ' + formName + '  !');
      this.dialogTableVisible2 = false;
    },
    getData() {
      getUserData().then(res => {
        this.userList = res.data
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
  .addNewUser {
    position: absolute;
    top: 160px;
    width: 10%;
  }
  .el-input.searchUser {
    position: absolute;
    top: 160px;
    right: 50px;
    width: 15%;
    z-index: 10;
  }

  .el-table {
    margin-top: 120px;
  }
  .pagination {
    margin: 50px auto;
    text-align: center;
  }

  #addUserDialog,
  #operateDialog .el-dialog {
    width: 35%;
    margin: auto;

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

      .el-form {
        margin-top: 20px;
      }
    }
  }
}
</style>
