<template>
    <v-form v-model="formCobertura" ref="formCobertura" mx-3>
    <v-layout row>
        <v-flex xs3 hidden-xs-only>
            <v-subheader>Cobertura</v-subheader>
        </v-flex>
        <v-flex >
            <v-select
            :items="tipo_de_telas"
            v-model="cobertura"
            label="Cobertura"
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
    data() {
      return {
        formCobertura: null,
        tamanho_tendas: [
          ["3", "5"],
        ],
        cobertura: null,
        form_base_rule: [
          v => !!v || "Introduzir Valor"
        ],
        tipo_de_telas: ["Transparente", "Blackout", "Opaco"],
        tipo_fixacao: ["Estacas", "Pesos", "Estrado"],
      }
    },
    methods: {      
      sendCobertura()
      {
        if(this.$refs.formCobertura.validate()){
          this.$emit('formComplete', this.cobertura);
        }
      }
    }
  }
</script>
