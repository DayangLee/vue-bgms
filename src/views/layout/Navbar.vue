<template>
  <el-menu class="navbar" mode="horizontal">
    <spreadLogo class="spreadLogo-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></spreadLogo>
  
    <span class="welcome">
      {{welcome}}
    </span>
  
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" src='../..//assets/images/avater/1.jpg'>
        <i class="el-icon-caret-bottom" style="color:white;"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class='inlineBlock' to="/">
          <el-dropdown-item>
            个人中心
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import spreadLogo from '../../components/SpreadLogo'

export default {
  components: {
    spreadLogo
  },
  data() {
    return {
      welcome: '欢迎使用汉王蓝天空感后台管理系统'
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avater'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload();
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  background: #324157;
  color: white;
  .spreadLogo-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .welcome {
    display: inline-block;
    position: absolute;
    left: 50px;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 85px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
