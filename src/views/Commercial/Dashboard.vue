<template>
  <div>
    <p class="display-3">Dashboard des commandes</p>
    <br>
    <div class="row">
      <div v-for=" orderDashboard in ordersDashboard" :key="orderDashboard.name">
          <DashboardCard :orderDashboard="orderDashboard"></DashboardCard>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import DashboardCard from "../../components/Card/DashboardCard";

export default {
  name: "Dashboard",
  components: {DashboardCard},
  data() {
    return {
    }
  },
  sockets: {
    newDashboardData: function() {
      this.$store.dispatch('dashboard/setOrdersDashboard');
    }
  },
  computed: {
    ...mapGetters('dashboard', {
      ordersDashboard: 'ordersDashboard',
      ca: 'ca',
    }),
  },
  mounted() {
    this.$store.dispatch('dashboard/setOrdersDashboard');
  },
  methods: {
  }
}
</script>
