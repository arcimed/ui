<template>
  <div class="row">
    <div v-for="restaurant in restaurants" :key="restaurant.name">
      <RestaurantCard :restaurant="restaurant"></RestaurantCard>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import RestaurantCard from '../components/RestaurantCard.vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  name: 'Home',
  components: {
    RestaurantCard,
  },
  mounted() {
    this.$store.dispatch('restaurants/setRestaurants', this);
  },
  computed: {
    ...mapGetters('restaurants', {
      restaurants: 'allRestaurants',
    })
  }
})

</script>
