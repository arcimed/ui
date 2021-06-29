<template>
  <div>
    <div>
      <chart v-if="temps.length > 0" :charts="temps"></chart>
    </div>
    <br>
    <p class="display-1"> Inscription</p>
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
        :items="subscribe"
        class="elevation-1"
    >
      <template v-slot:header.name="{ header }">
        {{ header.text.toUpperCase() }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
import chart from "@/components/Account/Chart";
import {statusOrders} from "../../config/statusOrders";

export default {
  name: "Statistiques",
  components : {
    chart
  },
  data() {
    return {
      temps: [],
      users: [],
      headers: [
        {
          text: 'Inscription',
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
      subscribe: []
    }
  },
  created() {
    axios.get(`api/order/all`)
        .then((response) => {
          this.temps = response.data.data
        })
        .catch((error) => {
          console.log(error);
        });

    axios.get(`api/user/all`)
        .then((response) => {
          this.users = response.data.data
          this.stat()
        })
        .catch((error) => {
          console.log(error);
        });
  },
  methods: {
    stat() {
      let monthSuscribe = []

      let groupKey = 0;
      let groups = this.users.reduce(function (r, o) {
        let m = o.createdAt.split(('-'))[1];
        (r[m])? r[m].data.push(o) : r[m] = {group: String(groupKey++), data: [o]};
        return r;
      }, {});
      let countUser
      let groupByMonth = Object.keys(groups).map(function(k){ return groups[k]; });
      groupByMonth.forEach((month, index) => {
        countUser = 0
        this.value.push(month.data.length)
        monthSuscribe.push(month.data.length)
      })
      let tempsubscribe = {name: "Nombre d'inscirption", janvier: 0, fevrier: 0, mars: 0, avril: 0, mai: 0, juin: monthSuscribe[0] , juillet: monthSuscribe[1]  }
      this.subscribe.push(tempsubscribe)
    }
  }
}
</script>

<style scoped>

</style>