<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <el-menu-item class="title1 submenu-title-noDropdown" v-if="item.jump" index="golayout">
        <icon-svg v-if='item.icon' :icon-class="item.icon" class="icon1"></icon-svg>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
      <el-menu-item v-else-if="!item.hidden&&item.noDropdown&&item.children.length>0" :index="item.path+'/'+item.children[0].path" class="title1 submenu-title-noDropdown">
        <icon-svg v-if='item.icon' :icon-class="item.icon" class="icon1"></icon-svg>
        <span slot="title">{{item.children[0].name}}</span>
      </el-menu-item>
      <el-submenu :index="item.path" v-else-if="!item.noDropdown&&!item.hidden">
        <template slot="title">
          <div class="title1">
            <icon-svg v-if='item.icon' :icon-class="item.icon" class="icon1"></icon-svg>
            <span>{{item.name}}</span>
          </div>
        </template>
        <el-menu-item v-for="child in item.children" class="title2" :index="item.path+'/'+child.path">
          <icon-svg v-if='child.icon' :icon-class="child.icon" class="icon2"></icon-svg>
          <span>{{child.name}}</span>
        </el-menu-item>
      </el-submenu>
    </template>
  </div>
</template>
<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.title1 {
  font-size: 20px;
  height: 100%;
}

.title2 {
  font-size: 16px;
  height: 50px;
  line-height: 50px;
}

.icon1 {
  width: 30px;
  height: 30px;
  margin-top: 15px;
  margin-right: 10px;
}
</style>
