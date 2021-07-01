<template>
  <v-card class="mx-auto" max-width="1000" tile>
    <v-img height="200" src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"></v-img>
    <div>
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
            @click.stop="dialog = true"
        >
          <v-icon left>
            {{ icons.mdiDelete }}
          </v-icon>
          Delete
        </v-btn>
      </div>
    </v-row>
    <div class="mx-auto" style="margin-top: 200px">
      <form @submit.prevent="sendEmail" style="margin: 20px">
        <v-text-field
            type="email"
            v-model="email"
            name="email"
            :rules="emailRules"
            placeholder="Email"
            required
        ></v-text-field>
        <input type="hidden" name="referral_code" v-model="referral_code">
        <v-btn
            class="mr-4"
            type="submit"
        >
          Envoyer un lien de parrainage
        </v-btn>
      </form>
      <br>
      <v-divider></v-divider>
      <br>
      <v-data-table
          :headers="headers"
          :items="usersReferred"
          item-key="name"
          class="elevation-1"
          :hide-default-footer="true"
          style="margin: 20px"
      >
      </v-data-table>
    </div>
    </div>
    <v-row justify="center">
      <v-dialog
          v-model="dialog"
          max-width="500"
      >
        <v-card>
          <v-card-title class="text-h5">
            Souhaitez vous supprimer ce compte ?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
            >
              Annuler
            </v-btn>

            <v-btn
                color="green darken-1"
                text
                @click="deleteUser()"
            >
              Supprimer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-card>
</template>

<script>
import {mdiDelete} from "@mdi/js";
import axios from "axios";
import emailjs from 'emailjs-com';

export default {
  name: "User",
  data: () => ({
    email: "",
    referral_code: "",
    dialog: false,
    emailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    icons: {
      mdiDelete,
    },
    usersReferred: []
  }),
  computed: {
    headers () {
      return [
        {
          text: 'Email',
          align: 'start',
          value: 'email',
        },
        { text: 'Prénom', value: 'firstname' },
        { text: 'Nom', value: 'lastname' }
      ]
    },
  },
  mounted() {
    this.$http
        .get(`/api/user/getUsersReferred/` + this.$session.get('user').id)
        .then((response) => {
          this.usersReferred = response.data.data;
        }).catch(error => console.log(error))
  },
  methods:{
    editUser() {
      this.$router.push({name: 'EditUser', params: {id: this.$session.get('user').id}})
    },
    deleteUser() {
      axios.put(`api/user/delete/` + this.$session.get('user').id)
          .then(() => {
            this.$session.destroy()
            this.$router.push({name: 'home'})
            this.$router.go()
            this.$toast.open({
              message: "L'utilisateur a bien été supprimé",
              type: 'success'
            });
          }).catch(error =>
          this.$toast.open({
            message: error,
            type: 'warning'
       }))
      this.dialog = false
    },
    sendEmail(e) {
      this.referral_code = String("https://localhost:8080/?referralCode=" + this.$session.get('user').referralCode
          + "&email=" + this.email + "&role=" + this.$session.get('user').roleId).replace(/\s/g, '');

      setTimeout(() => {
        try {
          emailjs.sendForm('service_r98cb28', 'template_7pgishp', e.target, 'user_EdjSTCVobbokr2ansmIKU')
          this.$toast.open({
            message: "L'invitation de parainage a bien été envoyée",
            type: 'success'
          });

        } catch(error) {
          this.$toast.open({
            message: error,
            type: 'success'
          });
          console.log({error})
        }

        this.email = ''
      }, 500);
    }
  }
}
</script>

<style scoped>

</style>
