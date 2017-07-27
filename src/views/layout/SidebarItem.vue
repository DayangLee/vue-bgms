<template>
  <div>
    <template v-for="item in routes">
      <el-menu-item v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :index="item.path+'/'+item.children[0].path" class="title1">
        <wscn-icon-svg v-if='item.icon' :icon-class="item.icon" class="icon1"></wscn-icon-svg>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {{item.children[0].name}}
      </el-menu-item>
      <!-- <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
          <el-menu-item :index="item.path+'/'+item.children[0].path" class="title1">
            {{item.children[0].name}}
          </el-menu-item>
        </router-link> -->
      <el-submenu :index="item.path" v-if="!item.noDropdown&&!item.hidden">
        <template slot="title">
          <div class="title1">
            <wscn-icon-svg v-if='item.icon' :icon-class="item.icon" class="icon1"></wscn-icon-svg>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {{item.name}}
          </div>
        </template>
        <!-- <template v-for="child in item.children" v-if='!child.hidden'> -->
          <!-- <SidebarItem class='menu-indent' v-if='child.children&&child.children.length>0' :routes='[child]'> </SidebarItem> -->
          <el-menu-item v-for="child in item.children"  class="title2" :index="item.path+'/'+child.path">
          <wscn-icon-svg v-if='child.icon' :icon-class="child.icon" class="icon2"></wscn-icon-svg>
          &nbsp;&nbsp;&nbsp;
            {{child.name}}
          </el-menu-item>
          <!-- <router-link v-else class="menu-indent" :to="item.path+'/'+child.path">
              <el-menu-item :index="item.path+'/'+child.path" class="title2">
                {{child.name}}
              </el-menu-item>
            </router-link> -->
        <!-- </template> -->
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
<style lang="scss" scoped>
img {
  margin-right: 10px;
}

.menu-indent {
  display: block;
  text-indent: 0px;
}

.title1 {
  font-size: 20px; //height: 56px;
  height: 100%; // line-height: 56px;
  margin-left: -5px; // vertical-align: middle;

}
.title2 {
  font-size: 16px;
  height: 56px;
  line-height: 56px;
  margin-left: -25px;
}
.icon1 {
    width: 1.5rem;
    height: 30px;
    margin-top: 15px;
    float: left;
  }
.icon2 {
    margin-left: 0.3rem;
  }
</style>
