<template>
  <div class="row">
    <div v-for="key in articles" :key="key.name">
      <articleCard :article="key"></articleCard>
    </div>
  </div>
</template>

<script>

import articleCard from "@/components/ArticleCard";

export default {
name: "articleMenu",
  components: {
    articleCard,
  },
  data() {
    return {
      articles: [],
    };
  },
  created: function () {
    this.$http
        .get(`api/article/all`)
        .then((response) => {
          this.articles = response.data
        });
  }
}

</script>
