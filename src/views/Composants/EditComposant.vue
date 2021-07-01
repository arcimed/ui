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
              v-model="composants.name"
              :counter="50"
              :error-messages="errors"
              label="Nom"
              required
          ></v-text-field>
        </validation-provider>
        <validation-provider
            v-slot="{ errors }"
            name="Name"
            rules="required|max:200"
        >
          <v-text-field
              v-model="composants.description"
              :counter="200"
              :error-messages="errors"
              label="Description"
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
      </form>

    </validation-observer>
  </div>
</template>

<script>
import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
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
    composants: {
      name: '',
      description: '',
    },
    home: "composants",
    retourButton: "< Retour",
    temp : {}
  }),
  props: {
    id: {
      required: true
    }
  },
  created() {
    this.temp = this.$store.getters['composant/composants'].find(composant => parseInt(composant._id) === parseInt(this.id))
    this.composants.name = this.temp.name
    this.composants.description = this.temp.description
  },
  methods: {
    submit () {
      this.$refs.observer.validate()
      let composant = this.composants
      let idComposant = this.id
      this.$store.dispatch('composant/editComposants', {composant, idComposant});
      this.$router.push({name: 'composants'})
      this.$toast.open({
        message: 'Le composant a bien été modifié.',
        type: 'success'
      });
    },
  },
}
</script>


<style scoped>

</style>
