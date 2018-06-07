<template>
    <v-form v-model="formLaterais" ref="formLaterais" mx-3>
        <v-layout row wrap>
            <v-flex xs12 text-xs-center>
                <v-subheader class="display-2" >Laterais - {{ maxLateral }}</v-subheader>
            </v-flex>
            <v-flex xs6 sm9>
                <v-text-field label="Opaco" :rules="rulesLaterais" readonly v-model="lateral.opaco" type="number"></v-text-field>
            </v-flex>
            <v-flex xs3 sm1 text-xs-right>
                <v-btn @click.native="lateral.opaco = lateral.opaco+1" color="dark" fab small>
                    <v-icon >add</v-icon>
                </v-btn>
            </v-flex>
            <v-flex xs3 sm1 text-xs-right>
                <v-btn @click.native="lateral.opaco > 0 ? lateral.opaco-- : lateral.opaco = 0" color="dark" fab small>
                    <v-icon >remove</v-icon>
                </v-btn>
            </v-flex>
            <v-flex xs6 sm9>
                <v-text-field label="Transparente" readonly :rules="rulesLaterais" v-model="lateral.transparente" type="number"></v-text-field>
            </v-flex>
            <v-flex xs3 sm1 text-xs-right>
                <v-btn @click.native="lateral.transparente = lateral.transparente+1" color="dark" fab small >
                    <v-icon >add</v-icon>
                </v-btn>
            </v-flex>
            <v-flex xs3 sm1 text-xs-right>
                <v-btn @click.native="lateral.transparente > 0 ? lateral.transparente-- : lateral.transparente = 0" color="dark" fab small >
                    <v-icon >remove</v-icon>
                </v-btn>
            </v-flex>

            <v-flex xs6 sm9>
                <v-text-field label="Blackout" readonly :rules="rulesLaterais" v-model="lateral.blackout" type="number"></v-text-field>
            </v-flex>
            <v-flex xs3 sm1 text-xs-right>
                <v-btn @click.native="lateral.blackout = lateral.blackout+1" color="dark" fab small >
                    <v-icon >add</v-icon>
                </v-btn>
            </v-flex>
            <v-flex xs3 sm1 text-xs-right>
                <v-btn @click.native="lateral.blackout > 0 ? lateral.blackout-- : lateral.blackout = 0" color="dark" fab small >
                    <v-icon >remove</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
        <v-btn color="primary" @click.native="sendLaterais()">Continue</v-btn>
    </v-form>
</template>


<script>
  export default {
    data() {
      return {
        formLaterais: null,
        tamanho_tendas: [
          ["3", "5"],
        ],
        lateral: {
          opaco: 0,
          transparente: 0,
          blackout: 0,
        },
        maxLateral: 4,
        form_base_rule: [
          v => !!v || "Introduzir Valor"
        ],
        tipo_de_telas: ["Transparente", "Blackout", "Opaco"],
        tipo_fixacao: ["Estacas", "Pesos", "Estrado"],
        rulesLaterais: [
          v => this.lateral.opaco+this.lateral.transparente+this.lateral.blackout <= this.maxLateral || "Demasiadas Laterais",
        ]
      }
    },
    methods: {      
      sendLaterais()
      {
        if(this.$refs.formLaterais.validate()){
          this.$emit('formComplete', this.lateral);
        }
      }
    }
  }
</script>
