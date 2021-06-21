<template>
  <div class="row">
    {{ restaurant.name }}

    <div v-for="article in articles" :key="article.name">
      <br>
      <articleCard :article="article"></articleCard>
    </div>
  </div>
</template>

<script>

import articleCard from "@/components/ArticleCard";

import { mapGetters } from "vuex";

export default {
name: "articleMenu",
  props: {
    id: {
      required: true
    }
  },
  components: {
    articleCard,
  },
  mounted() {
    this.$store.dispatch('articles/setArticles', this.id);
    this.$store.dispatch('restaurants/setRestaurant', this.id);
  },
  computed: {
    ...mapGetters('restaurants', {
      restaurant: 'restaurant',
    }),
    ...mapGetters('articles', {
      articles: 'restaurantArticles',
    })
  }
}

</script>
