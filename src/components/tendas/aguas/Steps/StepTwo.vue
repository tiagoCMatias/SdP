<template>
  <v-form v-model="formCobertura" ref="formCobertura" mx-3>
    <v-layout row wrap>
        <v-flex xs12 text-xs-center>
            <v-subheader class="display-2" >Cobertura - {{ maxCobertura }}</v-subheader>
        </v-flex>
        <v-flex xs6 sm9>
            <v-text-field label="Opaco" :rules="rulesCobertura" readonly v-model="cobertura.opaco" type="number"></v-text-field>
        </v-flex>
        <v-flex xs3 sm1 text-xs-right>
            <v-btn @click.native="cobertura.opaco = cobertura.opaco+1" color="dark" fab small>
                <v-icon >add</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs3 sm1 text-xs-right>
            <v-btn @click.native="cobertura.opaco > 0 ? cobertura.opaco-- : cobertura.opaco = 0" color="dark" fab small>
                <v-icon >remove</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs6 sm9>
            <v-text-field label="Transparente" readonly :rules="rulesCobertura" v-model="cobertura.transparente" type="number"></v-text-field>
        </v-flex>
        <v-flex xs3 sm1 text-xs-right>
            <v-btn @click.native="cobertura.transparente = cobertura.transparente+1" color="dark" fab small >
                <v-icon >add</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs3 sm1 text-xs-right>
            <v-btn @click.native="cobertura.transparente > 0 ? cobertura.transparente-- : cobertura.transparente = 0" color="dark" fab small >
                <v-icon >remove</v-icon>
            </v-btn>
        </v-flex>

        <v-flex xs6 sm9>
            <v-text-field label="Blackout" readonly :rules="rulesCobertura" v-model="cobertura.blackout" type="number"></v-text-field>
        </v-flex>
        <v-flex xs3 sm1 text-xs-right>
            <v-btn @click.native="cobertura.blackout = cobertura.blackout+1" color="dark" fab small >
                <v-icon >add</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs3 sm1 text-xs-right>
            <v-btn @click.native="cobertura.blackout > 0 ? cobertura.blackout-- : cobertura.blackout = 0" color="dark" fab small >
                <v-icon >remove</v-icon>
            </v-btn>
        </v-flex>
    </v-layout>
    <v-layout row wrap v-if="mostrarEspecial">
        <v-flex xs3 hidden-xs-only>
            <v-subheader>Cobertura Especial - {{ tamanhoEspecial }}</v-subheader>
        </v-flex>
        <v-flex mr-2>
            <v-select
            :items="tipo_de_telas"
            v-model="cobertura.especial"
            :rules="form_base_rule"
            label="Cobertura Especial"
            class="input-group"
            item-value="text"
            required
            ></v-select>
        </v-flex>
    </v-layout>
    <v-btn color="primary" @click.native="sendCobertura()">Continue</v-btn>
    </v-form>
</template>


<script>
  export default {
    props: ['maxCobertura', 'mostrarEspecial', 'tamanhoEspecial'],
    data() {
      return {
        formCobertura: null,
        tamanho_tendas: [
          ["10", "15", "20", "25"]
        ],
        cobertura: {
          opaco: 0,
          transparente: 0,
          blackout: 0,
          especial: null,
        },
        form_base_rule: [
          v => !!v || "Introduzir Valor"
        ],
        rulesCobertura: [
          v => this.cobertura.opaco+this.cobertura.transparente+this.cobertura.blackout <= this.maxCobertura || "Demasiadas Coberturas",
        ],
        tipo_de_telas: ["Transparente", "Blackout", "Opaco"],
        tipo_fixacao: ["Estacas", "Pesos", "Estrado"],
      }
    },
    methods: {      
      sendCobertura()
      {
        if(this.$refs.formCobertura.validate()){
          this.$emit('formComplete', this.estrutura);
        }
      }
    }
  }
</script>
