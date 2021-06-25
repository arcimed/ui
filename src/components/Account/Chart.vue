<template>
  <div>
    <p> {{ this.charts.restaurant.name }}</p>
    <v-data-table
        :headers="orderHeaders"
        :items="stats"
        class="elevation-1"
    >
      <template v-slot:header.name="{ header }">
        {{ header.text.toUpperCase() }}
      </template>
    </v-data-table>
    <v-sheet
        class="v-sheet--offset mx-auto"
        color="cyan"
        elevation="12"
        max-width="calc(100% - 32px)"
    >
      <v-sparkline
          :labels="labels"
          :value="value"
          color="white"
          line-width="2"
          padding="16"
      ></v-sparkline>
    </v-sheet>
    <v-data-table
        :headers="headers"
        :items="priceCount"
        class="elevation-1"
    >
      <template v-slot:header.name="{ header }">
        {{ header.text.toUpperCase() }}
      </template>
    </v-data-table>
    <v-divider inset></v-divider>
  </div>
</template>

<script>
export default {
  name: "Chart",
  props: {
    charts: {
      required: true
    },
  },
  data() {
    return {
      orderHeaders: [
        {
          text: 'Status de commande',
          align: 'start',
          value: 'name',
        },
        {text: 'Créée', value: 'cree'},
        {text: 'En livraison', value: 'livraison'},
        {text: 'Livrée', value: 'livrer'},
        {text: 'Refusée', value: 'refuser'},
        {text: 'Validée', value: 'valider'},
      ],
      headers: [
        {
          text: 'Revenue',
          align: 'start',
          value: 'name',
        },
        {text: 'Janvier', value: 'janvier'},
        {text: 'Février', value: 'fevrier'},
        {text: 'Mars', value: 'mars'},
        {text: 'Avril', value: 'avril'},
        {text: 'Mai', value: 'mai'},
        {text: 'Juin', value: 'juin'},
        {text: 'Juillet', value: 'juillet'},
      ],
      stats: [],
      labels: [
        'Jan',
        'Fev',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Aout',
        'Sept',
        'Nov',
        'Dec',
      ],
      value: [
          0,
          0,
          0,
          0,
          0,
          0,
      ],
      priceCount: []
    }
  },
  mounted() {
    this.stat()
  },
  methods: {
    stat() {
      let tempCree = 0
      let tempValider = 0
      let tempRefuser = 0
      let tempLivraison = 0
      let tempLivrer = 0
      let tempPrice = 0
      this.value.push(this.charts.orders.length)
      this.charts.orders.forEach((order, index) => {
        switch (order.ordersStatusId) {
          case 1:
             tempCree++
            break
          case 2:
            tempValider++
            break
          case 3:
            tempRefuser++
            break
          case 4:
            tempLivraison++
            break
          case 5:
            tempLivrer++
                break
        }
        order.Articles.forEach((article, index) => {
          tempPrice += article.price
        })
        order.Menus.forEach((menu, index) => {
          tempPrice += menu.price
        })
      })
      let price = {name: 'Revenue du restaurant', janvier: '0€', fevrier: '0€', mars: '0€', avril: '0€', mai: '0€', juin: '0€', juillet: tempPrice+'€'}
      let donne = {name: 'Nombre de commande', cree: tempCree, livraison: tempLivraison, livrer: tempLivrer, refuser: tempRefuser, valider: tempValider}
      this.stats.push(donne)
      this.priceCount.push(price)
    }
  }
}

</script>

<style scoped>

</style>