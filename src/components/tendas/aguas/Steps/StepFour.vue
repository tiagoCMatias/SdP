<template>
  <v-form v-model="form_estrutura" ref="form_estrutura" mx-3 v-bind:estrutura="estrutura">
    <v-layout row>
      <v-flex xs3  hidden-xs-only>
        <v-subheader>Largura</v-subheader>
      </v-flex>
      <v-flex mr-2 >
        <v-select
          :items="tamanho_tendas[0]"
          v-model="estrutura.largura"
          :rules="form_base_rule"
          label="Tamanho"
          class="input-group"
          item-value="text"
          required
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs3 hidden-xs-only>
        <v-subheader>Comprimento</v-subheader>
      </v-flex>
      <v-flex mr-2>
        <v-text-field box
                      v-model="estrutura.comprimento"
                      :rules="comprimentoRules"
                      label="Comprimento"
                      required></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap >
      <v-flex xs3 hidden-xs-only>
        <v-subheader>Topo 1</v-subheader>
      </v-flex>
      <v-flex mr-2>
        <v-radio-group label="Topo" v-model="estrutura.tipo_topo_1" row>
          <v-radio label="Direito" value="Direito" ></v-radio>
          <v-radio label="Redondo" value="Redondo" ></v-radio>
        </v-radio-group>
      </v-flex>
    </v-layout>
    <v-layout row wrap >
      <v-flex xs3 hidden-xs-only>
        <v-subheader>Topo 2</v-subheader>
      </v-flex>
      <v-flex mr-2>
        <v-radio-group label="Topo" v-model="estrutura.tipo_topo_2" row>
          <v-radio label="Direito" value="Direito" ></v-radio>
          <v-radio label="Redondo" value="Redondo" ></v-radio>
        </v-radio-group>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs3 hidden-xs-only>
        <v-subheader>Fixação</v-subheader>
      </v-flex>
      <v-flex mr-2>
        <v-select
          :items="tipo_fixacao"
          v-model="estrutura.fixacao"
          :rules="form_base_rule"
          label="Fixação"
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
        form_estrutura: null,
        tamanho_tendas: [
          ["10", "15", "20", "25"]
        ],
        estrutura: {
          fixacao: 0,
          comprimento: 0,
          largura: 0,
          tipo_topo_2: null,
          tipo_topo_1: null,
        },
        form_base_rule: [
          v => !!v || "Introduzir Valor"
        ],
        comprimentoRules: [
          v => !!v || "Introduzir Comprimento",
          v => (v >= 1 && v % 1.25 === 0) || "Comprimento (multiplo 1.25)"
        ],
        tipo_fixacao: ["Estacas", "Pesos", "Estrado"],
      }
    },
    methods: {      
      sendForm()
      {
        if(this.$refs.form_estrutura.validate()){
          this.$emit('formComplete', this.estrutura);
        }
      }
    }
  }
</script>
