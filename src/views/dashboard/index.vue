<template>
    <div class="dashboard-container">
        <component v-bind:is="currentRole"> </component>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import AgentDashboard from './agent/index';
    import UserDashboard from './user/index';
    import AdminDashboard from './admin/index';
    export default {
      name: 'dashboard',
      components: { AgentDashboard, UserDashboard, AdminDashboard },
      data() {
        return {
          currentRole: 'AdminDashboard'
        }
      },
      computed: {
        ...mapGetters([
          'roles'
        ])
      },
      created() {
        if (this.roles.indexOf('admin') >= 0) {
          //return this.currentRole = 'AdminDashboard';
          return this.currentRole = 'AdminDashboard'
        } else if (this.roles.indexOf('agent') >= 0){
          return this.currentRole = 'AgentDashboard';
        } else if (this.roles.indexOf('user') >= 0){
          return this.currentRole = 'UserDashboard';
        }
        // const isEditor = this.roles.some(v => v.indexOf('editor') >= 0)
        // if (!isEditor) {
        //   this.currentRole = 'DefaultDashboard';
        // }
        // this.currentRole = 'EditorDashboard';
      }
    }
</script>
