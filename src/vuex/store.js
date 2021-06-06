import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
  role: 0,
  trueName: '',
  userName: '',
  id: ''
}

export default new Vuex.Store({
  state,
  plugins: [persistedState()]
})
