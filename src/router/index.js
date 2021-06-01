import Vue from 'vue'
import Router from 'vue-router'
import login from '../login.vue'
import index from '../views/index.vue'
import homePage from '../views/homepage.vue'
import introduction from '../views/introduction.vue'
import photo from '../views/photo.vue'
import bill from '../views/bill.vue'

const originalPush = Router.prototype.push

Router.prototype.push = function push (location) {
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
          name: 'bill',
          path: 'bill',
          component: bill
        }
      ]
    }
  ]
})
