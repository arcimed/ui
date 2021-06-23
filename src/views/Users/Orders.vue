<template>
  <div class="row">
    <div v-for="order in ordersSort" :key="order.id">
      <OrderCard :isRestaurateur="false" class="ma-6" :order="order"></OrderCard>
    </div>
  </div>
</template>

<script>

import OrderCard from '../../components/Card/OrderCard.vue'
import { mapGetters } from 'vuex'
const _ = require('lodash')

export default {
  props: ['paidOrderId'],
  components: {
    OrderCard,
  },
  async mounted() {
    this.$store.dispatch('orders/setOrders', this.$session.get('user').id);

    if (this.paidOrderId !== undefined) {
      await this.$store.dispatch('orders/setPaidOrder', this.paidOrderId)

      this.$router.push({name: "MyOrders"})
    }
  },
  computed: {
    ...mapGetters('orders', {
      orders: 'orders',
    }),

    ordersSort: function () {
      return _.orderBy(this.orders, 'updatedAt', 'desc')
    }
  }
}

</script>
