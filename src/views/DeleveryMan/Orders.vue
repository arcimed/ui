<template>
  <div class="row">
    <p v-if="ordersToDeliver.length > 0" class="display-1"> Vos commmandes à livrer </p>
    <div v-for="order in ordersToDeliver" :key="order.id">
      <OrderCard :isDeliveryMan="true" class="ma-6" :order="order"></OrderCard>
    </div>
    <p v-if="ordersSort.length > 0" class="display-1"> Toutes les commandes </p>
    <div v-for="order in ordersSort" :key="order.id">
      <OrderCard :isDeliveryMan="true" class="ma-6" :order="order"></OrderCard>
    </div>
  </div>

</template>


<script>

import OrderCard from '../../components/Card/OrderCard.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'OrdersToBeDelivered',
  components: {
    OrderCard,
  },
  mounted() {
    this.$store.dispatch('orders/setDeliveryManOrders');
    this.$store.dispatch('orders/setDeliveryManOrdersToDeliver', this.$session.get('user').id);
  },
  computed: {
    ...mapGetters('orders', {
      orders: 'deliveryManOrders',
      ordersToDeliver: 'deliveryManOrdersToDeliver',
    }),
    ordersSort: function () {
      return _.orderBy(this.orders, 'updatedAt', 'desc')
    }
  }
}

</script>
