<template>
  <div class="data-container">
  
    <div class="title">
      个人中心
    </div>
  
    <el-collapse accordion class="personalCollapse">
      <el-collapse-item>
        <template slot="title" class="info-title">
          <div class="unit">用户名</div>
          <div class="content">{{user.name}}</div>
          <div class="edit">编辑</div>
        </template>
        <div class="details">
          <el-form label-width="80px" :model="user">
            <el-form-item label="用户名">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="large" style="width:100px;" @click="cancelChangeUsername('user')">取消</el-button>
              <el-button type="primary" size="large" style="width:100px;float:right;" @click="submitInformationForm('user')">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
  
      <el-collapse-item>
        <template slot="title">
          <div class="unit">头像</div>
          <div class="content2">
            <img :src="image">
          </div>
          <div class="edit">编辑</div>
        </template>
        <div class="components-container details">
          <PanThumb :image='image'>
          </PanThumb>
          <el-button type="primary" icon="upload" style="position: absolute;bottom: 15px;margin-left: 40px;" @click="imagecropperShow=true">修改头像
          </el-button>
          <ImageCropper :width="300" :height="300" url="https://httpbin.org/post" @crop-upload-success="cropSuccess" :key="imagecropperKey" v-show="imagecropperShow"></ImageCropper>
        </div>
      </el-collapse-item>
  
      <el-collapse-item>
        <template slot="title" class="info-title">
          <div class="unit">昵称</div>
          <div class="content">{{user.nickname}}</div>
          <div class="edit">编辑</div>
        </template>
        <div class="details">
          <el-form label-width="80px" :model="user">
            <el-form-item label="昵称">
              <el-input v-model="user.nickname"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="large" style="width:100px;" @click="cancelChangeUsername('user')">取消</el-button>
              <el-button type="primary" size="large" style="width:100px;float:right;" @click="submitInformationForm('user')">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
  
      <el-collapse-item>
        <template slot="title" class="info-title">
          <div class="unit">邮箱</div>
          <div class="content">
            {{user.email}}&nbsp;&nbsp;&nbsp;&nbsp;
            <span v-if="user.emailVerified" style="color:green;">已验证</span>
            <span v-else style="color:red;">未验证</span>
          </div>
          <div class="edit">编辑</div>
        </template>
        <div class="details details4">
          <el-form :model="ruleForm3" :rules="rules1" ref="ruleForm3" label-width="80px">
            <el-form-item label="邮箱" prop="newEmail">
              <el-input v-model="user.newEmail"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width:100px;" :disabled="user.emailVerified">验证邮箱</el-button>
              <el-button type="primary" style="width:100px;float:right;">更换邮箱</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
  
      <el-collapse-item>
        <template slot="title" class="info-title">
          <div class="unit">手机</div>
          <div class="content">
            {{user.phone}}&nbsp;&nbsp;&nbsp;&nbsp;
            <span v-if="user.phoneVerified" style="color:green;">已验证</span>
            <span v-else style="color:red;">未验证</span>
          </div>
          <div class="edit">编辑</div>
        </template>
        <div class="details">
          <el-form :model="ruleForm3" :rules="rules1" ref="ruleForm3" label-width="80px">
            <el-form-item label="手机号" prop="newPhone">
              <el-input v-model="user.newPhone"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width:100px;" :disabled="user.phoneVerified">验证手机</el-button>
              <el-button type="primary" style="width:100px;float:right;">更换手机</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
  
      <el-collapse-item>
        <template slot="title" class="info-title">
          <div class="unit">密码</div>
          <div class="content">******</div>
          <div class="edit">编辑</div>
        </template>
        <div class="details">
          <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="ruleForm">
            <el-form-item label="当前密码" prop="password">
              <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input type="password" v-model="ruleForm2.newPassword" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword">
              <el-input type="password" v-model="ruleForm2.checkPassword" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="resetForm('ruleForm2')" style="width:90px;">重置</el-button>
              <el-button type="primary" @click="submitChangePasswordForm('ruleForm2')" style="width:90px;float:right;">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
  
  </div>
</template>

<script>
import ImageCropper from '../../components/ImageCropper'
import PanThumb from '../../components/PanThumb'
import Image from '../../assets/images/avater/1.jpg'
import { getCookie } from 'utils/auth'
export default {
  components: { ImageCropper, PanThumb },
  data() {
    var validatePhone = (rule, value, callback) => {
      console.log(value);
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else if (value.length === 11) {
        if (value === this.user.phone) {
          callback(new Error('当前手机号码未做更改'));
        } else {
          callback();
        }
      } else {
        callback(new Error('请输入正确的手机号'));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value === this.user.password) {
        if (this.ruleForm2.newPassword !== '') {
          this.$refs.ruleForm2.validateField('newPassword');
        }
        callback();
      } else {
        callback(new Error('当前密码错误'));
      }
    };
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 6) {
        callback(new Error('密码不能少于6位'));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      infoEdit: false,
      user: {
        name: '',
        nickname: '',
        imgUrl: '../../assets/images/avater/1.jpg',
        email: '',
        phone: '',
        password: ''
      },
      ruleForm1: {
        name: '',
        nickName: '',
        company: '',
        city: ''
      },
      ruleForm2: {
        password: '',
        newPassword: '',
        checkPassword: ''
      },
      ruleForm3: {
        newPhone: ''
      },
      imageUrl: '',
      fileList2: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      rules1: {
        newPhone: [
          { validator: validatePhone, trigger: 'blur' }
        ]
      },
      rules2: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        newPassword: [
          { validator: validatePass1, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      imagecropperShow: false,
      imagecropperKey: 0,
      image: Image
    }
  },
  methods: {
    handleEdit1() {
      console.log('h');
    },
    submitInformationForm(e) {
      console.log(e);
    },
    cancelChangeUsername(e) {
      console.log(e)
    },
    submitChangePasswordForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    cropSuccess(resData) {
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey + 1;
      this.image = resData.files.avatar;
    }
  },
  created() {
    this.user = JSON.parse(sessionStorage.getItem('userInfo'))
    console.log(getCookie('SESSION'))
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
  .avatar {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
  .el-collapse.personalCollapse {
    width: 100%;
    margin: 50px auto;
    font-weight: 400;
    color: #48576a;
    border: none;
    .el-collapse-item {
      border-top: 1px solid #dfe6ec;
    }
    .el-collapse-item__header {
      border: none;
      height: 90px;
      line-height: 90px;
    }
    .el-collapse-item__wrap {
      border: none;
    }
    .unit {
      width: 20%;
      float: left;
      text-align: left;
      font-size: 18px;
    }
    .content {
      width: 50%;
      float: left;
      text-align: left;
      font-size: 18px;
    }
    .edit {
      width: 20%;
      float: left;
      text-align: right;
      padding-right: 10px;
      font-size: 18px;
    }
    .details {
      width: 25%;
      min-width: 300px;
      margin-left: 15%;
      font-size: 18px;
      .el-form {
        padding-top: 20px;
        label {
          font-weight: 400;
        }
      }
      .el-button {
        margin-top: 20px;
      }
    }
    .content2 {
      width: 50%;
      float: left;
      text-align: left;
      font-size: 18px;
      height: 80px;
      img {
        width: 65px;
        margin-top: 15px;
        border-radius: 50%;
      }
    }
  }
}
</style>
