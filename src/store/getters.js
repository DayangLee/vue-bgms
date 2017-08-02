const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avater: state => state.user.avater,
  name: state => state.user.name,
  acount: state => state.user.acount,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers
};
export default getters
