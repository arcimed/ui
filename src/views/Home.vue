<template>
  <div>
    <v-btn @click="addRestaurant" v-if="this.$session.get('user').roleId === 2">
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

export default {
  name: 'Home',
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
