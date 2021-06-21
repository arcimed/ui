<template>
  <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px" @click:outside="closeDialog">
    <div>
      <v-tabs v-model="tab" show-arrows background-color="deep-purple accent-4" icons-and-text dark grow>
        <v-tabs-slider color="purple darken-4"></v-tabs-slider>
        <v-tab v-for="i in tabs" :key="i.name">
          <v-icon large>{{ i.icon }}</v-icon>
          <div class="caption py-1">{{ i.name }}</div>
        </v-tab>
        <v-tab-item>
          <v-card class="px-4">
            <v-card-text>
              <v-form ref="loginForm" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="loginEmail" :rules="loginEmailRules" label="E-mail" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="loginPassword" :append-icon="show1?'eye':'eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="6" xsm="12">
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                    <v-btn x-large block :disabled="!valid" color="success" @click="login"> Login </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card class="px-4">
            <v-card-text>
              <v-form ref="registerForm" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="user.firstName" :rules="[rules.required]" label="First Name" maxlength="20" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="user.lastName" :rules="[rules.required]" label="Last Name" maxlength="20" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="user.address" :rules="[rules.required]" label="address" maxlength="20" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="user.city" :rules="[rules.required]" label="city" maxlength="20" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="user.email" :rules="emailRules" label="E-mail" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="user.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field block v-model="user.verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirm Password" counter @click:append="show1 = !show1"></v-text-field>
                  </v-col>
                  <div class="col-md-6 mb-3">
                    <span>role : </span>
                    <select v-model="user.role" class="form-control" placeholder="Role">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                    </select>
                  </div>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                    <v-btn x-large block :disabled="!valid" color="success" @click="createAccount">Register</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>
  </v-dialog>
</template>
<script>
export default {
  name: "CreateAccount",
  data() {
    return {
      dialog: true,
      tab: 0,
      tabs: [
        {name:"Login", icon:"mdi-account"},
        {name:"Register", icon:"mdi-account-outline"}
      ],
      valid: true,
      showLoader: false,
      user: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        verify: "",
        address:"",
        city: "",
        role: "",
      },
      loginPassword: "",
      loginEmail: "",
      loginEmailRules: [
        v => !!v || "Required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      emailRules: [
        v => !!v || "Required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],

      show1: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => (v && v.length >= 4) || "Min 4 characters"
      },

      errorMessage: [],
    };
  },
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    }
  },
  methods: {
    login() {
      console.log('log')
      this.showLoader = true;
      const user = {
        email: this.loginEmail,
        password: this.loginPassword,
      };
      this.$http
          .post(`user-connect`, user)
          .then((response) => {
            this.showLoader = false;

            if (response.status === 200) {
              this.$session.start()
              this.$session.set('token', response.data.data.token)
              this.$session.set('user', response.data.data.user)

              if(this.$route.name === 'Home') {
                this.$router.go()
              } else {
                this.$router.push({ name: 'Home'})
              }

              this.$toast.open({
                message: 'Vous êtes bien connecté(e)!',
                type: 'success'
              });
            } else {
              this.$toast.open({
                message: 'Informations d\'identification invalides!',
                type: 'warning'
              });
            }
          })
          .catch((error) => {
            this.isError = true;
            console.log(error)

            this.$toast.open({
              message: 'Informations d\'identification invalides!',
              type: 'warning'
            });
          });

      this.$emit('closeDialog');
    },
    createAccount() {
      this.showLoader = true;

      this.errorMessage = [];

      if (this.user.firstname.length < 5) {
        this.errorMessage.push(
          "FirstName should contains more than 5 character"
        );
      }

      if (this.ValidateEmail(this.user.email) === false) {
        this.errorMessage.push("Please provide a valid Email address");
      }
      if (this.errorMessage.length === 0) {
        this.$http
          .post(`http://localhost:3000/user-register`, this.user)
          .then(() => {
            this.showLoader = false;
          })
          .catch((error) => {
            console.log(error);
          });
      }

      this.$emit('closeDialog');
    },

    ValidateEmail(mail) {
      return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail);
    },

    closeDialog() {
      this.$emit('closeDialog');
    }
  },
};
</script>

<style>
.form-signup {
  width: 100%;
  max-width: 500px;
  padding: 15px;
  margin: auto;
}
</style>
