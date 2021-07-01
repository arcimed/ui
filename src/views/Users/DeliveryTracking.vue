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
    <div class="col">
      <vue-qr v-if="deliveryOrder.ordersStatusId === statusOrders.inDelivery" :text="actualRoute" qid="ValidDelivery"></vue-qr>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
const {statusOrders} = require('@/config/statusOrders');
import VueQr from 'vue-qr'

export default {
  components: {VueQr},
  props: ['orderId'],
  data() {
    return {
      statusOrders: statusOrders,
      actualRoute: 'https://localhost:8080/orders-to-be-delivered/?orderId=' + this.orderId
    }
  },
  mounted() {
    this.$store.dispatch('orders/setDeliveryOrder', this.orderId)
  },
  computed: {
    ...mapGetters('orders', {
      deliveryOrder: 'deliveryOrder',
    }),
  },
  sockets: {
    changeStatusOrder: function (orderId) {
      if (this.orderId === parseInt(orderId)) {
        this.$store.dispatch('orders/setDeliveryOrder', this.orderId)
      }
    }
  }
}

</script>
