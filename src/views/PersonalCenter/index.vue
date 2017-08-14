<template>
  <div class="data-container">
  
    <div class="title">
      个人中心
    </div>
  
    <div class="username">
      <div class="unit">用户名</div>
      <div class="content">{{user.name}}</div>
    </div>
    <el-collapse accordion class="personalCollapse">
      <el-collapse-item>
        <template slot="title">
          <div class="unit">头像</div>
          <div class="content2">
            <img :src="image">
          </div>
          <div class="edit">编辑</div>
        </template>
        <div class="components-container details"> 
          <!-- <vue-core-image-upload :class="['btn', 'btn-primary']" :crop="true" @imageuploaded="imageuploaded" :max-file-size="5242880" url="http://app.hw99lt.com/user/upload/avater" >
          </vue-core-image-upload> -->
          <!-- <a class="btn" @click="toggleShow">设置头像</a>
	        <my-upload @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail" v-model="show" :width="300" :height="300" url="http://app.hw99lt.com/user/upload/avatar"></my-upload>
	        <img :src="imgDataUrl"> -->
          <PanThumb :image='image'>
          </PanThumb>
          <el-button type="primary" icon="upload" style="position: absolute;bottom: 15px;margin-left: 40px;" @click="imagecropperShow=true">修改头像
          </el-button>
          <ImageCropper :width="300" :height="300" url="http://app.hw99lt.com/user/upload/avatar" @crop-upload-success="cropSuccess" :key="imagecropperKey" v-show="imagecropperShow"></ImageCropper>
        </div>
      </el-collapse-item>
  
      <el-collapse-item>
        <template slot="title" class="info-title">
          <div class="unit">昵称</div>
          <div v-if="this.user.nickname" class="content">{{user.nickname}}</div>
          <div v-else class="content" style="color:blue;">未添加</div>
          <div class="edit">编辑</div>
        </template>
        <div class="details">
          <el-form label-width="80px" :model="user">
            <el-form-item label="昵称">
              <el-input v-model="newNickname"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="large" style="width:100px;" @click="cancelChange('nickname')">取消</el-button>
              <el-button type="primary" size="large" style="width:100px;float:right;" @click="changeNickname()">确定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
  
      <el-collapse-item>
        <template slot="title" class="info-title">
          <div class="unit">邮箱</div>
          <div class="content">
            <span v-if="user.email">{{user.email}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span v-else style="color:blue;">未添加</span>
            <span v-if="user.email&&user.emailVerified" style="color:green;">已验证</span>
            <span v-else-if="user.email&&!user.emailVerified" style="color:red;">未验证</span>
          </div>
          <div class="edit">编辑</div>
        </template>
        <div class="details details4">
          <el-form label-width="80px">
            <el-form-item label="验证码">
              <el-input v-model="verifyCode1"></el-input>
              <el-button class="verifyButton" @click.prevent="emailSendVerifyCode()">发送验证码</el-button>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="newEmail"></el-input>
            </el-form-item>
            <el-form-item>
              <p v-if="user.email">
                <el-button type="primary" style="width:100px;" :disabled="user.emailVerified" @click.prevent="verifyEmail">验证邮箱</el-button>
                <el-button type="primary" style="width:100px;float:right;" @click.prevent="changeEmail" :disabled="!user.emailVerified">更换邮箱</el-button>
              </p>
              <p v-else>
                <el-button size="large" style="width:100px;" @click="cancelChange('email')">取消</el-button>
                <el-button type="primary" size="large" style="width:100px;float:right;" @click.prevent="addEmail">添加</el-button>
              </p>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title" class="info-title">
          <div class="unit">手机</div>
          <div class="content">
            <span v-if="user.phone">{{user.phone}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span v-else style="color:blue;">未添加</span>
            <span v-if="user.phone&&user.phoneVerified" style="color:green;">已验证</span>
            <span v-else-if="user.phone&&!user.phoneVerified" style="color:red;">未验证</span>
          </div>
          <div class="edit">编辑</div>
        </template>
        <div class="details details4">
          <el-form label-width="80px">
            <el-form-item label="验证码">
              <el-input v-model="verifyCode2"></el-input>
              <el-button class="verifyButton" @click.prevent="phoneSendVerifyCode()">发送验证码</el-button>
            </el-form-item>
            <el-form-item label="手机">
              <el-input v-model="newPhone"></el-input>
            </el-form-item>
            <el-form-item>
              <p v-if="user.phone">
                <el-button type="primary" style="width:100px;" :disabled="user.phoneVerified" @click.prevent="verifyPhone">验证手机</el-button>
                <el-button type="primary" style="width:100px;float:right;" @click.prevent="changePhone" :disabled="!user.phoneVerified">更换手机</el-button>
              </p>
              <p v-else>
                <el-button size="large" style="width:100px;" @click="cancelChange('phone')">取消</el-button>
                <el-button type="primary" size="large" style="width:100px;float:right;" @click.prevent="addPhone">添加</el-button>
              </p>
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
        <div class="details details4">
          <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="ruleForm">
            <el-form-item label="验证码">
              <el-input v-model="verifyCode3"></el-input>
              <el-button class="verifyButton" @click.prevent="passwordSendVerifyCode()">发送验证码</el-button>
            </el-form-item>
            <el-form-item label="新密码">
              <el-input type="password" v-model="newPassword1" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input type="password" v-model="newPassword2" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="cancelChange('password')" style="width:90px;">取消</el-button>
              <el-button type="primary" @click="changePassWord()" style="width:90px;float:right;">确定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
  
    <el-dialog title="请选择验证码发送地址" :visible.sync="phoneOrEmail" style="text-align:center;margin-top:15%;">
      <el-button type="primary" size="large" @click.prevent="sendVerifyCodeToPhone">手机</el-button>
      <el-button type="primary" size="large" @click.prevent="sendVerifyCodeToEmail">邮箱</el-button>
    </el-dialog>
  </div>
</template>

<script>
import md5 from 'js-md5'
import ImageCropper from '../../components/ImageCropper'
import PanThumb from '../../components/PanThumb'
import Image from '../../assets/images/avater/1.jpg'
import VueCoreImageUpload from 'vue-core-image-upload'
import myUpload from 'vue-image-crop-upload'
import { isEmail, isPhone } from 'utils/validate'
import { userInfo, changeUserInfo, changeNickname, getVerifyCode, getEmailVerifyCode, getPhoneVerifyCode, checkVerifyCode, uniqueCheck } from 'api/acount'

export default {
  //components: { ImageCropper, PanThumb },
  //components: { 'vue-core-image-upload': VueCoreImageUpload },
  components: { 
    'my-upload': myUpload,
    'vue-core-image-upload': VueCoreImageUpload,
    ImageCropper, PanThumb
  },
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
      show: true,
			params: {
				token: '123456798',
				name: 'avatar'
			},
			headers: {
				smail: '*_~'
			},
			imgDataUrl: '', // the datebase64 url of created image
      phoneOrEmail: false,
      newNickname: null,
      newEmail: null,
      newPhone: null,
      newPassword1: '',
      newPassword2: '',
      verifyCode1: '',
      verifyCode2: '',
      verifyCode3: '',
      user: {},
      userInfo: {},
      ruleForm2: {
        password: '',
        newPassword: '',
        checkPassword: ''
      },
      imageUrl: '',
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
      image: Image,
      src: Image,
    }
  },
  methods: {
    toggleShow() {
				this.show = !this.show;
      },
      cropSuccess(imgDataUrl, field){
				console.log('-------- crop success --------');
				this.imgDataUrl = imgDataUrl;
      },
      cropUploadSuccess(jsonData, field){
				console.log('-------- upload success --------');
				console.log(jsonData);
				console.log('field: ' + field);
      },
      cropUploadFail(status, field){
				console.log('-------- upload fail --------');
				console.log(status);
				console.log('field: ' + field);
			},
    imageuploaded(res) {
      if (res.errcode == 0) {
        this.src = 'http://img1.vued.vanthink.cn/vued751d13a9cb5376b89cb6719e86f591f3.png';
      }
    },
    changeNickname() {
      this.userInfo.nickname = this.newNickname.trim()
      changeNickname(this.userInfo).then(res => {
        this.$message({
          message: '昵称修改成功！',
          type: 'success'
        });
        this.user = res.data
        this.userInfo = res.data
      })
    },
    emailSendVerifyCode(){
      if(this.user.email && !this.user.emailVerified){
        console.log('1')
        getEmailVerifyCode('email', this.user.email,this.userInfo).then(res => {
          this.$notify({
            title: '成功',
            message: '验证码已发送至' + this.user.email,
            type: 'success'
          });
        })
      } else if(this.user.phoneVerified && !this.user.emailVerified && !this.user.email) {
        console.log('2')
        getVerifyCode('phone', this.user.phone).then(res => {
          this.$notify({
            title: '成功',
            message: '验证码已发送至' + this.user.phone,
            type: 'success'
          });
        })
      } else if(this.user.phoneVerified && this.user.emailVerified){
        console.log('3')
        this.phoneOrEmail = true
      } else if(!this.user.phoneVerified && !this.user.emailVerified && !this.user.email){
        console.log('4')
        if (!isEmail(this.newEmail)) {
          this.$confirm('请输入正确的邮箱地址', '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              closeOnClickModal: true,
              type: 'warning'
            }).then(() => {}).catch(() => {});
        } else {           
          // 添加的新邮箱做唯一性校验
          uniqueCheck('email', this.newEmail).then(res => {
            this.$confirm('该邮箱已被别人使用', '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              closeOnClickModal: true,
              type: 'warning'
            }).then(() => {}).catch(() => {});
          }).catch(error => {
            getEmailVerifyCode('email', this.newEmail,this.userInfo).then(res => {
              this.$notify({
                title: '成功',
                message: '验证码已发送至' + this.newEmail,
                type: 'success'
              });
            })
          })
        }
      } else if(!this.user.phoneVerified && this.user.emailVerified){
        console.log('5')
        getEmailVerifyCode('email', this.user.email,this.userInfo).then(res => {
          this.$notify({
            title: '成功',
            message: '验证码已发送至' + this.user.email,
            type: 'success'
          });
        })
      }
    },
    addEmail(){
      let code = this.verifyCode1
      if(code.length !== 6 || code == null ){
        this.$confirm('验证码应为6位数字', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          closeOnClickModal: true,
          type: 'warning'
        }).then(() => {}).catch(() => {})
      } else if(!isEmail(this.newEmail)){
        this.$confirm('请输入正确的邮箱', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          closeOnClickModal: true,
          type: 'warning'
        }).then(() => {}).catch(() => {})
      } else {
        uniqueCheck('email', this.newEmail).then(res => {
            this.$confirm('该邮箱已被别人使用', '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              closeOnClickModal: true,
              type: 'warning'
            }).then(() => {}).catch(() => {});
          }).catch(error => {
            this.userInfo.email = this.newEmail.trim()
            changeUserInfo(this.userInfo, code).then(res => {
            this.$message({
              message: '邮箱添加成功！',
              type: 'success'
            })
            this.user = res.data
            this.userInfo = res.data
            this.verifyCode1 = ''
          }).catch(err=>{
            this.$confirm('添加失败，请重试!', '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              closeOnClickModal: true,
              type: 'error'
            }).then(() => {}).catch(() => {})
            delete this.userInfo.email
            this.user = this.userInfo
            this.verifyCode1 = ''
          })
        })
      }
    },
    verifyEmail(){
      let code = this.verifyCode1
      if(code.length !== 6 || code == null ){
        this.$confirm('验证码应为6位数字', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          closeOnClickModal: true,
          type: 'warning'
        }).then(() => {}).catch(() => {})
      } else if(this.newEmail !== this.user.email){
        this.$confirm('表单中邮箱与待验证的邮箱不符', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          closeOnClickModal: true,
          type: 'warning'
        }).then(() => {}).catch(() => {})
      } else {
        this.userInfo.email = this.newEmail.trim()
        changeUserInfo(this.userInfo, code).then(res => {
          this.$message({
            message: '邮箱验证成功！',
            type: 'success'
          })         
          this.user = res.data
          this.userInfo = res.data
          this.verifyCode1 = ''
        }).catch(err=>{
          this.$confirm('验证邮箱失败，请重试!', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            closeOnClickModal: true,
            type: 'error'
          }).then(() => {}).catch(() => {})
          this.verifyCode1 = ''
        })
      }
    },
    changeEmail(){
      let code = this.verifyCode1
      if(code.length !== 6 || code == null ){
        this.$confirm('验证码应为6位数字', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          closeOnClickModal: true,
          type: 'warning'
        }).then(() => {}).catch(() => {})
      } else if(this.newEmail === this.user.email){
        this.$confirm('请在表单中输入新的邮箱', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          closeOnClickModal: true,
          type: 'warning'
        }).then(() => {}).catch(() => {})
      } else if(!isEmail(this.newEmail)){
        this.$confirm('请输入正确的邮箱', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          closeOnClickModal: true,
          type: 'warning'
        }).then(() => {}).catch(() => {})
      } else {
         uniqueCheck('email', this.newEmail).then(res => {
            this.$confirm('该邮箱已被别人使用', '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              closeOnClickModal: true,
              type: 'warning'
            }).then(() => {}).catch(() => {});
          }).catch(error => {
            this.userInfo.email = this.newEmail.trim()
            changeUserInfo(this.userInfo, code).then(res => {
              this.$message({
                message: '邮箱添加成功！',
                type: 'success'
              })
              this.user = res.data
              this.userInfo = res.data
              this.verifyCode1 = ''
            }).catch(err=>{
              this.$confirm('修改邮箱失败，请重试!', '提示', {
                confirmButtonText: '确定',
                showCancelButton: false,
                closeOnClickModal: true,
                type: 'error'
              }).then(() => {}).catch(() => {})
              this.verifyCode1 = ''
            })
          })
      }
    },
    phoneSendVerifyCode(){
      if(this.user.phone && !this.user.phoneVerified){
        console.log('1')
        getVerifyCode('phone', this.user.phone).then(res => {
          this.$notify({
            title: '成功',
            message: '验证码已发送至' + this.user.phone,
            type: 'success'
          });
        })
      } else if(this.user.emailVerified && !this.user.phoneVerified && !this.user.phone) {
        console.log('2')
        getEmailVerifyCode('email', this.user.email,this.userInfo).then(res => {
          this.$notify({
            title: '成功',
            message: '验证码已发送至' + this.user.email,
            type: 'success'
          });
        })
      } else if(this.user.phoneVerified && this.user.emailVerified){
        console.log('3')
        this.phoneOrEmail = true
      } else if(!this.user.emailVerified && !this.user.phoneVerified && !this.user.phone){
        console.log('4')
        if (!isPhone(this.newPhone)) {
          this.$confirm('请输入正确的手机号码', '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              closeOnClickModal: true,
              type: 'warning'
            }).then(() => {}).catch(() => {});
        } else {           
          // 添加的新邮箱做唯一性校验
          uniqueCheck('phone', this.newPhone).then(res => {
            this.$confirm('该手机已被别人使用', '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              closeOnClickModal: true,
              type: 'warning'
            }).then(() => {}).catch(() => {});
          }).catch(error => {
            getPhoneVerifyCode('phone', this.newPhone, this.userInfo).then(res => {
              this.$notify({
                title: '成功',
                message: '验证码已发送至' + this.newPhone,
                type: 'success'
              });
            })
          })
        }
      } else if(!this.user.emailVerified && this.user.phoneVerified){
        console.log('5')
        getVerifyCode('phone', this.user.phone).then(res => {
          this.$notify({
            title: '成功',
            message: '验证码已发送至' + this.user.phone,
            type: 'success'
          });
        })
      }
    },
    addPhone(){
      let code = this.verifyCode2
      if(code.length !== 6 || code == null ){
        this.$confirm('验证码应为6位数字', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          closeOnClickModal: true,
          type: 'warning'
        }).then(() => {}).catch(() => {})
      } else if(!isPhone(this.newPhone)){
        this.$confirm('请输入正确的手机号码', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          closeOnClickModal: true,
          type: 'warning'
        }).then(() => {}).catch(() => {})
      } else {
        this.userInfo.phone = this.newPhone.trim()
        changeUserInfo(this.userInfo, code).then(res => {
          this.$message({
            message: '手机添加成功！',
            type: 'success'
          })
          this.user = res.data
          this.userInfo = res.data
          this.verifyCode2 = ''
        }).catch(err=>{
          this.$confirm('添加失败，请重试!', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            closeOnClickModal: true,
            type: 'error'
          }).then(() => {}).catch(() => {})
          delete this.userInfo.phone
          this.user = this.userInfo
          this.verifyCode2 = ''
        })
      }
    },
    verifyPhone(){
      let code = this.verifyCode2
      if(code.length !== 6 || code == null ){
        this.$confirm('验证码应为6位数字', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          closeOnClickModal: true,
          type: 'warning'
        }).then(() => {}).catch(() => {})
      } else if(this.newPhone !== this.user.phone){
        this.$confirm('表单中手机号码与待验证的手机号码不符', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          closeOnClickModal: true,
          type: 'warning'
        }).then(() => {}).catch(() => {})
      } else {
        this.userInfo.phone = this.newPhone.trim()
        changeUserInfo(this.userInfo, code).then(res => {
          this.$message({
            message: '手机验证成功！',
            type: 'success'
          })         
          this.user = res.data
          this.userInfo = res.data
          this.verifyCode2 = ''
        }).catch(err=>{
          this.$confirm('验证手机失败，请重试!', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            closeOnClickModal: true,
            type: 'error'
          }).then(() => {}).catch(() => {})
          this.verifyCode2 = ''
        })
      }
    },
    changePhone(){
      let code = this.verifyCode2
      if(code.length !== 6 || code == null ){
        this.$confirm('验证码应为6位数字', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          closeOnClickModal: true,
          type: 'warning'
        }).then(() => {}).catch(() => {})
      } else if(this.newPhone === this.user.phone){
        this.$confirm('请在表单中输入新的手机号码', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          closeOnClickModal: true,
          type: 'warning'
        }).then(() => {}).catch(() => {})
      } else if(!isPhone(this.newPhone)){
        this.$confirm('请输入正确的手机号码', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          closeOnClickModal: true,
          type: 'warning'
        }).then(() => {}).catch(() => {})
      } else {
        uniqueCheck('email', this.newPhone).then(res => {
          this.$confirm('该手机已被别人使用', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            closeOnClickModal: true,
            type: 'warning'
          }).then(() => {}).catch(() => {});
        }).catch(error => {
          this.userInfo.phone = this.newPhone.trim()
          changeUserInfo(this.userInfo, code).then(res => {
            this.$message({
              message: '更换手机成功！',
              type: 'success'
            })           
            this.user = res.data
            this.userInfo = res.data
            this.verifyCode2 = ''
          }).catch(err=>{
            this.$confirm('更换手机失败，请重试!', '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              closeOnClickModal: true,
              type: 'error'
            }).then(() => {}).catch(() => {})
            this.verifyCode2 = ''
          })
        })
      }
    },
    passwordSendVerifyCode(){
      if(!this.user.emailVerified && !this.user.phoneVerified) {
        this.$confirm('请先验证邮箱或手机', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          closeOnClickModal: true,
          type: 'info'
        }).then(() => {}).catch(() => {});
      } else if(this.user.emailVerified && !this.user.phoneVerified){
          getVerifyCode('email', this.user.email).then(res => {
            console.log(res.data)
            this.$notify({
              title: '成功',
              message: '验证码已发送至' + this.user.email,
              type: 'success'
            });
          })
        } else if(!this.user.emailVerified && this.user.phoneVerified){
          getVerifyCode('phone', this.user.phone).then(res => {
            this.$notify({
              title: '成功',
              message: '验证码已发送至' + this.user.phone,
              type: 'success'
            });
          })
        } else if(this.user.emailVerified && this.user.phoneVerified){
          this.phoneOrEmail = true
        }
    },
    changePassWord(){
      if(this.newPassword1.trim() !== this.newPassword2.trim()){
        this.$confirm('两次输入的密码不同', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          closeOnClickModal: true,
          type: 'warning'
        }).then(() => {}).catch(() => {});
      } else if(this.newPassword1.trim().length < 6){
        this.$confirm('密码不能少于6位字符', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          closeOnClickModal: true,
          type: 'warning'
        }).then(() => {}).catch(() => {});
      } else if(this.verifyCode3.trim().length !== 6){
        this.$confirm('验证码应为6位数字', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          closeOnClickModal: true,
          type: 'warning'
        }).then(() => {}).catch(() => {})
      } else {
        let code = this.verifyCode3.trim()
        this.userInfo.password = md5(this.newPassword1)
        changeUserInfo(this.userInfo, code).then(res => {
            this.$message({
              message: '密码修改成功！',
              type: 'success'
            })           
            this.user = res.data
            this.userInfo = res.data
            this.verifyCode3 = ''
            this.newPassword1 = ''
            this.newPassword2 = ''
          }).catch(err=>{
            this.$confirm('密码修改失败，请重试!', '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              closeOnClickModal: true,
              type: 'error'
            }).then(() => {}).catch(() => {})
            this.verifyCode3 = ''
          })
      }
    },
    sendVerifyCodeToPhone(){
      this.phoneOrEmail = false
      getVerifyCode('phone', this.user.phone).then(res => {
          console.log(res.data)
          this.$notify({
            title: '成功',
            message: '验证码已发送至' + this.user.phone,
            type: 'success'
          });
        })
    },
    sendVerifyCodeToEmail(){
      this.phoneOrEmail = false
      getVerifyCode('email', this.user.email).then(res => {
          console.log(res.data)
          this.$notify({
            title: '成功',
            message: '验证码已发送至' + this.user.email,
            type: 'success'
          });
        })
      // getEmailVerifyCode('email', this.user.email,this.userInfo).then(res => {
      //   this.$notify({
      //     title: '成功',
      //     message: '验证码已发送至' + this.user.email,
      //     type: 'success'
      //   });
      // })
    },
    cancelChange(e) {
      if (e == 'nickname') {
        this.newNickname = this.user.nickname
      } else if (e == 'email') {
        console.log(this.user)
        this.newEmail = this.user.email
        this.verifyCode1 = null
      } else if (e == 'phone') {
        console.log(this.user)
        this.newPhone = this.user.phone
        this.verifyCode2 = null
      } else if (e == 'password') {
        this.newPassword1 = ''
        this.newPassword2 = ''
      }
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
    // cropSuccess(resData) {
    //   this.imagecropperShow = false;
    //   this.imagecropperKey = this.imagecropperKey + 1;
    //   this.image = resData.files.avatar;
    // }
  },
  created() {
    userInfo().then(res => {
      console.log(res.data)
      const userData = res.data
      this.user = userData
      this.userInfo = userData
      this.newNickname = this.user.nickname
      this.newEmail = this.user.email
      this.newPhone = this.user.phone
      this.image = userData.faceUri
    })
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
  .username {
    height: 90px;
    width: 100%;
    margin-top: 50px;
    font-weight: 400;
    color: #48576a;
    line-height: 90px;
    font-size: 18px;
    border-top: 1px solid #dfe6ec;
    padding-left: 15px;
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
  }
  .el-collapse.personalCollapse {
    width: 100%;
    margin: 0 auto;
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
    .details4 {
      width: 350px;
      .el-input {
        width: 100%;
      }
      .verifyButton {
        position: absolute;
        left: 300px;
        top: -18px;
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
        height: 65px;
        margin-top: 15px;
        border-radius: 50%;
      }
    }
  }
}
</style>
