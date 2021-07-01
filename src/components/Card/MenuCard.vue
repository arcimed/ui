<template>
  <v-card class="mx-auto" max-width="344">
    <v-img src="https://assets.lightspeedhq.fr/img/2019/04/45199c86-6291056e-c205d230-ultimate-guide-to-menu-design.jpg" height="200px"></v-img>

    <v-card-title>
      {{ menu.name }}

      <v-spacer></v-spacer>
    </v-card-title>

    <v-card-subtitle>
      Prix: {{ (menu.price).toFixed(2) }} €
    </v-card-subtitle>

    <v-card-actions>
      <v-card-actions style="display: block">
        <v-btn v-if="parseInt(this.$session.get('user').roleId) === statusRoles.User || parseInt(this.$session.get('user').roleId) === statusRoles.Admin" outlined rounded text @click="addToCart(menu)">
          Ajouter
        </v-btn>
        <div class="my-4 text-subtitle-1" style="display: flex">
          <v-btn v-if="menu.Restaurant.restaurateurId === parseInt(this.$session.get('user').id) || parseInt(this.$session.get('user').roleId) === statusRoles.Admin" outlined rounded text
                 @click="editMenu(menu.id)">
            Editer
          </v-btn>
          <v-btn
              color="primary"
              depressed
              v-if="menu.Restaurant.restaurateurId === parseInt(this.$session.get('user').id) || parseInt(this.$session.get('user').roleId) === statusRoles.Admin"
              style="margin-left: 10px"
              @click.stop="dialog = true"
          >
            <v-icon left>
              {{ icons.mdiDelete }}
            </v-icon>
            Supprimer
          </v-btn>
        </div>
        <v-spacer></v-spacer>
        <div class="my-4 text-subtitle-1" style="display: flex">
          <v-btn class="test" :ripple="false" icon @click="show = !show" style="display: contents">
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </div>
      </v-card-actions >
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-list dense>
          <v-subheader>Contenu</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item v-for="article in menu.Articles" :key="article.id">
              <v-list-item-content>
                <v-list-item-title>{{article.name}} | Type: {{article.TypesArticle.name}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </v-expand-transition>
    <v-row justify="center">
      <v-dialog
          v-model="dialog"
          max-width="500"
      >
        <v-card>
          <v-card-title class="text-h5">
            Souhaitez vous supprimer cet élément ?
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
                @click="deleteMenu(menu.id)"
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

import { mapActions } from "vuex";
import {mdiDelete} from "@mdi/js";
const {statusRoles} = require('@/config/statusRoles');

export default {
  name: "menuCard",
  props: ['menu'],
  data: () => ({
    show: false,
    icons: {
      mdiDelete,
    },
    statusRoles: statusRoles,
    dialog: false,
  }),
  methods: {
    editMenu(menuId) {
      this.$router.push({name: 'EditMenu', params: {id: menuId}})
    },
    deleteMenu(menuId) {
      try {
        this.$store.dispatch('menus/deleteMenu', menuId);
        this.$toast.open({
          message: 'Le menu a bien été supprimé',
          type: 'success'
        });
      } catch (e) {
        this.$toast.open({
          message: e,
          type: 'warning'
        });
      }
      this.dialog = false
    },
    addToCart(menu) {
      try {
        this.$store.dispatch('cart/addMenuToCart', menu);
        this.$toast.open({
          message: "Le menu a bien été ajouté",
          type: 'success'
        });
      } catch (error) {
        this.$toast.open({
          message: error,
          type: 'warning'
        });
      }
    }
  }
}

</script>

<style scoped>
.test::before {
  background-color: transparent;
}
</style>
