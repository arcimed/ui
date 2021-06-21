<template>
  <nav>
    <v-app-bar color="deep-purple" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <span class="font-weight-light">Cesi</span>
        <span>TonPlat</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-title v-if="this.$session.exists()" class="mr-5">
        <span>Bonjour, </span>
        <span class="font-weight-black">{{ this.$session.get('user').firstname }}</span>
      </v-toolbar-title>
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

export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: 'mdi-home', text: 'Produits', route: '/' },
        { icon: 'mdi-cart', text: 'Panier', route: '/cart' },
      ],
      snackbar: false
    }
  },
  methods: {
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
    }
  }
}

</script>
