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
        <v-btn v-if="parseInt(this.$session.get('user').roleId) === statusRoles.User || parseInt(this.$session.get('user').roleId) === statusRoles.Admin" outlined rounded text @click="addMenuToCart(menu)">
          Selectionner
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
              @click="deleteMenu(menu.id)"
          >
            <v-icon left>
              {{ icons.mdiDelete }}
            </v-icon>
            Delete
          </v-btn>
        </div>
        <v-spacer></v-spacer>
        <div class="my-4 text-subtitle-1" style="display: flex">
          <v-btn icon @click="show = !show" style="display: contents">
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
                <v-list-item-title v-text="article.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </v-expand-transition>
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
  }),
  methods: {
    ...mapActions('cart', [
      'addMenuToCart'
    ]),
    editMenu(menuId) {
      this.$router.push({name: 'EditMenu', params: {id: menuId}})
    },
    deleteMenu(menuId) {
      this.$store.dispatch('menus/deleteMenu', menuId);
    }
  }
}

</script>
