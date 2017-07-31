<template>
  <div class="login-container">
    <img class="logo" src='../../assets//images//login//logo.png'>
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
      <div class="title">
        <span style="font-weight:bold;">LOGIN</span>
        <span> SYSTEM</span>
      </div>
      <el-form-item prop="acount" class="item">
        <div class="icon-container">
          <wscn-icon-svg icon-class="yonghu1" class="icon1"></wscn-icon-svg>
        </div>
        <input type="text" name="acount" autoComplete="on" placeholder="请输入用户名" v-model="loginForm.acount">
      </el-form-item>
      <el-form-item prop="password" class="item">
        <div class="icon-container">
          <wscn-icon-svg icon-class="mima" class="icon1"></wscn-icon-svg>
        </div>
        <input type="password" name="password" autoComplete="on" placeholder="请输入密码" v-model="loginForm.password">
      </el-form-item>
      <el-form-item class="item item1">
        <el-button class="login-button" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
    <div class="dcode-container">
      <div class="dcode">
        <div>
          <img src="../../assets//images//login//weixin_erweima.png" class="img1">
        </div>
        <div>
          <img src="../../assets//images//login//weixinlogo.png" class="img2">
          <p>汉王蓝天</p>
        </div>
  
      </div>
      <div class="dcode">
        <div>
          <img src="../../assets//images//login//weibo_erweima.png" class="img1">
        </div>
        <div>
          <img src="../../assets//images//login//weibologo.png" class="img2">
          <p>汉王蓝天</p>
        </div>
      </div>
    </div>
    <div class="copyright">
      Copyright &nbsp;&copy;&nbsp; 汉王蓝天科技有限公司
    </div>
  </div>
</template>

<script>
import { isHwEmail } from '../../utils/validate'
export default {
  name: 'login',
  data() {
    const validateAcount = (rule, value, callback) => {
      if (!value) {
        callback(new Error('用户名不能为空'))
      } else if (!isHwEmail(value)) {
        callback(new Error('请输入合法邮箱'))
      } else {
        callback()
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
        password: '111111'
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
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('LoginByAcount', this.loginForm).then(() => {
            this.loading = false;
            this.$router.push({ path: '/dashboard/index' });
          }).catch(err => {
            this.$message.error(err);
            this.loading = false;
          });
        } else {
          console.log('登录失败，请检查用户名和密码!!');
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
// @import '../../assets/style/mixin.scss';
.login-container {
  // @include relative;
  width: 100%;
  height: 100vh;
  background-image: url('../../assets/images/login/bj.jpg');
  background-repeat: no-repeat;
  background-size: cover;

  .logo {
    width: 300px;
    height: 80px;
    margin-top: 50px;
    margin-left: 50px;
  }
  .login-form {
    position: absolute;
    top: 50%;
    margin-top: -190px;
    left: 50%;
    margin-left: -250px;
    width: 500px;
    height: 380px;
    padding: 35px 35px 15px 35px;
    background-color: rgba(12, 26, 44, 0.12);
    border-radius: 8px;
  }

  .title {
    font-family: Helvetica;
    font-size: 48px;
    color: #fff;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: 200;
  }

  .item {
    width: 280px;
    height: 50px;
    line-height: 50px;
    margin: 20px auto;
    color: white;
    vertical-align: middle;
    border-color: white;
    border-style: solid;
    border-top-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
    border-left-width: 0px;

    .icon-container {
      width: 45px;
      height: 50px;
      float: left;
    }
    .icon1 {
      width: 30px;
      height: 50px;
    }

    input {
      width: 230px;
      height: 50px;
      background-color: rgba(12, 26, 44, 0);
      border-color: white;
      border-style: solid;
      border-top-width: 0px;
      border-right-width: 0px;
      border-bottom-width: 0px;
      border-left-width: 0px;
      outline: none;
      font-size: 18px;
      color: white;
    }
  }

  .item1 {
    border-bottom-width: 0;
  }
  .login-button {
    width: 100%;
    height: 45px;
    margin-top: 20px;
    background-color: rgb(40, 78, 123);
    outline: none;
    color: white;
    border: 0;
    font-size: 18px;
  }
}

.tip-container {
  position: absolute;
  left: 50%;
  margin-left: -250px;
  width: 500px;
  padding: 35px 35px 15px 35px;
  .tips {
    font-size: 14px;
    color: rgba(135, 206, 235, 1);
    margin-bottom: 5px;
  }
}

.dcode-container {
  position: absolute;
  right: 30px;
  bottom: 80px;
  .dcode {
    float: left;
    width: 100px;
    margin-right: 10px;
    .img1 {
      width: 100px;
    }
    .img2 {
      width: 30px;
    }
    p {
      color: #fff;
      font-size: 14px;
      margin-top: 0px;
      margin-right: 8px;
      float: right;
    }
  }
}

.copyright {
  font-size: 20px;
  color: white;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 30px;
  width: 330px;
  margin: 0 auto;
}


input::-webkit-input-placeholder {
  color: rgba(255, 255, 255, .6);
}

input:-moz-placeholder {
  color: rgba(255, 255, 255, .6);
}

input::-moz-placeholder {
  color: rgba(255, 255, 255, .6);
}

input:-ms-input-placeholder {
  color: rgba(255, 255, 255, .6);
}
</style>
