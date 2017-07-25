const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avater: state => state.user.avater,
  name: state => state.user.name,
  uid: state => state.user.uid,
  acount: state => state.user.email,
  auth_type: state => state.user.auth_type,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
};
export default getters
