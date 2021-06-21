<template>
  <v-card class="mx-4 my-4" max-width="200">
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

    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="menuArticleRestaurant(restaurant.id)">
        commander
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  props: ['restaurant'],
  methods: {
    menuArticleRestaurant(restaurantId) {
      this.$router.push({ name: 'menuArticle', params: {id: restaurantId }})
    }
  }
}

</script>
