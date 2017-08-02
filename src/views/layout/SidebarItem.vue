<template>
  <div>
    <template v-for="item in routes">

			<router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
				<el-menu-item :index="item.path+'/'+item.children[0].path"  class='submenu-title-noDropdown'>
					<icon-svg v-if='item.icon' :icon-class="item.icon" class="icon1"></icon-svg>
          <span slot="title" class="title1">{{item.children[0].name}}</span>
				</el-menu-item>
			</router-link>

			<el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
				<template slot="title">
					<icon-svg v-if='item.icon' :icon-class="item.icon" class="icon1"></icon-svg>
          <span class="title1">{{item.name}}</span>
				</template>
				<template v-for="child in item.children" v-if='!child.hidden'>

					<sidebar-item class='nest-menu' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>

					<router-link v-else :to="item.path+'/'+child.path">
						<el-menu-item :index="item.path+'/'+child.path">
								<icon-svg v-if='child.icon' :icon-class="child.icon" class="icon2"></icon-svg>
                <span>{{child.name}}</span>
						</el-menu-item>
					</router-link>

				</template>

			</el-submenu>

		</template>
    <!-- <template v-for="item in routes">
      <el-menu-item v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :index="item.path+'/'+item.children[0].path" class="title1">
        <wscn-icon-svg v-if='item.icon' :icon-class="item.icon" class="icon1"></wscn-icon-svg>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span slot="title">{{item.children[0].name}}</span>
      </el-menu-item>
      <el-submenu :index="item.path" v-if="!item.noDropdown&&!item.hidden">
        <template slot="title">
          <div class="title1">
            <wscn-icon-svg v-if='item.icon' :icon-class="item.icon" class="icon1"></wscn-icon-svg>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{{item.name}}</span>
          </div>
        </template>
        <el-menu-item v-for="child in item.children" class="title2" :index="item.path+'/'+child.path">
          <wscn-icon-svg v-if='child.icon' :icon-class="child.icon" class="icon2"></wscn-icon-svg>
          &nbsp;&nbsp;&nbsp;
          <span>{{child.name}}</span>
        </el-menu-item>
      </el-submenu>
    </template> -->
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
.title1 {
  font-size: 20px;
  height: 100%;
  margin-left: -5px;
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
}

</style>
