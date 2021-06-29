<template>
  <div>
    <v-row class="mb-10">
      <Button :name="retourButton" :routeName="home"/>
    </v-row>
    <validation-observer ref="observer" v-slot="{ invalid }">

      <form @submit.prevent="submit">
        <validation-provider
            v-slot="{ errors }"
            name="Name"
            rules="required|max:50"
        >
          <v-text-field
              v-model="article.name"
              :counter="50"
              :error-messages="errors"
              label="Nom"
              required
          ></v-text-field>
        </validation-provider>
          <v-col cols="6">
            <v-select
                v-model="article.typesArticlesId"
                :items="type"
                item-text="name"
                item-value="id"
                label="Type d'articles"
                persistent-hint
                return-object
                single-line
            ></v-select>
          </v-col>
        <validation-provider
            v-slot="{ errors }"
            name="Prix"
            rules="required|max:10"
        >
          <v-text-field
              type="tel"
              v-model="article.price"
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
          Soumettre
        </v-btn>
        <v-btn @click="clear">
          clear
        </v-btn>
      </form>

    </validation-observer>
  </div>
</template>

<script>
import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import axios from "axios";
import Button from "@/components/Button";

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
    Button
  },
  data: () => ({
    article: {
      name: '',
      typesArticlesId: '',
      restaurantsId: '',
      price: ''
    },
    type: [],
    home: "Home",
    retourButton: "< Retour",
  }),
  props: {
    id: {
      required: true
    }
  },
  mounted() {
    axios.get(`api/article/types/` )
        .then((response) => {
          this.type = response.data.data
        }).catch()
  },
  created() {
    this.temp = this.$store.getters['articles/restaurantArticles'].find(article => parseInt(article.id) === parseInt(this.id))
    this.article.name = this.temp.name
    this.article.price = this.temp.price
    this.article.typesArticlesId = this.temp.typesArticlesId
  },
  methods: {
    submit () {
      let restaurantId = this.temp.Restaurant.id
      this.article.restaurantsId = restaurantId
      this.article.typesArticlesId = String(this.article.typesArticlesId.id)
      this.article.price = parseFloat(this.article.price)
      this.$refs.observer.validate()
      let article = this.article
      let idArticle = this.temp.id
      this.$store.dispatch('articles/editArticles', {article, idArticle});
      this.$router.push({name: 'menuArticle', params: {id: restaurantId}})
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
