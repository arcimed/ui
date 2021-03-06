<template>
  <v-card class="mx-auto" max-width="344" outlined color="grey lighten-4">
    <v-card-title>
      Order {{ order.id }}
      <br>
      Restaurant : {{ order.Restaurant.name }}
      <br>
      Client : {{ order.Restaurant.name }}
      <br>
      <format :value="order.Restaurant.createdAt" fn="dateTime" />
    </v-card-title>

    <v-data-table
        v-if="order.Articles.length > 0"
        :headers="headersArticles"
        class="elevation-1 ma-6 my-border"
        :hide-default-footer="true"
        :items="order.Articles"
    >
      <template v-slot:item="row">
        <tr>
          <td class="align-center">{{ row.item.name }}</td>
          <td>{{ row.item.TypesArticle.name }}</td>
          <td>{{ row.item.price.toFixed(2) }}</td>
          <td>{{ row.item.OrdersArticles.quantity }}</td>
        </tr>
      </template>
    </v-data-table>

    <v-data-table
        v-if="order.Menus.length > 0"
        :headers="headersMenus"
        class="elevation-1 ma-6 my-border"
        :hide-default-footer="true"
        :items="order.Menus"
    >
      <template v-slot:item="row">
        <tr>
          <td class="align-center">{{ row.item.name }}</td>
          <td>{{ row.item.price.toFixed(2) }}</td>
          <td>{{ row.item.OrdersMenus.quantity }}</td>
        </tr>
      </template>
    </v-data-table>

    <v-card-title>
      Price {{ calculteTotalPrice(order).toFixed(2) }} €
    </v-card-title>

    <v-card-text>Statut: {{ getStatusOrders(order.ordersStatusId) }} </v-card-text>

    <v-card-actions v-if="isRestaurateur">
      <div v-if="order.ordersStatusId === statusOrders.payed">
        <v-btn outlined rounded text @click="changeStatusOrder(order.Restaurant.id, order.id, statusOrders.validate)" >
          Valider
        </v-btn>
        <v-btn outlined rounded text @click="changeStatusOrder(order.Restaurant.id, order.id, statusOrders.refused)">
          Refuser
        </v-btn>
      </div>
      <div v-else-if="order.ordersStatusId === statusOrders.created">
        <v-card-text> En cours de paiement par le client. </v-card-text>
      </div>
      <div v-else-if="order.ordersStatusId === statusOrders.validate">
        <v-card-text> Vous avez validé cette commande. </v-card-text>
      </div>
      <div v-else-if="order.ordersStatusId === statusOrders.refused">
        <v-card-text> Vous avez refusé cette commande. </v-card-text>
      </div>
    </v-card-actions>
    <v-card-actions v-else-if="isUser">
      <v-btn v-if="order.ordersStatusId === statusOrders.created" outlined rounded text @click="checkout(calculteTotalPrice(order), order.id)">
        Payer
      </v-btn>
      <v-card-text v-else-if="order.ordersStatusId === statusOrders.payed"> En attente de la validation du restaurateur </v-card-text>
      <v-btn v-else-if="order.ordersStatusId !== statusOrders.refused" outlined rounded text @click="deliveryTracking(order.id)">
        Suivre la livraison
      </v-btn>
      <stripe-checkout
          ref="checkoutRef"
          mode="payment"
          :customer-email="customerEmail"
          :pk="publishableKey"
          :line-items="lineItems"
          :success-url="successURL"
          :cancel-url="cancelURL"
          @loading="v => loading = v"
      />
    </v-card-actions>
    <v-card-actions v-else-if="isDeliveryMan">
      <div v-if="order.ordersStatusId === statusOrders.validate">
        <v-btn outlined rounded text @click="setDeliveryManForOrder(order.id)">
          Accepter cette commande
        </v-btn>
      </div>
      <div v-else-if="order.ordersStatusId === statusOrders.validateByDelivery">
        <v-btn outlined rounded text @click="setRecoverByDeliveryMan()">
          Récupération de la commande
        </v-btn>
      </div>
      <div v-else-if="order.ordersStatusId === statusOrders.inDelivery">
        <v-btn outlined rounded text @click="setOrderDelivered()">
          Valider la livraison
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>

import { getStatusOrders, statusOrders } from "@/config/statusOrders";
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import format from "../../components/Format";

