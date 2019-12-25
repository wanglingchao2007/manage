// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vant from "vant"
import "vant/lib/index.css"
Vue.use(Vant)

import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem);
import { Lazyload } from 'vant';
Vue.use(Lazyload);

import { SubmitBar } from 'vant';
Vue.use(SubmitBar);

import { PullRefresh } from 'vant';
Vue.use(PullRefresh);

import axios from "axios"
import VueAxios from "vue-axios"
Vue.use(VueAxios,axios)

import store from "@/store/index.js"
Vue.use(store)
Vue.config.productionTip = false

import { AddressList } from 'vant';
Vue.use(AddressList);
import { AddressEdit } from 'vant';
Vue.use(AddressEdit);
import { Area } from 'vant';
Vue.use(Area);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
