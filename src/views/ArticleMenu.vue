<template>
  <v-container>
    <v-row class="mb-10">
      <Button :name="nameButton" :routeName="home"/>
    </v-row>

    <p class="display-4">{{ restaurant.name }}</p>

    <p class="display-3 pt-5"> Menu </p>
    <v-row class="pa-6" v-for="menu in menus" :key="menu.name">
      <menuCard :menu="menu"></menuCard>
    </v-row>

    <p class="display-3 pt-5"> Articles </p>
    <v-row class="pa-6" v-for="article in articles" :key="article.name">
      <br>
      <articleCard :article="article"></articleCard>
    </v-row>
  </v-container>
</template>

<script>

import articleCard from "@/components/ArticleCard";
import menuCard from "@/components/MenuCard";
import Button from "@/components/Button";

import { mapGetters } from "vuex";

export default {
name: "articleMenu",
  data() {
    return {
      home: "Home",
      nameButton: "< Retour"
    }
  },
  props: {
    id: {
      required: true
    }
  },
  components: {
    articleCard,
    menuCard,
    Button
  },
  mounted() {
    this.$store.dispatch('menus/setMenus', this.id);
    this.$store.dispatch('articles/setArticles', this.id);
    this.$store.dispatch('restaurants/setRestaurant', this.id);
  },
  computed: {
    ...mapGetters('restaurants', {
      restaurant: 'restaurant',
    }),
    ...mapGetters('articles', {
      articles: 'restaurantArticles',
    }),
    ...mapGetters('menus', {
      menus: 'restaurantMenus',
    })
  }
}

</script>
