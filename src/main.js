// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import Video from 'video.js'

import 'video.js/dist/video-js.css'

import router from './router'
import store from './vuex/store'
import ElementUI from 'element-ui'
import global from './global.js'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/css/reset.less'

Vue.prototype.$video = Video
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.prototype.GLOBAL = global
// Vue.prototype.axios = axios
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
