<template>
  <v-container>
    <v-row class="mb-10">
      <Button :name="retourButton" :routeName="home"/>
    </v-row>

    <p class="display-4">{{ restaurant.name }}</p>

    <p class="display-3 pt-5"> Menu </p>
    <v-btn @click="addMenu" v-if="restaurant.restaurateurId === parseInt(this.$session.get('user').id)">
      Ajout de menu
    </v-btn>
    <v-row class="pa-6" v-for="menu in menus" :key="menu.name">
      <menuCard :menu="menu"></menuCard>
    </v-row>

    <p class="display-3 pt-5"> Articles </p>
    <v-btn @click="addArticle" v-if="restaurant.restaurateurId === parseInt(this.$session.get('user').id)">
      Ajout d'article
    </v-btn>
    <v-row class="pa-6" v-for="article in articles" :key="article.name">
      <br>
      <articleCard :article="article"></articleCard>
    </v-row>
  </v-container>
</template>

<script>

import articleCard from "@/components/articleCard";
import menuCard from "@/components/MenuCard";
import Button from "@/components/Button";

import { mapGetters } from "vuex";

export default {
name: "articleMenu",
  data() {
    return {
      home: "Home",
      retourButton: "< Retour"
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
  },
  computed: {
    ...mapGetters('articles', {
      articles: 'restaurantArticles',
    }),
    ...mapGetters('menus', {
      menus: 'restaurantMenus',
    }),
    restaurant() {
      return this.$store.getters['restaurants/restaurants'].find(restaurant => parseInt(restaurant.id) === parseInt(this.id))
    }
  },
  methods:{
    addArticle() {
      this.$router.push({name: 'AddArticle', params: {id: this.id}})
    },
    addMenu() {
      this.$router.push({name: 'AddMenu', params: {id: this.id}})
    },
  }
}

</script>
