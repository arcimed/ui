<template>
  <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px" @click:outside="hideLogRegisterModal">
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
                    <v-text-field v-model="loginPassword" :append-icon="show1?'eye':'eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Mot de passe" hint="Au moins 8 caractères" counter @click:append="show1 = !show1"></v-text-field>
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
                    <v-text-field v-model="user.firstname" :rules="[rules.required]" label="Prénom" maxlength="20" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="user.lastname" :rules="[rules.required]" label="Nom" maxlength="20" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="user.address" :rules="[rules.required]" label="Adresse" maxlength="20" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="user.city" :rules="[rules.required]" label="Ville" maxlength="20" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="user.email" :rules="emailRules" label="E-mail" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                        v-model="user.roleId"
                        :items="type"
                        item-text="name"
                        item-value="id"
                        label="Role de l'utilisateur"
                        persistent-hint
                        return-object
                        single-line
                        :disabled="this.role !== undefined"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="user.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Mot de passe" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field block v-model="user.verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Mot de passe" counter @click:append="show1 = !show1"></v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                    <v-btn x-large block :disabled="!valid" color="success" @click="createAccount">S'inscrire</v-btn>
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
  props: ['referralCode', 'emailRef', 'role'],
  data() {
    return {
      dialog: true,
      tab: 0,
      tabs: [
        { name:"Connexion", icon:"mdi-account" },
        { name:"Inscription", icon:"mdi-account-outline" }
      ],
      valid: true,
      showLoader: false,
      type: [
        {name : "Utilisateur", id: 1},
        {name : "Restaurateur", id: 2},
        {name : "Livreur", id: 3},
        {name : "Développeur", id: 4},
      ],
      user: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        verify: "",
        address:"",
        city: "",
        referralUserId: "",
        roleId: "",
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
      this.showLoader = true;
      const user = {
        email: this.loginEmail,
        password: this.loginPassword,
      };
      this.$http
          .post(`/api/user-connect`, user)
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
                this.$router.go()
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
            console.log(error)
            this.$toast.open({
              message: 'Informations d\'identification invalides!',
              type: 'warning'
            });
          });

      this.$emit('hideLogRegisterModal');
    },
    createAccount() {
      this.errorMessage = [];
      this.showLoader = true;

      if (this.ValidateEmail(this.user.email) === false) {
        this.errorMessage.push("Please provide a valid Email address");
      }
      if (this.errorMessage.length === 0) {
        this.user.roleId = this.user.roleId.id

        if (this.referralCode) {
          this.$http
              .get(`/api/getByReferralCode/` + String(this.referralCode))
              .then(response => {
                this.user.referralUserId = response.data.data.id;
                this.user.roleId = parseInt(this.role)

                this.$http
                    .post(`/api/user-register`, this.user)
                    .then(() => {
                      this.showLoader = false;
                      this.$router.push({name: 'Home'})
                      this.$emit('hideLogRegisterModal');
                    })
                    .catch((error) => {
                      console.log(error);
                    });

              }).catch((error) => {
            console.log(error);
          });
        } else {
          this.$http
              .post(`/api/user-register`, this.user)
              .then(() => {
                this.showLoader = false;
              })
              .catch((error) => {
                console.log(error);
              });

          this.$emit('hideLogRegisterModal');
        }
      }
    },

    ValidateEmail(mail) {
      return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail);
    },

    hideLogRegisterModal() {
      this.$emit('hideLogRegisterModal');
    }
  },
  mounted() {
    if (this.referralCode) {
      this.user.roleId = parseInt(this.role)
      this.tab = 1
      this.user.email = this.emailRef
    }
  }
};
</script>
