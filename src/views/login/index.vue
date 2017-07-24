<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
      <h3 class="title">汉王蓝天空感管理平台</h3>
      <el-form-item prop="acount" class="item">
        <span class="svg-container">
          <icon name="envelope" flip="horizontal"></icon>
        </span>
        <el-input name="acount" type="text" v-model="loginForm.acount" autoComplete="on" placeholder="邮箱/手机/用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password" class="item">
        <span class="svg-container">
          <icon name="lock"></icon>
        </span>
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:40%;float:left;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
        <el-button type="primary" style="width:40%;float:right;">
          忘记密码?
        </el-button>
      </el-form-item>
  
      <div class='tips'>admin账号为: admin@hanwang.com.cn</div>
      <div class='tips'>agent账号: agent@hanwang.com.cn</div>
      <div class='tips'>user账号: user@hanwang.com.cn</div>
      <div class='tips'>密码随便填</div>
      <!-- <router-link to="/sendpwd" class="forget-pwd">
                    忘记密码?(或首次登录)
                  </router-link> -->
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'login',
  data() {
    const validateAcount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        acount: 'admin@hanwang.com.cn',
        password: ''
      },
      loginRules: {
        acount: [
          { required: true, trigger: 'blur', validator: validateAcount }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePass }
        ]
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters(['auth_type'])
  },
  methods: {
    handleLogin() {
      console.log('1')
      console.log(this.loading)
      this.$refs.loginForm.validate(valid => {
        console.log('enter')
        if (valid) {
          this.loading = true;
          this.$store.dispatch('LoginByAcount', this.loginForm).then(() => {
            this.loading = false;
            this.$router.push({ path: '/' });
            // this.showDialog = true;
          }).catch(err => {
            this.$message.error(err);
            this.loading = false;
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      console.log('2')
      // this.$refs.loginForm.validate(valid => {
      //   console.log('enter')
      //   if (valid) {
      //     //this.loading = true;
      //     console.log('hh')
      //     this.$store.dispatch('LoginByAcount', this.loginForm).then(() => {
      //       this.loading = false;
      //       this.$router.push({ path: '/' });
      //       console.log('xx')
      //     }).catch(err => {
      //       this.$message.error(err);
      //       this.loading = false;
      //     });
      //   } else {
      //     console.log('登录失败，请检查用户名和密码!!');
      //     return false;
      //   }
      // });
    },
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '../../assets/style/mixin.scss';

.login-container {
  @include relative;
  width: 100%;
  height: 100vh;
  background-color: #2d3a4b;

  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 500px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
    background-color: white;
    -moz-box-shadow: 2px 2px 15px rgba(135, 206, 235, 1);
    -webkit-box-shadow: 2px 2px 15px rgba(135, 206, 235, 1);
    box-shadow: 2px 2px 15px rgba(135, 206, 235, 1);
  }

  .title {
    font-size: 26px;
    font-weight: 400;
    color: black;
    margin: 0px auto 40px auto;
    text-align: center;
  }

  .item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  input:-webkit-autofill {
    // -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: black;
    height: 47px;
    font-size: 20px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
  }

  .forget-pwd {
    color: #fff;
  }
}

.tips {
  font-size: 14px;
  color: rgba(135, 206, 235, 1);
  margin-bottom: 5px;
}
</style>
