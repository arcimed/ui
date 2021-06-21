import Vue from 'vue'
import Vuex from 'vuex'
import restaurants from './modules/restaurants'
import articles from './modules/articles'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    restaurants,
    articles
  },
})
