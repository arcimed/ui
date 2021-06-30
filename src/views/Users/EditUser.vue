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
            label="Prenom"
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
            label="Nom"
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
            v-model="user.address"
            :error-messages="errors"
            label="Adresse"
            required
        ></v-text-field>
      </validation-provider>

      <p>Nouveau mot de passe :</p>
      <v-col cols="12">
        <v-text-field
            v-model="user.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1" label="Mot de passe"
            counter @click:append="show1 = !show1">
        </v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
            block v-model="verify"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordMatch]" :type="show1 ? 'text' : 'password'"
            name="input-10-1" label="Mot de passe"
            counter @click:append="show1 = !show1">
        </v-text-field>
      </v-col>
      <v-btn
          class="mr-4"
          type="submit"
          :disabled="invalid"
      >
        Soumettre
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
      email: '',
      password: '',
    },
    show1: false,
    verify: '',
    temp: {},
    rules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 4) || "Min 4 characters"
    },
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
  computed:{
    passwordMatch() {
      return () => this.user.password === this.verify || "Password must match";
    }
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
      this.$toast.open({
        message: 'Votre compte a été modifié.',
        type: 'success'
      });
    },
  },
}
</script>

<style scoped>

</style>
