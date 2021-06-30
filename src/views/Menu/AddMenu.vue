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
              v-model="menu.name"
              :counter="50"
              :error-messages="errors"
              label="Nom"
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
                label="Articles"
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
              type="tel"
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
    menu: {
      name: '',
      articlesIds: [],
      restaurantsId: '',
      price: ''
    },
    home: "Home",
    retourButton: "< Retour",
    article: []
  }),
  props: {
    id: {
      required: true
    }
  },
  mounted() {
    axios.get(`api/articlesbyrestaurant/` + this.id)
        .then((response) => {
          this.article = response.data.data
        }).catch()
  },
  methods: {
    submit () {
      this.menu.restaurantsId = this.id
      this.menu.price = parseFloat(this.menu.price)
      this.$refs.observer.validate()
      this.$store.dispatch('menus/addMenus', this.menu);
      this.$router.push({name: 'menuArticle', params: {id: this.id}})
      this.$toast.open({
        message: 'Le menu a bien été ajouté.',
        type: 'success'
      });
    },
    clear () {
      this.name = ''
      this.address = ''
      this.city = ''
      this.$refs.observer.reset()
      this.$toast.open({
        message: 'Le formulaire a été réinitialisé.',
        type: 'success'
      });
    },
  },
}
</script>


<style scoped>

</style>
