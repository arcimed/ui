<template>
  <v-container>
    <v-row class="mb-10">
      <Button :name="retourButton" :routeName="home"/>
    </v-row>

    <p class="display-4">{{ restaurant.name }}</p>

    <p class="display-3 pt-5"> Menu </p>
    <v-btn @click="addMenu" class="mb-5" v-if="restaurant.restaurateurId === parseInt(this.$session.get('user').id) || parseInt(this.$session.get('user').roleId) === statusRoles.Admin">
      Ajout de menu
    </v-btn>
    <v-row class="pa-6" v-for="menu in menus" :key="menu.name">
      <menuCard :menu="menu"></menuCard>
    </v-row>

    <p class="display-3 pt-5"> Articles </p>
    <v-btn @click="addArticle" class="mb-5" v-if="restaurant.restaurateurId === parseInt(this.$session.get('user').id) || parseInt(this.$session.get('user').roleId) === statusRoles.Admin">
      Ajout d'article
    </v-btn>
    <v-row class="pa-6" v-for="article in articles" :key="article.name">
      <br>
      <articleCard :article="article"></articleCard>
    </v-row>
  </v-container>
</template>

<script>

import articleCard from "@/components/Card/ArticleCard";
import menuCard from "@/components/Card/MenuCard";
import Button from "@/components/Button";
const {statusRoles} = require('@/config/statusRoles');

import { mapGetters } from "vuex";

export default {
name: "articleMenu",
  data() {
    return {
      home: "Home",
      retourButton: "< Retour",
      statusRoles: statusRoles,
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
    this.$store.dispatch('restaurants/setRestaurantMenuArticle', this.id);
  },
  computed: {
    ...mapGetters('restaurants', {
      restaurant: 'restaurantMenuArticle',
    }),
    ...mapGetters('articles', {
      articles: 'restaurantArticles',
    }),
    ...mapGetters('menus', {
      menus: 'restaurantMenus',
    }),
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
