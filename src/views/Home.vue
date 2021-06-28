<template>
  <div>
    <v-btn @click="addRestaurant" v-if="this.$session.get('user').roleId === statusRoles.Restaurateur || parseInt(this.$session.get('user').roleId) === statusRoles.Admin">
      Ajout de restaurant
    </v-btn>
    <div class="row">
      <div v-for="restaurant in restaurants" :key="restaurant.name">
        <RestaurantCard :restaurant="restaurant"></RestaurantCard>
      </div>
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
