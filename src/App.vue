<template>
  <v-app>
    <Navbar @openDialog="toggleForm"/>
    <v-main class="ma-10">
      <createAccount @closeDialog="toggleForm" v-if="login"></createAccount>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import Navbar from './components/Navbar';
import CreateAccount from './components/CreateAccount';
import Vue from 'vue';
import VueSession from 'vue-session'
Vue.use(VueSession)

export default Vue.extend({
  name: 'App',
  components: { CreateAccount, Navbar },
  data() {
    return {
      login: false,
    };
  },
  methods: {
    toggleForm() {
      this.login = !this.login;
    },
  },
  beforeMount() {
    this.$http.defaults.headers.common['Authorization'] = this.$session.get('token')
    this.$http.defaults.headers.post['Content-Type'] = 'application/json';
  }
});
</script>
