import Vue from 'vue'
import Router from 'vue-router'
import login from '../login.vue'
import regis from '../regis.vue'
import index from '../views/index.vue'
import homePage from '../views/homepage.vue'
import introduction from '../views/introduction/introduction.vue'
import photo from '../views/photo.vue'
import chat from '../views/chat.vue'
import bills from '../views/bills.vue'

const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/regis',
      name: 'regis',
      component: regis
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      redirect: 'homePage',
      children: [
        {
          name: 'homePage',
          path: '/homePage',
          component: homePage
        },
        {
          name: 'introduction',
          path: '/introduction',
          component: introduction
        },
        {

          name: 'photo',
          path: '/photo',
          component: photo
        },
        {
          name: 'bills',
          path: '/bills',
          component: bills
        },
        {
          name: 'chat',
          path: '/chat',
          component: chat
        }
      ]
    }
  ]
})
