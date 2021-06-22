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
        <v-btn outlined rounded text @click="addArticleToCart(article)">
          Selectionner
        </v-btn>
        <div class="my-4 text-subtitle-1" style="display: flex">
          <v-btn v-if="article.Restaurant.restaurateurId === parseInt(this.$session.get('user').id)" outlined rounded text
                 @click="editArticle(article.id)">
            Editer
          </v-btn>
          <v-btn
              color="primary"
              depressed
              v-if="article.Restaurant.restaurateurId === parseInt(this.$session.get('user').id)"
              style="margin-left: 10px"
              @click="deleteArticle(article.id)"
          >
            <v-icon left>
              {{ icons.mdiDelete }}
            </v-icon>
            Delete
          </v-btn>
        </div>
      </v-card-actions>
    </v-card-actions>
  </v-card>
</template>

<script>

import { mapActions } from 'vuex'
import {mdiDelete} from "@mdi/js";

export default {
  name: "articleCard",
  props: ['article', 'idRestaurant'],
  data: () => ({
    icons: {
      mdiDelete,
    },
  }),
  methods: {
    ...mapActions('cart', [
      'addArticleToCart'
    ]),
    editArticle(articleId) {
      this.$router.push({name: 'EditArticle', params: {id: articleId}})
    },
    deleteArticle(articleId) {
      this.$store.dispatch('articles/deleteArticle', articleId);
    }
  }
}

</script>
