<template>
  <div class="row">
    <div v-for="restaurant in restaurants" :key="restaurant.name">
      <RestaurantCard :restaurant="restaurant"></RestaurantCard>
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
  }
}

</script>
