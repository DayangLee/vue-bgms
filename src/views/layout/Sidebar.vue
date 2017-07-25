<template>
  <div class="sidebar-content">
    <img class="logo" src="../../assets/images/logo.png">
    <el-menu mode="vertical" theme="dark" default-active="$route.path" @select="handleSelect" unique-opened>
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
    ...mapGetters(['permission_routers'])
  },
  mounted: function () {
    console.log(this.$route.path)
  },
  methods: {
    handleSelect(key) {
      this.$router.push(key)
    }
  }
}
</script>
<style lang="scss" scoped>
.sidebar-content {
  // display: block;
  position: absolute;
  width: 220px;
  left: 0;
  top: 0;
  bottom: 0;
  background: #324157;
  .logo {
    width: 188px;
    display: block; // margin-left: 15px;
    // margin-top: 10px;
    margin: 10px auto;
  }
  .el-menu {
    margin-top: 50px;
  }
}
</style>
