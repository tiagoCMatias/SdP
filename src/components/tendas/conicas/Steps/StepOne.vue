<template>
    <v-form v-model="formEstrutura" ref="formEstrutura" mx-3>
    <v-layout row>
        <v-flex xs3  hidden-xs-only>
            <v-subheader>Tamanho</v-subheader>
        </v-flex>
        <v-flex mr-2 >
            <v-select
            :items="tamanho_tendas[0]"
            v-model="estrutura.tamanho"
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
          ["3", "5"],
        ],
        estrutura: {
          fixacao: 0,
          tamanho: 0,
        },
        form_base_rule: [
          v => !!v || "Introduzir Valor"
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
