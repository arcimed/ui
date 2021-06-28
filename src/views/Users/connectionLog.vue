<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="logs"
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

export default {
  name: "connectionLog",
  data() {
    return {
      divider: true,
      logs: [],
      headers: [
        {
          text: 'log de connection',
          align: 'start',
          value: 'name',
        },
        {text: 'message', value: 'message'},
        {text: 'Date de connection', value: 'createdAt'},
      ],
    }
  },
  mounted () {
    axios.get(`api/logs/connection`)
        .then((response) => {
          this.logs = response.data.data
        }).catch()
  },
}
</script>

<style scoped>

</style>
