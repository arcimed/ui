<template>
  <v-app>
    <Navbar @showLogRegisterModal="logRegisterModal"/>
    <v-main>
      <createAccount @hideLogRegisterModal="logRegisterModal" v-if="login"></createAccount>
      <v-container>
        <v-row>
          <v-col class="ma-10">
            <router-view/>
          </v-col>
          <v-col>
            <Cart/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import Navbar from './components/Navbar';
import CreateAccount from './components/CreateAccount';
import Cart from "@/components/Cart";
import Vue from 'vue';
import VueSession from 'vue-session'

Vue.use(VueSession)

export default Vue.extend({
  name: 'App',
  components: { CreateAccount, Navbar, Cart },
  data() {
    return {
      login: false,
    };
  },
  methods: {
    logRegisterModal() {
      this.login = !this.login;
    },
  },
  beforeMount() {
    this.$http.defaults.headers.common['Authorization'] = this.$session.get('token')
    this.$http.defaults.headers.post['Content-Type'] = 'application/json';
  },
  mounted() {
    this.$store.dispatch('restaurants/setRestaurants', this);
  }
});

</script>
