import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './http'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Axios from 'axios'

window.echarts = require("echarts");
Vue.use(ElementUI);
Vue.use(VueQuillEditor);
Vue.config.productionTip = false;
window.echarts = require("echarts");
Axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.hasOwnProperty("response")) {
    if (error.response.status === 302) {
      ElementUI.Notification.error({
        title: '302',
        message: 'response.data'
      });
      localStorage.clear();
      // router.replace({path:'/login',query:{redirect:router.currentRoute.fullPath}});
    } else if (error.response.status === 400) {
      ElementUI.Notification.warning({
        title: '警告',
        message: error.response.data.message
      });
    } else if (error.response.status === 403) {
      ElementUI.Notification.error({
        title: '无权访问',
        message: '您无权访问该资源!'
      });
    } else if (error.response.status === 404) {
      ElementUI.Notification.error({
        title: '404',
        message: '未找到你想要的资源!'
      });
    } else if (error.response.status === 301) {
      ElementUI.Notification.warning({
        title: '提示',
        message: error.response.data
      });
    } else {
      ElementUI.Notification.error({
        title: '请求错误',
        message: 'Network Error'
      });
    }
  } else {
    ElementUI.Notification.error({
      title: '请求错误',
      message: 'Network Error'
    });
  }
  console.log("错误:" + error)

  return error;
});
Axios.interceptors.request.use(function (request) {
  console.log(request);
  return request;
});

Vue.filter('UserFilter', function (data) {
  let user = JSON.parse(localStorage.getItem("users"));
  let name = "";
  user.forEach(u => {
    if (u.id === data) {
      name = u.name
    }
  });
  return name;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

