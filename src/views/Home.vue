<template>
  <div>
    <v-btn @click="addRestaurant" v-if="this.$session.exists() && (this.$session.get('user').roleId === statusRoles.Restaurateur || parseInt(this.$session.get('user').roleId) === statusRoles.Admin)">
      Ajout de restaurant
    </v-btn>
    <div class="row" v-if="this.$session.exists()">
      <div v-for="restaurant in restaurants" :key="restaurant.name">
        <RestaurantCard :restaurant="restaurant"></RestaurantCard>
      </div>
    </div>
    <div class="col" v-else>
      <p class="display-2">Bienvenue sur CesiTonPlat</p>
      <p class="display-1">Veuillez vous connecter ou créer un nouveau compte.</p>
    </div>
  </div>
</template>

<script>

import RestaurantCard from '../components/Card/RestaurantCard.vue'
import { mapGetters } from 'vuex'
const {statusRoles} = require('@/config/statusRoles');

export default {
  name: 'Home',
  data() {
    return {
      statusRoles: statusRoles,
    }
  },
  components: {
    RestaurantCard,
  },
  computed: {
    ...mapGetters('restaurants', {
      restaurants: 'restaurants',
    })
  },
  methods:{
    addRestaurant() {
      this.$router.push({name: 'AddRestaurant'})
    },
  }
}

</script>
