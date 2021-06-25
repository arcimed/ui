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
    component: () => import('../views/Restaurants/AddResto.vue')
  },
  {
    path: '/EditRestaurant/:id',
    name: 'EditRestaurant',
    component: () => import('../views/Restaurants/EditResto.vue'),
    props: (route) => ({
      ...route.params
    })
  },
  {
    path: '/AddArticle/:id',
    name: 'AddArticle',
    component: () => import('../views/Articles/AddArticle.vue'),
    props: (route) => ({
      ...route.params
    })
  },
  {
    path: '/EditArticle/:id',
    name: 'EditArticle',
    component: () => import('../views/Articles/EditArticle.vue'),
    props: (route) => ({
      ...route.params
    })
  },
  {
    path: '/menuArticle/:id',
    name: 'menuArticle',
    component: () => import('../views/Restaurants/ArticleMenu.vue'),
    props: (route) => ({
      ...route.params
    })
  },
  {
    path: '/AddMenu/:id',
    name: 'AddMenu',
    component: () => import('../views/Menu/AddMenu.vue'),
    props: (route) => ({
      ...route.params
    })
  },
  {
    path: '/EditMenu/:id',
    name: 'EditMenu',
    component: () => import('../views/Menu/EditMenu.vue'),
    props: (route) => ({
      ...route.params
    })
  },
  {
    path: '/my-orders',
    name: 'MyOrders',
    component: () => import('../views/Users/Orders.vue')
  },
  {
    path: '/my-orders/:paidOrderId',
    name: 'PaidOrder',
    component: () => import('../views/Users/Orders.vue'),
    props: (route) => ({
      ...route.params
    })
  },
  {
    path: '/my-restaurant-orders',
    name: 'MyRestaurantOrders',
    component: () => import('../views/Restaurants/Orders.vue')
  },
  {
    path: '/orders-to-be-delivered',
    name: 'OrdersToBeDelivered',
    component: () => import('../views/DeleveryMan/Orders')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/Users/User.vue')
  },
  {
    path: '/EditUser/:id',
    name: 'EditUser',
    component: () => import('../views/Users/EditUser.vue'),
    props: (route) => ({
      ...route.params
    })
  },
  {
    path: '/Notifications',
    name: 'Notifications',
    component: () => import('../views/Users/Notification.vue'),
  },
  {
    path: '/Statistiques',
    name: 'Statistiques',
    component: () => import('../views/Restaurants/Statistiques.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
