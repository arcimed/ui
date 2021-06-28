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
              v-if="restaurantCart.articlesCart.length > 0"
              :headers="headersArticles"
              class="elevation-1"
              :hide-default-footer="true"
              :items="restaurantCart.articlesCart"
          >
            <template v-slot:item="row">
              <tr>
                <td class="align-center">{{ row.item.article.name }}</td>
                <td>{{ row.item.article.TypesArticle.id }}</td>
                <td>{{ row.item.article.price.toFixed(2) }}</td>
                <td>{{ row.item.quantity }}</td>
                <td>
                  <v-icon @click="deleteArticle(restaurantCart.restaurant.id, row.item.article.id)">mdi-delete</v-icon>
                </td>
              </tr>
            </template>
          </v-data-table>

          <v-data-table
              v-if="restaurantCart.menusCart.length > 0"
              :headers="headersMenus"
              class="elevation-1"
              :hide-default-footer="true"
              :items="restaurantCart.menusCart"
          >
            <template v-slot:item="row">
              <tr>
                <td class="align-center">{{ row.item.menu.name }}</td>
                <td>{{ row.item.menu.price.toFixed(2) }}</td>
                <td>{{ row.item.quantity }}</td>
                <td>
                  <v-icon @click="deleteMenu(restaurantCart.restaurant.id, row.item.menu.id)">mdi-delete</v-icon>
                </td>
              </tr>
            </template>
          </v-data-table>

        </v-list-item-content>
      </v-list-item>
    </v-list>

    Total: {{ totalPriceCart }} €

    <v-btn class="mt-3" :disabled="!restaurantsCart.length" @click="checkout(restaurantsCart, totalPriceCart)"> Commander </v-btn>
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
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";
import {StripeCheckout} from '@vue-stripe/vue-stripe';

export default {
  components: {
    StripeCheckout,
  },
  computed: {
    ...mapGetters('cart', {
      restaurantsCart: 'restaurantsCart',
      totalPriceCart: 'totalCartPrice',
    }),
    ...mapGetters('restaurants', {
      restaurants: 'restaurants',
    })
  },
  data() {
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
      configReq: {
        headers: {
          'Authorization': `Bearer sk_test_51J5BqhAIdUhQ9rssiLVudyGEkjcUp8VsDla0qtmmw1ZwZ2tvfSPbPcH2YuvGsM2bd0ViicWw5qXsXidSqwc1U9WU001UVEfV5t`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, Authorization, X-Auth-Token',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS'
        }
      },
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
      ]
    }
  },
  methods: {
    deleteArticle(restaurantCartId, articleId) {
      this.$store.dispatch('cart/deleteArticleToCart', {restaurantCartId , articleId})
    },
    deleteMenu(restaurantCartId, menuId) {
      this.$store.dispatch('cart/deleteMenuToCart', {restaurantCartId , menuId})
    },
    async checkout(restaurantsCart, totalPriceCart) {

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

        let user = this.$session.get('user');
        let userId = user.id;
        this.$store.dispatch('cart/checkout', {restaurantsCart , userId })

        let userName = user.firstname + ' ' + user.lastname;
        this.$store.dispatch('notifications/addCartCreated', { restaurantsCart, userName })

        setTimeout(() => {
          this.$refs.checkoutRef.successUrl = String('https://localhost:8080/my-orders/'
              + String( this.$store.getters['cart/orderRegistered'].ordersIds));
          this.$refs.checkoutRef.redirectToCheckout();
          }, 1500);
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
