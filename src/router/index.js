import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    nothing: true
    }
  },
  {
    path: '/AddRestaurant',
    name: 'AddRestaurant',
    component: () => import('../views/Restaurants/AddResto.vue'),
    meta: {
      requiresAuth: true,
      is_restaurateur: true
    }
  },
  {
    path: '/EditRestaurant/:id',
    name: 'EditRestaurant',
    component: () => import('../views/Restaurants/EditResto.vue'),
    props: (route) => ({
      ...route.params
    }),
    meta: {
      requiresAuth: true,
      is_restaurateur: true
    }
  },
  {
    path: '/AddArticle/:id',
    name: 'AddArticle',
    component: () => import('../views/Articles/AddArticle.vue'),
    props: (route) => ({
      ...route.params
    }),
    meta: {
      requiresAuth: true,
      is_restaurateur: true
    }
  },
  {
    path: '/EditArticle/:id',
    name: 'EditArticle',
    component: () => import('../views/Articles/EditArticle.vue'),
    props: (route) => ({
      ...route.params
    }),
    meta: {
      requiresAuth: true,
      is_restaurateur: true
    }
  },
  {
    path: '/menuArticle/:id',
    name: 'menuArticle',
    component: () => import('../views/Restaurants/ArticleMenu.vue'),
    props: (route) => ({
      ...route.params
    }),
    meta: {
      requiresAuth: true,
      nothing: true
    }
  },
  {
    path: '/AddMenu/:id',
    name: 'AddMenu',
    component: () => import('../views/Menu/AddMenu.vue'),
    props: (route) => ({
      ...route.params
    }),
    meta: {
      requiresAuth: true,
      is_restaurateur: true
    }
  },
  {
    path: '/EditMenu/:id',
    name: 'EditMenu',
    component: () => import('../views/Menu/EditMenu.vue'),
    props: (route) => ({
      ...route.params
    }),
    meta: {
      requiresAuth: true,
      is_restaurateur: true
    }
  },
  {
    path: '/my-orders',
    name: 'MyOrders',
    component: () => import('../views/Users/Orders.vue'),
    meta: {
      requiresAuth: true,
      nothing: true
    }
  },
  {
    path: '/my-orders/:paidOrderId',
    name: 'PaidOrder',
    component: () => import('../views/Users/Orders.vue'),
    props: (route) => ({
      ...route.params
    }),
    meta: {
      requiresAuth: true,
      nothing: true
    }
  },
  {
    path: '/my-restaurant-orders',
    name: 'MyRestaurantOrders',
    component: () => import('../views/Restaurants/Orders.vue'),
    meta: {
      requiresAuth: true,
      is_restaurateur: true
    }
  },
  {
    path: '/orders-to-be-delivered',
    name: 'OrdersToBeDelivered',
    component: () => import('../views/DeleveryMan/Orders'),
    meta: {
      requiresAuth: true,
      is_livreur: true
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/Users/User.vue'),
    meta: {
      requiresAuth: true,
      nothing: true
    }
  },
  {
    path: '/EditUser/:id',
    name: 'EditUser',
    component: () => import('../views/Users/EditUser.vue'),
    props: (route) => ({
      ...route.params
    }),
    meta: {
      requiresAuth: true,
      nothing: true
    }
  },
  {
    path: '/Notifications',
    name: 'Notifications',
    component: () => import('../views/Users/Notification.vue'),
    meta: {
    requiresAuth: true,
      nothing: true
  }
  },
  {
    path: '/connectionLog',
    name: 'connectionLog',
    component: () => import('../views/Users/connectionLog.vue'),
    meta: {
      requiresAuth: true,
      is_Technique: true
    }
  },
  {
    path: '/Statistiques/:id',
    name: 'Statistiques',
    component: () => import('../views/Restaurants/Statistiques.vue'),
    meta: {
      requiresAuth: true,
      nothing: true
    },
    props: (route) => ({
      ...route.params
    })
  },
  {
    path: '/userManagement',
    name: 'userManagement',
    component: () => import('../views/Commercial/Users.vue'),
    meta: {
      requiresAuth: true,
      is_commercial: true
    }
  },
  {
    path: '/my-orders/deliverytracking/:orderId',
    name: 'deliveryTracking',
    component: () => import('../views/Users/DeliveryTracking.vue'),
    props: (route) => ({
      ...route.params
    }),
    meta: {
      requiresAuth: true,
      nothing: true
    }
  },
  {
    path: '/AddComposant',
    name: 'AddComposant',
    component: () => import('../views/Composants/AddComposant.vue'),
    meta: {
      requiresAuth: true,
      is_Technique: true
    }
  },
  {
    path: '/composants',
    name: 'composants',
    component: () => import('../views/Composants/Composants.vue'),
    meta: {
      requiresAuth: true,
      is_Technique: true
    }
  },
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (router.app.$session.get('token') === null) {
      next({
        path: '/',
        params: {nextUrl: to.fullPath}
      })
    } else {
      let userRole = JSON.parse(router.app.$session.get('user').roleId)
      if (to.matched.some(record => record.meta.is_restaurateur)) {
        if (userRole === 2 || userRole === 7) {
          console.log('resto')
          next()
        } else {
          next({name: 'Home'})
        }
      } else if (to.matched.some(record => record.meta.is_livreur)) {
        if (userRole === 3 || userRole === 7) {
          console.log('livreur')
          next()
        } else {
          next({name: 'Home'})
        }
      } else if (to.matched.some(record => record.meta.is_developpeur)) {
        if (userRole === 4 || userRole === 7) {
          console.log('develper')
          next()
        } else {
          next({name: 'Home'})
        }
      } else if (to.matched.some(record => record.meta.is_commercial)) {
        if (userRole === 5 || userRole === 7) {
          console.log('commerciale')
          next()
        } else {
          console.log('home')
          next({name: 'Home'})
        }
      } else if (to.matched.some(record => record.meta.is_Technique)) {
        if (userRole === 6 || userRole === 7) {
          console.log('technique')
          next()
        } else {
          next({name: 'Home'})
        }
      } else if (to.matched.some(record => record.meta.nothing)) {
        next()
      }
    }
  }
})
export default router
