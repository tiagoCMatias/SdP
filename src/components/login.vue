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
        <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
            label="Name"
            v-model="name"
            :rules="nameRules"
            :counter="10"
            required
            ></v-text-field>

            <v-text-field
              name="input-10-1"
              label="Enter your password"
              hint="At least 8 characters"
              v-model="password"
              min="8"
              :append-icon="e1 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e1 = !e1)"
              :type="e1 ? 'password' : 'text'"
              counter
            ></v-text-field>

            <v-btn @click="submit" :disabled="!valid" focused >Submeter</v-btn>
            <v-btn @click="clear">Limpar</v-btn>
        </v-form>
  </v-container>
</template>

<script>

import { signIn } from '../utils/configuration-manager'
export default { 
    data: () => ({
        valid: true,
        alert: false,
        name: '',
        password: '',
        e1: true,
        nameRules: [
        (v) => (!!v || 'Name is required'),
        (v) => (v && v.length <= 10 || 'Name must be less than 10 characters')
        ],
        email: '',
        emailRules: [
        (v) => (!!v || 'E-mail is required'),
        (v) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid')
        ],
        select: null,
        checkbox: false
    }),
    mounted () {
        this.onResize()
    },

    methods: {
        submit () {
            if (this.$refs.form.validate()) {

            if((this.name === "admin" || this.name === "Admin" ) && this.password === "facil" )
            {
                console.log("In");
                this.$router.push('/menu');
            }
            else
            {
                this.alert = true;4
            }
            /*
            signIn(this.name, this.password).then((resposta) => {
                console.log(resposta);

                if(resposta.message == "Sucessful"){
                    this.$router.push('/menu')
                }
                else {
                    this.alert = true;
                }
                });*/
            }
        },
        clear () { 
        this.$refs.form.reset()
        },
        
        onResize () {
            this.windowSize = { x: window.innerWidth, y: window.innerHeight }
        },   
    }
}
</script>