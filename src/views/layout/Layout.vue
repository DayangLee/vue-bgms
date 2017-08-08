<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <Sidebar class="sidebar-container"></Sidebar>
    <div class="main-container">
      <Navbar></Navbar>
      <App-main></App-main>
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import AppMain from './AppMain'

export default {
  name: 'Layout',
  components: {
    Sidebar, Navbar, AppMain
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../assets/style/mixin.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  min-width: 1000px;

  &.hideSidebar {
    .sidebar-container {
      width: 56px;
      overflow: inherit;
    }
    .main-container {
      margin-left: 56px;
    }
  }
  .sidebar-container {
    transition: width .28s ease-out;
    width: 220px;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
    background: #324157;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .main-container {
    min-height: 100%;
    transition: margin-left .28s ease-out;
    margin-left: 220px;
  }
}
</style>
