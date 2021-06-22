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
    path: '/EditRestaurant/:id',
    name: 'EditRestaurant',
    component: () => import('../views/EditResto.vue'),
    props: (route) => ({
      ...route.params
    })
  },
  {
    path: '/AddArticle/:id',
    name: 'AddArticle',
    component: () => import('../views/AddArticle.vue'),
    props: (route) => ({
      ...route.params
    })
  },
  {
    path: '/EditArticle/:id',
    name: 'EditArticle',
    component: () => import('../views/EditArticle.vue'),
    props: (route) => ({
      ...route.params
    })
  },
  {
    path: '/menuArticle/:id',
    name: 'menuArticle',
    component: () => import('../views/ArticleMenu.vue'),
    props: (route) => ({
      ...route.params
    })
  },
  {
    path: '/my-orders',
    name: 'MyOrders',
    component: () => import('../views/Orders.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
