<template>
  <div class="row">
    <div v-for="resto in restos" :key="resto.name">
      <restocard :resto="resto"></restocard>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import restocard from '../components/restocard.vue'

  export default Vue.extend({
    name: 'Home',
    components: {
      restocard,
    },
    data() {
      return {
        restos: [],
      };
    },
    created: function () {
      this.$http
          .get(`http://localhost:3000/api/restaurant/all`)
          .then((response) => {
            this.restos = response.data.data
          });
    }
  })
</script>
