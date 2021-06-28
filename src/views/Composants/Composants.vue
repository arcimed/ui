<template>
  <div>
    <v-btn @click="addComposant" v-if="parseInt(this.$session.get('user').roleId) === statusRoles.Technique || parseInt(this.$session.get('user').roleId) === statusRoles.Admin">
      Ajout de composant
    </v-btn>
    <v-data-table
        :headers="headers"
        :items="composants"
        :search="search"
        class="elevation-1"
    >
      <template v-slot:item="row">
        <tr>
          <td class="align-center">{{ row.item.name }}</td>
          <td class="align-center">{{ row.item.description }}</td>
          <td>
            <v-icon @click="Download(row.item.id)">mdi-download</v-icon>
          </td>
          <td>
            <v-icon @click="editComposant(row.item.id)">mdi-square-edit-outline</v-icon>
          </td>
          <td>
            <v-icon @click="deleteArticle(row.item.id)">mdi-delete</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
const {statusRoles} = require('@/config/statusRoles');

export default {
name: "Composants",
  data() {
    return {
      search: '',
      statusRoles: statusRoles,
      headers: [
        {
          text: 'composant',
          align: 'start',
          value: 'name',
        },
        {text: 'Description', value: 'description'},
        {text: 'Télécharger', value: 'download'},
        {text: 'Editer', value: 'edit'},
        {text: 'Supprimer', value: 'delete'},
      ],
    }
  },
  computed: {
    ...mapGetters('composant', {
      composants: 'composants',
    }),
  },
  mounted() {
    this.$store.dispatch('composant/setComposants');
  },
  methods: {
    deleteArticle(composantId) {
      this.$store.dispatch('composant/deleteComposants', composantId)
    },
    download(composantId) {

    },
    editComposant(composantId) {
      this.$router.push({name: 'EditComposant', params: {id: composantId}})
    },
    addComposant() {
      this.$router.push({name: 'AddComposant'})
    },
  }
}
</script>


<style scoped>

</style>