export default {
  name: "articleCard",
  components: {
    StripeCheckout,
    format
  },
  props: {
    order: {
      required: true
    },
    isUser: {},
    isRestaurateur: {},
    isDeliveryMan: {}
  },
  data () {
    return {
      customerEmail: 'ben@gmail.com',
      lineItems: [
        {
          price: "price_1J5CDbAIdUhQ9rssRBJyqwjl",
          quantity: 1,
        },
      ],
      publishableKey: "pk_test_51J5BqhAIdUhQ9rssf4vDCQMstDTpRc57tWVmhcfivnSCsh9I7IbbdbFXHTfksvvoh5wJkyuypgt2tcRtjU3l3VFp00LNrCkFCO",
      loading: false,
      successURL: 'https://localhost:8080/',
      cancelURL: 'https://localhost:8080/',
      statusOrders: statusOrders,
      getStatusOrders: getStatusOrders,
      headersArticles: [
        {
          text: 'Articles',
          align: 'start',
          value: 'name',
        },
        { text: 'Type' },
        { text: 'Prix' },
        { text: 'Quantité' },
      ],
      headersMenus: [
        {
          text: 'Menus',
          align: 'start',
          value: 'name',
        },
        { text: 'Prix' },
        { text: 'Quantité' },
      ],
      configReq: {
        headers: {
          'Authorization': `Bearer sk_test_51J5BqhAIdUhQ9rssiLVudyGEkjcUp8VsDla0qtmmw1ZwZ2tvfSPbPcH2YuvGsM2bd0ViicWw5qXsXidSqwc1U9WU001UVEfV5t`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, Authorization, X-Auth-Token',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS'
        }
      }
    }
  },
  methods: {
    deliveryTracking(orderId) {
      this.$router.push({name: "deliveryTracking", params: {orderId: orderId}})
    },
    calculteTotalPrice(order) {
      let totalPrice = 0;

      order.Articles.forEach(article => {
        totalPrice += (article.price * article.OrdersArticles.quantity);
      })

      order.Menus.forEach(menu => {
        totalPrice += (menu.price * menu.OrdersMenus.quantity);
      })

      return totalPrice;
    },

    changeStatusOrder(restaurantId, orderId, status) {
      this.$store.dispatch('orders/changeStatusOrder', { restaurantId, orderId, status })

      let order = this.order;
      this.$store.dispatch('notifications/addOrderChangeStatus', {order, status})

      this.$toast.open({
        message: 'Nouveau statut pour la commande: ' + getStatusOrders(status) + '.',
        type: 'success'
      });
    },

    setDeliveryManForOrder(orderId) {
      let status = statusOrders.inDelivery;
      let order = this.order;
      let userId = this.$session.get('user').id;
      this.$store.dispatch('orders/setDeliveryManForOrder', { orderId, userId, status })

      let username = this.$session.get('user').firstname;
      this.$store.dispatch('notifications/addDeliveryManAccept', { order, username })

      this.$toast.open({
        message: 'Vous avez pris en charge la commande.',
        type: 'success'
      });
    },

    setRecoverByDeliveryMan() {
      this.$store.dispatch('orders/setRecoverByDeliveryMan', this.order.id)

      let order = this.order;
      let username = this.$session.get('user').firstname;
      this.$store.dispatch('notifications/addOrderInDelivery', { order, username })

      this.$toast.open({
        message: 'Vous avez récupéré la commande.',
        type: 'success'
      });
    },

    setOrderDelivered() {
      this.$store.dispatch('orders/setDelivered', this.order.id)

      let order = this.order;
      let username = this.$session.get('user').firstname;
      this.$store.dispatch('notifications/addOrderDelivered', { order, username })

      this.$toast.open({
        message: 'Vous avez livré la commande.',
        type: 'success'
      });
    },

    async checkout(totalPriceCart, orderId) {
      await this.checkIfPriceAlreadyExist(totalPriceCart).then(result => {

        if (!result) {
          const params = new URLSearchParams()
          params.append('unit_amount', parseInt(totalPriceCart*100))
          params.append('currency', 'eur')
          params.append('product', 'prod_JidUmPpwcZe3Bt')

          this.$http
              .post('https://api.stripe.com/v1/prices', params, this.configReq)
              .then(response => {
                this.$refs.checkoutRef.lineItems[0].price = response.data.id
              })

        } else {
          this.$refs.checkoutRef.lineItems[0].price = result
        }

          this.$refs.checkoutRef.successUrl = String('https://localhost:8080/my-orders/' + orderId);
          this.$refs.checkoutRef.redirectToCheckout();
      })
    },

    async checkIfPriceAlreadyExist(totalPriceCart) {
      return await this.$http
          .get('https://api.stripe.com/v1/prices', this.configReq)
          .then(response => {
            let result = false;

            response.data.data.forEach(priceObj => {
              if (parseInt(priceObj.unit_amount) === parseInt(totalPriceCart*100)) {
                result = priceObj.id;
              }
            })

            return result;
          }).catch(error => {return false})
    }
  }
}

</script>

<style>
.my-border {
  border-left: 5px solid red;
}
</style>
