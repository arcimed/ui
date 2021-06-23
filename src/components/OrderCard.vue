<template>
  <v-card class="mx-auto" max-width="344" outlined color="grey lighten-4">
    <v-card-title>
      Order {{ order.id }}
      <br>
      Restaurant : {{ order.Restaurant.name }}
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
    }
  }
}

</script>

<style>
.my-border {
  border-left: 5px solid red;
}
</style>
