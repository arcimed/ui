<template>
  <div class="row">
    <div v-for="order in ordersSort" :key="order.id">
      <OrderCard :isUser="true" class="ma-6" :order="order"></OrderCard>
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
  mounted() {
    this.$store.dispatch('orders/setOrders', this.$session.get('user').id)

    if (this.paidOrderId !== undefined && this.paidOrderId.length > 0) {
      let orderIds = this.paidOrderId.split(",");

      setTimeout(() => {
        for (const orderId of orderIds) {
          let order = this.orders.find(orderItem => orderItem.id === parseInt(orderId))
          let username = this.$session.get('user').firstname + ' ' + this.$session.get('user').lastname

          this.$store.dispatch('orders/setPaidOrder', orderId)
          this.$store.dispatch('notifications/addCartPayed', {order, username})

          this.$toast.open({
            message: 'Vous avez payé la commande ' + orderId + '.',
            type: 'success'
          });
        }
      }, 1500);

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
