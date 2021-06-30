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
              v-model="resto.name"
              :counter="50"
              :error-messages="errors"
              label="Nom"
              required
          ></v-text-field>
        </validation-provider>
        <validation-provider
            v-slot="{ errors }"
            name="city"
            rules="required|max:50"
        >
          <v-text-field
              v-model="resto.city"
              :counter="50"
              :error-messages="errors"
              label="Ville"
              required
          ></v-text-field>
        </validation-provider>
        <validation-provider
            v-slot="{ errors }"
            name="address"
            rules="required|max:50"
        >
          <v-text-field
              v-model="resto.address"
              :error-messages="errors"
              label="Adresse"
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
    resto: {
      name: '',
      address: '',
      city: '',
      restaurateurId : ''
    },
    home: "Home",
    retourButton: "< Retour",
  }),

  methods: {
    submit () {
      this.resto.restaurateurId = parseInt(this.$session.get('user').id)
      this.$refs.observer.validate()
      this.$store.dispatch('restaurants/addRestaurant', this.resto);
      this.$router.push({name: 'Home'})
      this.$toast.open({
        message: 'Le restaurant a bien été ajouté.',
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
