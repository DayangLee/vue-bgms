<template>
  <div>
    <img class="logo1" v-if="isCollapse" src="../../assets/images/logo-small.png">
    <img class="logo2" v-else src="../../assets/images/logo.png">
    <el-menu mode="vertical" theme="dark" :default-active="$route.path" @select="handleSelect" :collapse="isCollapse" @open="handleOpen" @close="handleClose" unique-opened>
      <SidebarItem :routes='permission_routers'></SidebarItem>
    </el-menu>
    <el-button type="text" class="daping_btn" @click="goLayout">
        <icon-svg icon-class="dapingyemian" class="icon1"></icon-svg>
        <span>大屏页面</span>
    </el-button>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(['permission_routers', 'sidebar']),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    handleSelect(key) {
      this.$router.push(key)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goLayout(){
      window.open('http://www.baidu.com')
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.logo1 {
  width: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 5px;
}

.logo2 {
  width: 200px;
  margin: 10px auto;
}

.el-menu {
  min-height: 100%;
}

.daping_btn {
  padding-left: 20px;
  position: absolute;
  bottom: 20px;
  color: #bfcbd9;
  font-size: 20px;
  &:hover {
    color: #20a0ff;
  }
}

</style>
