<template>
  <v-container class="grey">
    <template>
      <p class="display-2"> Panier </p>
    </template>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item v-for="restaurantCart in restaurantsCart" :key="restaurantsCart.id">
        <v-list-item-content>
          <v-list-item-title>{{ restaurantCart.restaurant.name }}</v-list-item-title>

          <v-data-table
              :headers="headersArticles"
              :items="restaurantCart.articlesCart"
              item-key="name"
              class="elevation-1"
              :hide-default-footer="true"
              :footer-props="{
            showFirstLastPage: true,
          }"></v-data-table>
          <v-data-table
              :headers="headersMenus"
              :items="restaurantCart.menusCart"
              item-key="name"
              class="elevation-1"
              :hide-default-footer="true"
              :footer-props="{
            showFirstLastPage: true,
          }"></v-data-table>

        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-btn class="mt-3" :disabled="!restaurantsCart.length" @click="checkout(restaurantsCart)"> Commander </v-btn>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters('cart', {
      restaurantsCart: 'restaurantsCart',
    }),
    ...mapGetters('restaurants', {
      restaurants: 'restaurants',
    })
  },
  data () {
    return {
      headersArticles: [
        {
          text: 'Articles',
          align: 'start',
          value: 'name',
        },
        { text: 'Prix', value: 'price' },
      ],
      headersMenus: [
        {
          text: 'Menus',
          align: 'start',
          value: 'name',
        },
        { text: 'Prix', value: 'price' },
      ]
    }
  },
  methods: {
    checkout (restaurantsCart) {
      let userId = this.$session.get('user').id;
      this.$store.dispatch('cart/checkout', { restaurantsCart, userId})
    }
  }
}
</script>
