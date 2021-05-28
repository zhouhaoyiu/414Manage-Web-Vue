import Vue from 'vue'
import Router from 'vue-router'
import login from '../login.vue'
import index from '../views/index.vue'
import introduction from '../views/introduction.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        {
          name: 'introduction',
          path: '/introduction',
          component: introduction
        }]
    }
  ]
})
