import Vue from 'vue'
import Vuex from 'vuex'
import restaurants from './modules/restaurants'
import articles from './modules/articles'
import menus from './modules/menus'
import orders from './modules/orders'
import cart from './modules/cart'
import notifications from './modules/notifications'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    restaurants,
    articles,
    menus,
    orders,
    cart,
    notifications
  },
})
