<template>
  <validation-observer ref="observer" v-slot="{ invalid }">

    <form @submit.prevent="submit">
      <validation-provider
          v-slot="{ errors }"
          name="Name"
          rules="required|max:10"
      >
        <v-text-field
            v-model="menu.name"
            :counter="50"
            :error-messages="errors"
            label="Name"
            required
        ></v-text-field>
      </validation-provider>
      <validation-provider
          v-slot="{ errors }"
          name="type"
      >
        <v-col cols="6">
          <v-select
              v-model="menu.articlesIds"
              :items="article"
              label="Select"
              item-text="name"
              item-value="id"
              multiple
              chips
              hint="What are the target regions"
              persistent-hint
          ></v-select>
        </v-col>
      </validation-provider>
      <validation-provider
          v-slot="{ errors }"
          name="Prix"
          rules="required|max:10"
      >
        <v-text-field
            type="number"
            v-model="menu.price"
            :counter="10"
            :error-messages="errors"
            label="Prix"
            required
        ></v-text-field>
      </validation-provider>
      <v-btn
          class="mr-4"
          type="submit"
          :disabled="invalid"
      >
        submit
      </v-btn>
      <v-btn @click="clear">
        clear
      </v-btn>
    </form>

  </validation-observer>
</template>

<script>
import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import axios from "axios";

setInteractionMode('eager')

extend('digits', {
  ...digits,
  message: '{_field_} needs to be {length} digits. ({_value_})',
})

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
})

extend('regex', {
  ...regex,
  message: '{_field_} {_value_} does not match {regex}',
})

extend('email', {
  ...email,
  message: 'Email must be valid',
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    menu: {
      name: '',
      articlesIds: [],
      restaurantsId: '',
      price: ''
    },
    article: []
  }),
  props: {
    id: {
      required: true
    }
  },
  mounted() {
    axios.get(`api/articlesbyrestaurant/` + this.temp.Restaurant.id)
        .then((response) => {
          this.article = response.data.data
        }).catch()
  },
  created() {
    this.temp = this.$store.getters['menus/restaurantMenus'].find(article => parseInt(article.id) === parseInt(this.id))
    this.menu.name = this.temp.name
    this.menu.price = this.temp.price
    this.temp.Articles.forEach(element => this.menu.articlesIds.push(element.MenuArticles.articlesId))
    this.menu.restaurantsId = this.temp.Restaurant.id
  },
  methods: {
    submit () {
      this.menu.price = parseFloat(this.menu.price)
      this.$refs.observer.validate()
      let menu = this.menu
      let idMenu = this.temp.id
      this.$store.dispatch('menus/editMenu', {menu, idMenu});
      this.$router.push({name: 'menuArticle', params: {id: this.menu.restaurantsId}})
    },
    clear () {
      this.name = ''
      this.address = ''
      this.city = ''
      this.$refs.observer.reset()
    },

  },
}
</script>


<style scoped>

</style>
