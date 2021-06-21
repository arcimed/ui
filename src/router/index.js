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
    path: '/AddRestaurant',
    name: 'AddRestaurant',
    component: () => import('../views/AddResto.vue')
  },
  {
    path: '/AddArticle',
    name: 'AddArticle',
    component: () => import('../views/AddArticle.vue')
  },
  {
    path: '/menuArticle/:id',
    name: 'menuArticle',
    component: () => import('../views/ArticleMenu.vue'),
    props: (route) => ({
      ...route.params
    })
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
