<template>
  <v-card class="mx-auto" max-width="344" outlined color="grey lighten-4">
    <v-card-title>
      Order {{ order.id }}
      <v-spacer></v-spacer>
      Restaurant : {{ order.Restaurant.name }}
    </v-card-title>

    <v-data-table
          :headers="headersArticles"
          :items="order.Articles"
          item-key="name"
          class="elevation-1 ma-6 my-border"
          :hide-default-footer="true"
          :footer-props="{
      showFirstLastPage: true,
    }"></v-data-table>
    <v-data-table
        :headers="headersMenus"
        :items="order.Menus"
        item-key="name"
        class="elevation-1 ma-6 my-border"
        :hide-default-footer="true"
        :footer-props="{
      showFirstLastPage: true,
    }"></v-data-table>

    <v-card-title>
      Price {{ calculteTotalPrice() }} €
    </v-card-title>

    <v-card-actions>
      <v-btn outlined rounded text>
        Selectionner
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: "articleCard",
  props: ['order'],
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
    calculteTotalPrice() {
      let totalPrice = 0;

      this.order.Articles.forEach(article => {
        totalPrice += article.price;
      })

      this.order.Menus.forEach(menu => {
        totalPrice += menu.price;
      })

      return totalPrice;
    }
  }
}

</script>

<style>
.my-border {
  border-left: 5px solid red;
}
</style>
