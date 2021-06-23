<template>
  <validation-observer ref="observer" v-slot="{ invalid }">

    <form @submit.prevent="submit">
      <validation-provider
          v-slot="{ errors }"
          name="Name"
          rules="required|max:10"
      >
        <v-text-field
            v-model="resto.name"
            :counter="50"
            :error-messages="errors"
            label="Name"
            required
        ></v-text-field>
      </validation-provider>
      <validation-provider
          v-slot="{ errors }"
          name="city"
          rules="required|max:30"
      >
        <v-text-field
            v-model="resto.city"
            :counter="50"
            :error-messages="errors"
            label="city"
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
            label="address"
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
    resto: {
      name: '',
      address: '',
      city: '',
      restaurateurId : ''
    }
  }),

  methods: {
    submit () {
      this.resto.restaurateurId = parseInt(this.$session.get('user').id)
      this.$refs.observer.validate()
      this.$store.dispatch('restaurants/addRestaurant', this.resto);
      this.$router.push({name: 'Home'})
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
