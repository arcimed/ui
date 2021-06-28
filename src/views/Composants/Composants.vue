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
            <v-icon @click="download(row.item.name)">mdi-download</v-icon>
          </td>
          <td>
            <v-icon @click="editComposant(row.item._id)">mdi-square-edit-outline</v-icon>
          </td>
          <td>
            <v-icon @click="deleteComposant(row.item._id)">mdi-delete</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import axios from "axios";
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
    deleteComposant(composantId) {
      this.$store.dispatch('composant/deleteComposants', composantId)
    },
    download(composantName) {
      let message = this.$session.get('user').firstname + ' ' + this.$session.get('user').lastname + ' a téléchargé le composant : ' + composantName
      axios.post(`api/component/download`, {message: message})
          .then((response) => {
            window.open('https://www.npmjs.com/package/' + composantName, '_blank');
          })
          .catch((error) => {
            console.log(error);
          });

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
