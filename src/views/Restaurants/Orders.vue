<template>
  <div class="row">
    <div v-for="data in restaurateurRestaurantsOrders" :key="data.restaurant.id">
      {{ data.restaurant.name }}

      <div v-for="order in data.orders" :key="order.id">
        <OrderCard :isRestaurateur="true" class="ma-6" :order="order"></OrderCard>
      </div>
    </div>
  </div>
</template>

<script>

import OrderCard from '../../components/Card/OrderCard.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'MyRestaurantOrders',
  components: {
    OrderCard,
  },
  mounted() {
    this.$store.dispatch('orders/setRestaurateurOrders', this.$session.get('user').id);
  },
  computed: {
    ...mapGetters('orders', {
      restaurateurRestaurantsOrders: 'restaurateurRestaurantsOrders',
    })
  }
}

</script>
