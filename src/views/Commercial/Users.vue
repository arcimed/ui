<template>
  <v-card>
    <v-card-title>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        class="elevation-1"
    >
      <template v-slot:item="row">
        <tr>
          <td class="align-center">{{ row.item.id }}</td>
          <td class="align-center">{{ row.item.firstname }}</td>
          <td>{{ row.item.lastname }}</td>
          <td>{{ row.item.email }}</td>
          <td>{{ row.item.Role.name }}</td>
          <td>
            <v-icon @click="deleteUser(row.item.id)">mdi-delete</v-icon>
          </td>
          <td>
            <v-icon v-if="row.item.isSuspended" @click="suspendUser(row.item.id, row.item.isSuspended)">mdi-account-multiple-plus</v-icon>
            <v-icon v-else @click="suspendUser(row.item.id, row.item.isSuspended)">mdi-account-multiple-minus</v-icon>
          </td>
          <td>
            <v-icon v-if="row.item.Role.name === 'Restaurateur'" @click="statsUser(row.item.id)">mdi-chart-line</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
name: "Users",
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Utilisateur',
          align: 'start',
          value: 'name',
        },
        {text: 'Nom', value: 'lastname'},
        {text: 'Prénom', value: 'firstname'},
        {text: 'Email', value: 'email'},
        {text: 'Role', value: 'role'},
        {text: 'Supprimer', value: 'refuser'},
        {text: 'Suspendre', value: 'suspendre'},
        {text: 'Statistiques', value: 'statistiques'},
      ],
      temps: [],
    }
  },
  computed: {
    ...mapGetters('userManagement', {
      users: 'UsersManagement',
    }),
  },
  mounted() {
    this.$store.dispatch('userManagement/setUsers');
  },
  methods: {
    deleteUser(userId) {
      this.$store.dispatch('userManagement/deleteUser',  userId)
      this.$toast.open({
        message: 'L\'utilisateur a bien été supprimé.',
        type: 'success'
      });
    },
    suspendUser(userId, isSuspended) {
      this.$store.dispatch('userManagement/suspendUser',  {userId, isSuspended})
      this.$toast.open({
        message: 'L\'utilisateur a bien été suspendu.',
        type: 'success'
      });
    },
    statsUser(userId) {
      this.$router.push({name: 'Statistiques', params: {id: userId}})
    }
  }
}
</script>

<style scoped>

</style>
