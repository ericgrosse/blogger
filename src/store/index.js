import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: '',
      userId: ''
    },
  },
  mutations: {
    updateUser(state, user) {
      state.user = Object.assign({}, {...user})
    }
  },
  actions: {
  },
  modules: {
  }
})
