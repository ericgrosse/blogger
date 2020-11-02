import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: '',
      userId: '',
      posts: []
    },
  },
  mutations: {
    updateUser(state, user) {
      state.user = user
    },
    addPost(state, post) {
      state.user.posts.push(post)
    }
  },
  actions: {
  },
  modules: {
  }
})
