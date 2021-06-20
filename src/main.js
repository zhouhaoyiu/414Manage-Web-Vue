// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import Video from 'video.js'

import 'video.js/dist/video-js.css'
import AMap from 'vue-amap'
import router from './router'
import store from './vuex/store'
import global from './global.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/css/reset.less'
Vue.prototype.$video = Video
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.prototype.GLOBAL = global
// Vue.prototype.axios = axios
Vue.use(ElementUI)
Vue.use(AMap)
AMap.initAMapApiLoader({
  // 高德key
  key: '55826f24b7d0a027c13abd71fe37798c',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Geolocation']
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
