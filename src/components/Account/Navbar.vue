<template>
  <nav>
    <v-app-bar color="deep-purple" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title @click="home">
        <v-btn text class="mr-4">
          <span :ripple="false" class="font-weight-light"> Cesi</span>
          <span>TonPlat</span>
        </v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-title v-if="this.$session.exists()" class="mr-5">
        <span>Bonjour, </span>
        <span class="font-weight-black">{{ this.$session.get('user').firstname }}</span>
      </v-toolbar-title>
        <v-btn
            class="mx-2"
            fab
            dark
            small
            color="primary"
            :to="'/user'"
        >
          <v-icon  class="mr-4" style="margin-left: 15px">mdi-account</v-icon>
        </v-btn>
      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn @click="openNotifications()" text class="mr-4"  v-bind="attrs" v-on="on">
              <notification-bell
                  class="pr-2"
                  :count="count"
                  :iconColor="white"
                  :size="size"
                  :animated="true"
              />
            </v-btn>
          </template>
          <v-list three-line>
            <v-subheader
                :key="'Notification'"
                v-text="'Notification'"
            ></v-subheader>
            <template v-for="(notification, index) in ordersSort">
              <template v-if="index <= 4">
                <v-divider
                    :key="index"
                    :inset="true"
                ></v-divider>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title v-html="notification.title"></v-list-item-title>
                    <v-list-item-subtitle v-html="notification.description"></v-list-item-subtitle>
                    <v-list-item-subtitle v-html="notification.updatedAt"></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-icon>
                      <v-btn class="mx-1" fab dark @click="linkNotifications(notification.url)" color="primary">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                  </v-list-item-icon>
                </v-list-item>
              </template>
            </template>
            <v-list-item>
              <v-list-item-content>
                <router-link to="/Notifications">
                <v-list-item-title >Voir plus</v-list-item-title>
                </router-link>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

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
import {mapGetters} from "vuex";
import axios from "axios";
const {statusRoles} = require('@/config/statusRoles');
const _ = require('lodash')

export default {
  components: {
    NotificationBell
  },
  data() {
    return {
      count: this.numberNotifications,
      divider: true,
      statusRoles: statusRoles,
      drawer: false,
      links: [
        { icon: 'mdi-home', text: 'Produits', route: '/' },
      ],
      snackbar: false,
      white: "white",
      size: 20,
    }
  },
  mounted() {
    this.$store.dispatch('notifications/setNotifications', this.$session.get('user').id);
    axios.get(`api/notifications/count/` + this.$session.get('user').id)
        .then((response) => {
          this.count = response.data.data
        }).catch()
    let roleUser = this.$session.get('user').roleId
    switch (roleUser) {
      case statusRoles.User:
        this.links.push({ icon: 'mdi-order-alphabetical-ascending', text: 'mes commandes', route: '/my-orders'})
        break
      case statusRoles.Restaurateur:
        this.links.push({ icon: 'mdi-order-alphabetical-ascending', text: 'mes commandes', route: '/my-orders'})
        this.links.push({ icon: 'mdi-chart-line', text: 'Statistiques', route: '/Statistiques/' + this.$session.get('user').id  })
        this.links.push({ icon: 'mdi-order-bool-ascending-variant', text: 'MyRestaurantOrders', route: '/my-restaurant-orders'})

        break
      case statusRoles.Livreur:
        this.links.push({ icon: 'mdi-truck-delivery', text: 'Order to be delivered', route: '/orders-to-be-delivered'})
        break
      case statusRoles.Developpeur:

        break
      case statusRoles.Commercial:
        this.links.push({ icon: 'mdi-account-multiple-outline', text: 'UserManagement', route: '/userManagement' })
        break
      case statusRoles.Technique:
        this.links.push({ icon: 'mdi-history', text: 'log de connexion', route: '/connectionLog' })
        this.links.push({ icon: 'mdi-view-compact', text: 'Composants', route: '/composants' })
        this.links.push({ icon: 'mdi-history', text: 'Composants', route: '/composantsLog' })


        break
      case statusRoles.Admin:
        this.links.push({ icon: 'mdi-order-alphabetical-ascending', text: 'mes commandes', route: '/my-orders'})
        this.links.push({ icon: 'mdi-chart-line', text: 'Statistiques', route: '/Statistiques/' + this.$session.get('user').id  })
        this.links.push({ icon: 'mdi-order-bool-ascending-variant', text: 'MyRestaurantOrders', route: '/my-restaurant-orders'})
        this.links.push({ icon: 'mdi-truck-delivery', text: 'Order to be delivered', route: '/orders-to-be-delivered'})
        this.links.push({ icon: 'mdi-account-multiple-outline', text: 'UserManagement', route: '/userManagement' })
        this.links.push({ icon: 'mdi-history', text: 'log de connexion', route: '/connectionLog' })
        this.links.push({ icon: 'mdi-view-compact', text: 'Composants', route: '/composants' })
        this.links.push({ icon: 'mdi-history', text: 'log de téléchargement de composants', route: '/composantsLog' })
        break
    }
  },
  computed: {
    ...mapGetters('notifications', {
      notifications: 'notifications',
    }),
    ordersSort: function () {
      return _.orderBy(this.notifications, 'updatedAt', 'desc')
    },
    ...mapGetters('notifications', {
      numberNotifications: 'numberNotifications',
    }),
  },
  methods: {
    openNotifications() {
      this.$store.dispatch('notifications/SeenNotification', this.$session.get('user').id);
      this.count = 0;
    },
    linkNotifications(url) {
      if (this.$route.fullPath !== url){
        this.$router.push({ path: url})
      } else {
        this.$router.go()
      }
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
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    newNotification: function(notification){
      if (this.$session.get("user").id === parseInt(notification.userId)) {
        this.count += 1;
      }
    }
  },
}

</script>
