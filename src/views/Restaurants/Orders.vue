<template>
  <div class="row">
    <p v-if="restaurateurRestaurantsOrders.length < 1" class="display-1"> Il n'y a pas de commande pour le moment</p>
    <div v-for="data in restaurateurRestaurantsOrders" :key="data.restaurant.id">
      <p class="display-1">{{ data.restaurant.name }}</p>

      <div v-for="order in sortData(data.orders)" :key="order.id">
        <OrderCard :isRestaurateur="true" class="ma-6" :order="order"></OrderCard>
      </div>

      <p v-if="data.orders.length <= 0"> Il n'y a pas encore de commande(s) dans votre restaurant. </p>
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
  methods: {
    sortData(data) {
      return _.orderBy(data, 'updatedAt', 'desc')
    }
  },
  computed: {
    ...mapGetters('orders', {
      restaurateurRestaurantsOrders: 'restaurateurRestaurantsOrders',
    }),
  }
}

</script>
