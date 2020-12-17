import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import { Lazyload } from 'vant';
Vue.use(Lazyload)

import router from './router'
import store from './store/'

import api from './utils/api'
Vue.prototype.$api = api

import img from './utils/img'
Vue.prototype.$img = img

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
