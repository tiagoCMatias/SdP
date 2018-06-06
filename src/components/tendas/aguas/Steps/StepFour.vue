<template>
  <v-form v-model="formTriangulos" ref="formTriangulos" mx-3 >
    <v-layout row wrap class="text-xs-center">
      <v-flex xs12 >
          <v-subheader>Triangulos </v-subheader>
      </v-flex>
      <v-flex xs12 sm5 ml-5>
          <v-select
          :items="tipo_de_telas"
          v-model="triangulo.one"
          :rules="form_base_rule"
          label="Triangulo 1"
          class="input-group"
          item-value="text"
          required
          ></v-select>
      </v-flex>
      <v-flex xs12 sm5 ml-5>
          <v-select
          :items="tipo_de_telas"
          v-model="triangulo.two"
          :rules="form_base_rule"
          label="Triangulo 2"
          class="input-group"
          item-value="text"
          required
          ></v-select>
      </v-flex>
    </v-layout>
    <v-btn color="primary" @click.native="sendForm()">Continue</v-btn>
  </v-form>
</template>


<script>
  export default {
    data() {
      return {
        formTriangulos: null,
        tamanho_tendas: [
          ["10", "15", "20", "25"]
        ],
        triangulo: {
          one: null,
          two: null
        },
        form_base_rule: [
          v => !!v || "Introduzir Valor"
        ],
        comprimentoRules: [
          v => !!v || "Introduzir Comprimento",
          v => (v >= 1 && v % 1.25 === 0) || "Comprimento (multiplo 1.25)"
        ],
        tipo_de_telas: ["Transparente", "Blackout", "Opaco"],
      }
    },
    methods: {      
      sendForm()
      {
        if(this.$refs.formTriangulos.validate()){
          this.$emit('formComplete', this.triangulo);
        }
      }
    }
  }
</script>
