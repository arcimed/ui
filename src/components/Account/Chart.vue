<template>
  <div>
    <p class="display-2"v-if="this.resto"> {{ this.resto.name }}</p>
    <p class="display-1"> Nombre de commandes</p>
    <v-data-table
        :headers="orderHeaders"
        :items="stats"
        class="elevation-1"
    >
      <template v-slot:header.name="{ header }">
        {{ header.text.toUpperCase() }}
      </template>
    </v-data-table>
    <br>
    <p class="display-1"> Revenue</p>
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
    <br>
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
import {statusOrders} from "@/config/statusOrders";

export default {
  name: "Chart",
  props: {
    charts: {
      required: true
    },
    resto: {
      required: false
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
        {text: 'Refusée', value: 'refuser'},
        {text: 'Livrée', value: 'livrer'},
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
      let tempRefuser = 0
      let tempLivrer = 0
      let monthPrice = []
      this.charts.forEach((order, index) => {
        switch (order.ordersStatusId) {
          case statusOrders.created:
             tempCree++
            break
          case statusOrders.payed:
            tempCree++
            break
          case statusOrders.validate:
            tempCree++
            break
          case statusOrders.refused:
            tempRefuser++
            tempCree++
            break
          case statusOrders.validateByDelivery:
            tempCree++
                break
          case statusOrders.inDelivery:
            tempCree++
            break
          case statusOrders.delivered:
            tempLivrer++
            tempCree++
            break
        }
      })
      let groupKey = 0;
      let groups = this.charts.reduce(function (r, o) {
        let m = o.createdAt.split(('-'))[1];
        (r[m])? r[m].data.push(o) : r[m] = {group: String(groupKey++), data: [o]};
        return r;
      }, {});

      let groupByMonth = Object.keys(groups).map(function(k){ return groups[k]; });
      let tempPrice
      groupByMonth.forEach((month, index) => {
        this.value.push(month.data.length)
        tempPrice = 0
        month.data.forEach((order, MonthIndex) => {
          order.Articles.forEach((article, Orderindex) => {
            tempPrice += article.price
          })
          order.Menus.forEach((menu, Menuindex) => {
            tempPrice += menu.price
          })
        })
        monthPrice.push(tempPrice)
      })



      let price = {name: 'Revenue', janvier: 0, fevrier: 0, mars: 0, avril: 0, mai: 0, juin: monthPrice[0] + " €", juillet: monthPrice[1] + " €"  }
      let donne = {name: 'Nombre de commande', cree: tempCree, refuser: tempRefuser, livrer: tempLivrer}
      this.stats.push(donne)
      this.priceCount.push(price)
    }
  }
}

</script>

<style scoped>

</style>
