<template>
  <nav>
    <v-app-bar color="deep-purple" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title @click="home">
        <v-btn @click="openNotifications" text class="mr-4">
          <span :ripple="false" class="font-weight-light"> Cesi</span>
          <span>TonPlat</span>
        </v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-title v-if="this.$session.exists()" class="mr-5">
        <span>Bonjour, </span>
        <span class="font-weight-black">{{ this.$session.get('user').firstname }}</span>
      </v-toolbar-title>
        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
              >
                <v-icon class="mr-4" style="margin-left: 15px">mdi-account</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                  :to="item.route"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>


      <v-btn @click="openNotifications" text class="mr-4">
        <notification-bell
            class="pr-2"
            :count="count"
            :iconColor="white"
            :size="size"
            :ding="true"
            :animated="true"
        />
      </v-btn>

      <v-btn @click="destroySession" v-if="this.$session.exists()">
        <span class="mr-2">Déconnection</span>
      </v-btn>
      <v-btn @click="showLogRegisterModal" v-else>
        <span class="mr-2">Connection/Inscription</span>
      </v-btn>

    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>

import NotificationBell from 'vue-notification-bell'

export default {
  components: {
    NotificationBell
  },
  data() {
    return {
      count: 1,
      drawer: false,
      links: [
        { icon: 'mdi-home', text: 'Produits', route: '/' },
        { icon: 'mdi-cart', text: 'Panier', route: '/cart' },
      ],
      snackbar: false,
      white: "white",
      size: 20,
      items: [
        { title: 'Orders', route: '/my-orders'},
        { title: 'User', route: '/user' },
      ],
    }
  },
  methods: {
    openNotifications() {
      console.log('3')
    },
    showLogRegisterModal() {
      this.$emit('showLogRegisterModal');
    },
    destroySession() {
      this.$session.destroy()
      this.$http.defaults.headers.common = {'Authorization': ``}

      if(this.$route.name === 'Home') {
        this.$router.go()
      } else {
        this.$router.push({ name: 'Home'})
        this.$router.go()
      }
    },
    myOrders() {
      if(this.$route.name === 'MyOrders') {
        this.$router.go()
      } else {
        this.$router.push({name: 'MyOrders'});
      }
    },
    home() {
      if(this.$route.name === 'Home') {
        this.$router.go()
      } else {
        this.$router.push({name: 'Home'});
      }
    }
  }
}

</script>
