// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// animate.css
import animated from 'animate.css' // npm install animate.css --save安装，再引入
Vue.use(animated)

// axios vue-axios
import axios from 'axios';
import VueAxios from "vue-axios";
// 全局 接口 地址 前缀
axios.defaults.baseURL = "http://127.0.0.1:3000"
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
