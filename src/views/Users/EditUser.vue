<template>
  <validation-observer ref="observer" v-slot="{ invalid }">

    <form @submit.prevent="submit">
      <validation-provider
          v-slot="{ errors }"
          name="firstname"
          rules="required|max:50"
      >
        <v-text-field
            v-model="user.firstname"
            :counter="30"
            :error-messages="errors"
            label="Firstname"
            required
        ></v-text-field>
      </validation-provider>
      <validation-provider
          v-slot="{ errors }"
          name="lastname"
          rules="required|max:50"
      >
        <v-text-field
            v-model="user.lastname"
            :counter="30"
            :error-messages="errors"
            label="Lastname"
            required
        ></v-text-field>
      </validation-provider>
      <validation-provider
          v-slot="{ errors }"
          name="email"
          rules="required|max:50"
      >
        <v-text-field
            v-model="user.email"
            :counter="50"
            :error-messages="errors"
            label="Email"
            required
        ></v-text-field>
      </validation-provider>
      <validation-provider
          v-slot="{ errors }"
          name="city"
          rules="required|max:50"
      >
        <v-text-field
            v-model="user.city"
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
            v-model="user.address"
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
import axios from "axios";

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
name: "EditUser",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    user: {
      firstname: '',
      lastname: '',
      address: '',
      city: '',
      email: ''

    },
    temp: {}
  }),
  props: {
    id: {
      required: true
    }
  },
  created() {
    this.temp = this.$session.get('user')
    this.user.firstname = this.temp.firstname
    this.user.lastname = this.temp.lastname
    this.user.email = this.temp.email
    this.user.address = this.temp.address
    this.user.city = this.temp.city
  },
  methods: {
    submit () {
      this.$refs.observer.validate()
      axios.put(`api/user/edit/` + this.id, this.user)
          .then((response) => {
            this.$session.remove('user')
            this.$session.set('user', response.data.data)
          })
          .catch((error) => {
          });
      this.$router.push({name: 'user'})
      this.$router.go()
    },
    clear () {
      this.firstname = ''
      this.lastname = ''
      this.email = ''
      this.address = ''
      this.city = ''
      this.$refs.observer.reset()
    },
  },
}
</script>

<style scoped>

</style>