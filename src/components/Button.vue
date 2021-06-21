<template>
  <v-btn @click="redirect"> {{ name }} </v-btn>
</template>

<script>

export default {
  name: "Button",
  props: {
    routeName: {
      required: true
    },
    name: {
      required: true
    }
  },
  methods: {
    redirect() {
      this.$router.push({name: this.routeName})
    }
  }
}


</script>
