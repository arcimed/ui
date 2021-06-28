<template>
  <v-card
      class="mx-auto ma-3 mr-3"
      max-width="300"
      min-width="200"
      outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1 text-center">
          {{orderDashboard.data}}
        </v-list-item-title>
        <v-list-item-subtitle class="text-h6 mb-1 text-center">{{orderDashboard.name}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "DashboardCard",
  props: ['orderDashboard'],
}
</script>

<style scoped>

</style>