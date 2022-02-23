import Vue from 'vue'
import Axios from 'axios'


Axios.defaults.withCredentials = true; //允许请求携带cookie
Axios.defaults.baseURL = "/api"; // 设置axios的基础请求路径
Axios.defaults.timeout = 2000; // 设置axios的请求时间

Axios.loadData = async function (url) {
  const resp = await Axios.get(url);
  return resp.data;
};


Vue.prototype.$http = Axios; // 将axios添加到 Vue的原型，这样一切vue实例都可以使用该对象
