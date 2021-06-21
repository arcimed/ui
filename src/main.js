import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Axios from 'axios'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

Axios.defaults.baseURL = 'http://localhost:3000/'
Vue.prototype.$http = Axios;
Vue.config.productionTip = false
Vue.use(VueToast);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')