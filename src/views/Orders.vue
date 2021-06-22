<template>
  <div class="row">
    <div v-for="order in orders" :key="order.id">
      <OrderCard class="ma-6" :order="order"></OrderCard>
    </div>
  </div>
</template>

<script>

import OrderCard from '../components/OrderCard.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    OrderCard,
  },
  mounted() {
    this.$store.dispatch('orders/setOrders', this.$session.get('user').id);
  },
  computed: {
    ...mapGetters('orders', {
      orders: 'orders',
    })
  }
}

</script>
