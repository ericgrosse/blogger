import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: () => import(/* webpackChunkName: "create-post" */ '../views/CreatePost.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
