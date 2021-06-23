<template>
  <v-card class="mx-auto" max-width="1000" tile>
    <v-img height="200" src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"></v-img>
    <v-row style="margin:2.5%;position:absolute; top: 130px">

      <v-list-item>
        <v-list-item-avatar size="100">
          <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="John"
          >
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title" style="margin-top:50px;">{{this.$session.get('user').firstname + ' ' + this.$session.get('user').lastname}}</v-list-item-title>
          <v-list-item-subtitle>{{ this.$session.get('user').email }}</v-list-item-subtitle>
          <v-list-item-subtitle>{{ this.$session.get('user').address + ' ' +  this.$session.get('user').city}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <div class="my-4 text-subtitle-1" style="display: flex">
        <v-btn outlined rounded text
               @click="editUser()">
          Editer
        </v-btn>
        <v-btn
            color="primary"
            depressed
            style="margin-left: 10px"
            @click="deleteUser()"
        >
          <v-icon left>
            {{ icons.mdiDelete }}
          </v-icon>
          Delete
        </v-btn>
      </div>
    </v-row>
  </v-card>
</template>

<script>
import {mdiDelete} from "@mdi/js";
import axios from "axios";

export default {
name: "User",
  data: () => ({
    icons: {
      mdiDelete,
    },
  }),
  methods:{
    editUser() {
      this.$router.push({name: 'EditUser', params: {id: this.$session.get('user').id}})
    },
    deleteUser() {
      axios.put(`api/restaurant/delete/` + this.$session.get('user').id)
          .then(() => {
            this.$session.destroy()
            this.$router.push({name: 'home'})
            this.$router.go()
          }).catch()

    }
  }
}
</script>

<style scoped>

</style>