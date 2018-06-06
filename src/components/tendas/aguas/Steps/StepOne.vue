<template>
  <v-form v-model="formEstrutura" ref="formEstrutura" mx-3 >
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
            required></v-text-field>
        </v-flex>
    </v-layout>
    <v-layout row >
        <v-flex xs3 hidden-xs-only>
            <v-subheader>Altura do Pé</v-subheader>
        </v-flex>
        <v-flex mr-2>
        <v-flex mr-2>
                <v-select
                :items="alturaDoPe[0]"
                v-model="estrutura.alturaDoPe"
                :rules="form_base_rule"
                label="Altura do Pé"
                class="input-group"
                item-value="text"
                required
                ></v-select>
            </v-flex>
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
        formEstrutura: null,
        tamanho_tendas: [
          ["10", "15", "20", "25"]
        ],
        alturaDoPe: [
          ["3", "4"]
        ],
        estrutura: {
          fixacao: null,
          comprimento: null,
          largura: null,
          tipo_topo_2: null,
          tipo_topo_1: null,
          alturaDoPe: null
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
        if(this.$refs.formEstrutura.validate()){
          this.$emit('formComplete', this.estrutura);
        }
      }
    }
  }
</script>
