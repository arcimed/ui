<template>
  <v-card class="mx-4 my-4" max-width="243">
    <template slot="progress">
      <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
      ></v-progress-linear>
    </template>

    <v-img height="125" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

    <v-card-title>{{ restaurant.name }}</v-card-title>

    <v-card-text>
      <div class="my-4 text-subtitle-1">
        {{ restaurant.city }}
      </div>

      <div>{{ restaurant.address }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions style="display: block">
      <div class="my-4 text-subtitle-1">
        <v-btn color="deep-purple lighten-2" text @click="menuArticleRestaurant(restaurant.id)">
          commander
        </v-btn>
      </div>
      <div class="my-4 text-subtitle-1" style="display: flex">
        <v-btn v-if="restaurant.restaurateurId === parseInt(this.$session.get('user').id) || parseInt(this.$session.get('user').roleId) === statusRoles.Admin" outlined rounded text
               @click="editRestaurant(restaurant.id)">
          Editer
        </v-btn>
        <v-btn
            color="primary"
            depressed
            v-if="restaurant.restaurateurId === parseInt(this.$session.get('user').id) || parseInt(this.$session.get('user').roleId) === statusRoles.Admin"
            style="margin-left: 5px"
            @click="deleteRestaurant(restaurant.id)"
        >
          <v-icon left>
            {{ icons.mdiDelete }}
          </v-icon>
          Supprimer
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mdiDelete,} from '@mdi/js'
const {statusRoles} = require('@/config/statusRoles');

export default {
  props: ['restaurant', 'right'],
  data: () => ({
    icons: {
      mdiDelete,
    },
    statusRoles: statusRoles,
  }),
  methods: {
    menuArticleRestaurant(restaurantId) {
      this.$router.push({name: 'menuArticle', params: {id: restaurantId}})
    },
    editRestaurant(restaurantId) {
      this.$router.push({name: 'EditRestaurant', params: {id: restaurantId}})
    },
    deleteRestaurant(restaurantId) {
      try {
        this.$store.dispatch('restaurants/deleteRestaurant', restaurantId);
        this.$toast.open({
          message: 'Le restaurant a bien été supprimé',
          type: 'success'
        });
      } catch (e) {
        this.$toast.open({
          message: e,
          type: 'warning'
        });
      }
    }
  }
}

</script>
