<template>
  <div>
    <img class="logo1" v-if="isCollapse" src="../../assets/images/logo-small.png">
    <img class="logo2" v-else src="../../assets/images/logo.png">
    <el-menu mode="vertical" theme="dark" :default-active="$route.path" @select="handleSelect" :collapse="isCollapse" @open="handleOpen" @close="handleClose" unique-opened>
      <SidebarItem :routes='permission_routers'></SidebarItem>
    </el-menu>
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
    }
  }
}
</script>
<style lang="scss" scoped>
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
</style>
