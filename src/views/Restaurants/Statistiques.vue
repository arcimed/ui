<template>
  <div>
    <div v-for="temp in temps" :key="temp.restaurant.id">
      <chart :charts="temp"></chart>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import chart from "@/components/Account/Chart";

export default {
name: "Statistiques",
  components : {
  chart
  },
  data() {
    return {
      temps: [],
    }
  },
  mounted() {
    axios.get(`api/all/orders/restaurateur/` + this.$session.get('user').id)
        .then((response) => {
          this.temps = response.data.data
        })
        .catch((error) => {
          console.log(error);
        });

  },
}
</script>

<style scoped>

</style>