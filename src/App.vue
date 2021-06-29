<template>
  <v-app>
    <Navbar @showLogRegisterModal="logRegisterModal"/>
    <v-main>
      <createAccount
          :referralCode="this.$route.query.referralCode"
          :emailRef="this.$route.query.email"
          :role="this.$route.query.role"
          @hideLogRegisterModal="logRegisterModal"
          v-if="login"
      >
      </createAccount>
      <v-container>
        <v-row>
          <v-col class="ma-10">
            <router-view/>
          </v-col>
          <v-col v-if="this.$session.exists() && this.$session.get('user').roleId === roleUser">
            <Cart/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CreateAccount from './components/Account/CreateAccount';
import Cart from "@/components/Cart";
import Vue from 'vue';
import VueSession from 'vue-session'
import {statusRoles} from "@/config/statusRoles";

Vue.use(VueSession)

export default Vue.extend({
  name: 'App',
  components: { CreateAccount, Navbar, Cart, Footer },
  data() {
    return {
      login: false,
      roleUser: statusRoles.User
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
    if (this.$route.query.referralCode) {
      this.login = true;
    }
    this.$store.dispatch('restaurants/setRestaurants', this);
  }
});

</script>
