<template>
  <div class="row">

    <v-stepper vertical>
      <v-stepper-step
          step="1"
          complete
      >
        Acceptée par le restaurant
      </v-stepper-step>

      <v-stepper-content step="1">

      </v-stepper-content>

      <v-stepper-step
          step="2"
          :complete="deliveryOrder.ordersStatusId >= statusOrders.validateByDelivery"
      >
        Acceptée par le livreur
      </v-stepper-step>

      <v-stepper-content step="2">

      </v-stepper-content>
      <v-stepper-step
          step="3"
          :complete="deliveryOrder.ordersStatusId >= statusOrders.inDelivery"
      >
        Récupérée par le livreur

      </v-stepper-step>

      <v-stepper-content step="3">

      </v-stepper-content>

      <v-stepper-step
          step="4"
          :complete="deliveryOrder.ordersStatusId === statusOrders.delivered"
      >
        Livrée chez vous

      </v-stepper-step>

      <v-stepper-content step="3">

      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
const {statusOrders} = require('@/config/statusOrders');

export default {
  props: ['orderId'],
  data() {
    return {
      statusOrders: statusOrders,
    }
  },
  mounted() {
    this.$store.dispatch('orders/setDeliveryOrder', this.orderId)
  },
  computed: {
    ...mapGetters('orders', {
      deliveryOrder: 'deliveryOrder',
    }),
  }
}

</script>
