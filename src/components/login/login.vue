<template>
    <v-container >
        <v-slide-y-transition mode="out-in">
            <v-layout column align-center justify-center>
                <img src="@/assets/sitio_do_passal.png" width="50%" alt="Vuetify.js" >
            </v-layout>
        </v-slide-y-transition>
        <v-alert
          color="error"
          icon="check_circle"
          :value="alert"
          transition="scale-transition"
        >
        Try again.
        </v-alert>
        <v-form v-model="loginForm" ref="loginForm" lazy-validation>
            <v-text-field
            label="Username"
            v-model="name"
            :rules="formRules"
            :counter="10"
            required
            ></v-text-field>

            <v-text-field
              label="Password"
              hint="User password"
              v-model="password"
              :rules="formRules"
              :append-icon="e1 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e1 = !e1)"
              :type="e1 ? 'password' : 'text'"
              counter
              required
            ></v-text-field>

            <v-btn id="submitButton" @click="submit" focused >Submeter</v-btn>
            <v-btn id="cleanButton" @click="clear">Limpar</v-btn>
        </v-form>
  </v-container>
</template>

<script>
import { signIn } from "../../utils/configuration-manager";
import { mapActions } from "vuex";
export default {
  data: () => ({
    loginForm: false,
    alert: false,
    name: "",
    password: "",
    e1: true,
    formRules: [
      v => !!v || "Campo Obrigatório"
      //v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ]
  }),
  computed: {
    doneTodosCount() {
      return this.$store.getters.isLogged;
    }
  },

  methods: {
    submit: function() {
      if (this.$refs.loginForm.validate()) {
        this.$store
          .dispatch("authLogin", {
            username: this.name.toLowerCase(),
            password: this.password
          })
          .then(suc => {
            console.log(suc);
          })
          .catch(err => {
            this.alert = !this.$store.getters.authResult;
          });
      }
    },
    clear: function() {
      this.name = null;
      this.password = null;
    }
  }
};
</script>