<template>
  <v-card class="mx-auto" max-width="344" outlined color="grey lighten-4">
    <v-card-title>
      Order {{ order.id }}
      <br>
      Restaurant : {{ order.Restaurant.name }}
      <br>
      Client : {{ order.Restaurant.name }}
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
        </tr>
      </template>
    </v-data-table>

    <v-card-title>
      Price {{ calculteTotalPrice(order).toFixed(2) }} €
    </v-card-title>

    <v-card-text>Statut: {{ getStatusOrders(order.ordersStatusId) }} </v-card-text>

    <v-card-actions v-if="isRestaurateur">
      <div v-if="order.ordersStatusId === statusOrders.created">
        <v-btn outlined rounded text @click="changeStatusOrder(order.Restaurant.id, order.id, statusOrders.validate)" >
          Valider
        </v-btn>
        <v-btn outlined rounded text @click="changeStatusOrder(order.Restaurant.id, order.id, statusOrders.refused)">
          Refuser
        </v-btn>
      </div>
    </v-card-actions>

    <v-card-actions v-else>
      <v-btn v-if="!order.isPaid" outlined rounded text @click="checkout(calculteTotalPrice(order), order.id)">
        Payer
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

  </v-card>
</template>

<script>

import { getStatusOrders, statusOrders } from "@/config/statusOrders";
import { StripeCheckout } from '@vue-stripe/vue-stripe';

export default {
  name: "articleCard",
  components: {
    StripeCheckout,
  },
  props: {
    order: {
      required: true
    },
    isRestaurateur: {}
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
      ],
      headersMenus: [
        {
          text: 'Menus',
          align: 'start',
          value: 'name',
        },
        { text: 'Prix' },
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
    calculteTotalPrice(order) {
      let totalPrice = 0;

      order.Articles.forEach(article => {
        totalPrice += article.price;
      })

      order.Menus.forEach(menu => {
        totalPrice += menu.price;
      })

      return totalPrice;
    },

    changeStatusOrder(restaurantId, orderId, status) {
      this.$store.dispatch('orders/changeStatusOrder', { restaurantId, orderId, status })
    },

    paidOrder(orderId) {
      this.$store.dispatch('orders/setPaidOrder', orderId)
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
