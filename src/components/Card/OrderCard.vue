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
      Price {{ calculteTotalPrice().toFixed(2) }} €
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
      <v-btn v-if="!order.isPay" outlined rounded text @click="validateOrder(order.id)">
        Payer
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>

import { getStatusOrders, statusOrders } from "@/config/statusOrders";

export default {
  name: "articleCard",
  props: {
    order: {
      required: true
    },
    isRestaurateur: {}
  },
  data () {
    return {
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
      ]
    }
  },
  methods: {
    calculteTotalPrice() {
      let totalPrice = 0;

      this.order.Articles.forEach(article => {
        totalPrice += article.price;
      })

      this.order.Menus.forEach(menu => {
        totalPrice += menu.price;
      })

      return totalPrice;
    },

    changeStatusOrder(restaurantId, orderId, status) {
      this.$store.dispatch('orders/changeStatusOrder', { restaurantId, orderId, status })
    }
  }
}

</script>

<style>
.my-border {
  border-left: 5px solid red;
}
</style>
