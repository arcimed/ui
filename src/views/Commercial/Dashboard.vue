<template>
  <div>
    {{users}}
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Dashboard",
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('dashboard', {
      users: 'ordersDashboard',
    }),
  },
  mounted() {
    this.$store.dispatch('dashboard/setOrdersDashboard');
  },
  methods: {
  }
}
</script>
