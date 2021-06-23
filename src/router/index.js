import Vue from 'vue'
import Router from 'vue-router'
const photo = () => import('../views/photo.vue')
const chat = () => import('../views/chat.vue')
const bills = () => import('../views/bills.vue')
const homePage = () => import('../views/homepage.vue')
const introduction = () => import('../views/introduction/introduction.vue')
const index = () => import('../views/index.vue')
const regis = () => import('../regis.vue')
const login = () => import('../login.vue')

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
