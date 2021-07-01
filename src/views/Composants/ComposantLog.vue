<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="logs"
        :search="search"
        class="elevation-1"
    >
      <template v-slot:item="row">
        <tr>
          <td class="align-center">{{ row.item.message }}</td>
          <td class="align-center"><format :value="row.item.createdAt" fn="dateTime" /></td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
import format from "@projet-cesi/format-date";

export default {
  name: "connectionLog",
  components: {
    format
  },
  data() {
    return {
      search: '',
      divider: true,
      logs: [],
      headers: [
        {
          text: 'log de téléchargement',
          align: 'start',
          value: 'message',
        },
        {text: 'Date de téléchargement', value: 'createdAt'},
      ],
    }
  },
  mounted () {
    axios.get(`api/logs/download`)
        .then((response) => {
          this.logs = response.data.data
        }).catch()
  },
}
</script>

<style scoped>

</style>
