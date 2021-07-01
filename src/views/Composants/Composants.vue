<template>
  <div>
    <v-btn  @click="addComposant" class="mb-5" v-if="parseInt(this.$session.get('user').roleId) === statusRoles.Technique || parseInt(this.$session.get('user').roleId) === statusRoles.Admin">
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
            <v-icon v-if=" userRole === statusRoles.Technique || userRole === statusRoles.Admin" @click="editComposant(row.item._id)">mdi-square-edit-outline</v-icon>
          </td>
          <td>
            <v-icon v-if="userRole === statusRoles.Technique || userRole === statusRoles.Admin" @click="deleteComposant(row.item._id)">mdi-delete</v-icon>
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
      userRole: this.$session.get('user').roleId,
      headers: [
        {
          text: 'composant',
          align: 'start',
          value: 'name',
        },
        {text: 'Description', value: 'description'},
        {text: 'Télécharger', value: 'download'},
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
    if (this.userRole === statusRoles.Technique || this.userRole === statusRoles.Admin) {
      this.headers.push({text: 'Editer', value: 'edit'})
      this.headers.push({text: 'Supprimer', value: 'delete'})
    }
  },
  methods: {
    deleteComposant(composantId) {
      this.$store.dispatch('composant/deleteComposants', composantId)
      this.$toast.open({
        message: 'Le composant a été supprimé.',
        type: 'success'
      });
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
      this.$toast.open({
        message: 'Téléchargement du composant...',
        type: 'success'
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
