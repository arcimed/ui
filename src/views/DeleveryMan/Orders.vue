<template>
  <div class="col">
    <p v-if="ordersToDeliver.length > 0" class="display-2"> Vos commmandes à livrer </p>
    <div class="float-left" v-for="order in ordersToDeliver" :key="order.id">
      <OrderCard :isDeliveryMan="true" class="ma-6" :order="order"></OrderCard>
    </div>

    <p v-if="ordersSort.length > 0" class="display-2"> Toutes les commandes </p>
    <div class="float-left" v-for="order in ordersSort" :key="order.id">
      <OrderCard :isDeliveryMan="true" class="ma-6" :order="order"></OrderCard>
    </div>

    <p class="display-1" v-if="ordersSort.length <= 0 && ordersToDeliver.length <= 0"> Il n'y a pas de commande(s) à traitée(s). </p>
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

    let orderId = this.$route.query.orderId;

    if (orderId !== undefined) {
      this.$store.dispatch('orders/setDelivered', orderId)
      let username = this.$session.get('user').firstname;

      this.$http
          .get(`/api/order/` + orderId)
          .then(response => {
            let order = response.data.data;

            this.$store.dispatch('notifications/addOrderDelivered', {order, username})

            this.$toast.open({
              message: 'Vous avez livré la commande.',
              type: 'success'
            });

            this.$router.push({name: "Home"})
          })
          .catch(error => { console.log(error) })
    }
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
