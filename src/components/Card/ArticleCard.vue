<template>
  <v-card class="mx-auto" max-width="344">
    <v-img src="https://res.cloudinary.com/hv9ssmzrz/image/fetch/c_fill,f_auto,h_630,q_auto,w_1200/https://s3-eu-west-1.amazonaws.com/images-ca-1-0-1-eu/tag_photos/original/2426/plat_principal_flickr_2304576748_f79c906b85_b.jpg" height="200px"></v-img>

    <v-card-title>
      {{ article.name }} ({{ article.TypesArticle.name }})

      <v-spacer></v-spacer>
    </v-card-title>

    <v-card-subtitle>
      Prix: {{ article.price }} €
    </v-card-subtitle>

    <v-card-actions>
      <v-card-actions style="display: block">
        <v-btn v-if="parseInt(this.$session.get('user').roleId) === statusRoles.User || parseInt(this.$session.get('user').roleId) === statusRoles.Admin " outlined rounded text @click="addArticleToCart(article)">
          Ajouter
        </v-btn>
        <div class="my-4 text-subtitle-1" style="display: flex">
          <v-btn v-if="article.Restaurant.restaurateurId === parseInt(this.$session.get('user').id) || parseInt(this.$session.get('user').roleId) === statusRoles.Admin" outlined rounded text
                 @click="editArticle(article.id)">
            Editer
          </v-btn>
          <v-btn
              color="primary"
              depressed
              v-if="article.Restaurant.restaurateurId === parseInt(this.$session.get('user').id) || parseInt(this.$session.get('user').roleId) === statusRoles.Admin"
              style="margin-left: 10px"
              @click.stop="dialog = true"

          >
            <v-icon left>
              {{ icons.mdiDelete }}
            </v-icon>
            Supprimer
          </v-btn>
        </div>
      </v-card-actions>
    </v-card-actions>
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
                @click="deleteArticle(article.id)"
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

import { mapActions } from 'vuex';
import { mdiDelete } from "@mdi/js";
const {statusRoles} = require('@/config/statusRoles');

export default {
  name: "articleCard",
  props: ['article', 'idRestaurant'],
  data: () => ({
    icons: {
      mdiDelete,
    },
    dialog: false,
    statusRoles: statusRoles,
  }),
  methods: {
    ...mapActions('cart', [
      'addArticleToCart'
    ]),
    editArticle(articleId) {
      this.$router.push({name: 'EditArticle', params: {id: articleId}})
    },
    deleteArticle(articleId) {
      try {
        this.$store.dispatch('articles/deleteArticle', articleId);
        this.$toast.open({
          message: "L'article a bien été suprimer",
          type: 'success'
        });
      } catch (error) {
        this.$toast.open({
          message: error,
          type: 'warning'
        });
      }
      this.dialog = false
    }
  }
}

</script>
