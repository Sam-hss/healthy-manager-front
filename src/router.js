import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

function route(path, file, name, children) {
  return {
    exact: true,
    path,
    name,
    children,
    component: () => import('./views' + file)
  }
}

export default new Router({
  routes: [
    route("/", '/Login', "Login"),// /login路径，路由到登录组件
    route("/login", '/Login', "Login"),// /login路径，路由到登录组件
    route("/index", "/Menu", "菜单"),
    {
      path: "/home", // 根路径，路由到 Layout组件
      component: () => import('./views/Home'),
      children: [
        route("/selfInfo", "/selfInfo/Index", "个人信息"),
        route("/users", "/user/Index", "学生信息管理"),
        route("/healthManage", "/health/HealthList", "健康档案(体检数据)管理"),
        route("/selfHealth", "/health/SelfHealthList", "个人健康档案"),
        route("/analysis", "/health/Analysis", "体检数据分析"),
        route("/knowledge", "/knowledge/Index", "健康知识管理"),
        route("/read", "/knowledge/Read", "健康知识阅读"),
        route("/healthSuggest", "/suggest/Index", "健康建议"),
        route("/permission", "/system/Permission", "权限管理"),
        route("/roleManage", "/role/index", "角色管理"),
      ]
    }
  ]
});
