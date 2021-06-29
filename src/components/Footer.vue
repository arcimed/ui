<template>
  <v-footer
      color="deep-purple" dark
      padless
  >
    <v-row
        justify="center"
        no-gutters
    >
      <v-btn
          :key="Home"
          color="white"
          text
          rounded
          class="my-2"
          :to="'/'"
      >
        Home
      </v-btn>
      <v-btn
          :key="gitFront"
          color="white"
          text
          rounded
          class="my-2"
          @click="gitFront"
      >
        Git Front
      </v-btn>
      <v-btn
          :key="gitMiddleware"
          color="white"
          text
          rounded
          class="my-2"
          @click="gitMiddleware"
      >
        Git Middleware
      </v-btn>
      <v-btn
          :key="ApiDoc"
          color="white"
          text
          rounded
          class="my-2"
          @click="Documentations"
      >
        Documentations
      </v-btn>
      <v-col
          color="deep-purple" dark
          class="py-4 text-center white--text"
          cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Cesi ton Plat</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
name: "Footer",
  data: () => ({
    links: [
      {name:'Home', url:'/'},
      {name:'Git Front', url:'https://github.com/arcimed/ui'},
      'About Us',
      'Team',
      'Services',
      'Blog',
      'Contact Us',
    ],
  }),
  methods: {
    gitFront() {
      window.open('https://github.com/arcimed/ui', '_blank');
    },
    gitMiddleware() {
      window.open('https://github.com/BenGround/middleware', '_blank');
    },
    Documentations() {
      window.open('https://documenter.getpostman.com/view/6359608/TzefB4Bq', '_blank');
    }
  }
}
</script>

<style scoped>

</style>