<template>
  <v-container>
    <v-layout row>
      
        <v-flex xs12 sm6 offset-sm3>
          <div class="body-2 text-sm-center">Estrado</div>
        </v-flex>
        
    </v-layout>
    <v-form v-model="valid" ref="form" lazy-validation>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
          <v-text-field box 
          label="Largura" 
          v-model="largura"
          :rules="larguraRules"
          required></v-text-field>
        </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
       <v-text-field box 
          label="Comprimento" 
          v-model="comprimento"
          :rules="comprimentoRules"
          required></v-text-field>
        </v-flex>
    </v-layout>  
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3 class="text-xs-right" >
        <v-btn class="primary"
        @click.stop="loadIt"
        >Send</v-btn>
        <v-btn @click="clear">clear</v-btn></v-flex>
    </v-layout>
</v-form>
      <v-dialog v-model="dialog" max-width="330">
      <v-card align-center >
        <v-data-table
          v-bind:headers="headers"
          :items="items"
          hide-actions
          class="elevation-1"
        >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.quantidade }}</td>
        </template>
      </v-data-table>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script>
import { getEstrado } from '../utils/configuration-manager'
export default {
  data(){
      return {

        headers: [
          {
            text: 'Material',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Quantidade', value: 'Quantidade' }
        ],

        items: [
          {
            name: "Taipal",
            quantidade : 0
          },
          {
            name: "Barras 2.5",
            quantidade : 0
          },
          {
            name: "Barras 1.25",
            quantidade : 0
          },
          {
            name: "Pontos de Apoio",
            quantidade : 0
          }
        ],

        dialog: false,
        valid: true,
        largura: '',
        comprimento: '',

        larguraRules: [
          (v) => (!!v || 'Introduzir Largura'),
          (v) => (v >= 1 && v%1.25 === 0 || 'Largura (multiplo 1.25)')
        ],
        comprimentoRules: [
          (v) => (!!v || 'Introduzir Comprimento'),
          (v) => (v >= 1 && v%1.25 === 0 || 'Comprimento (multiplo 1.25)')
        ],
      }
  },
  methods: {
    loadIt: function() {
      if (this.$refs.form.validate()) {   
          console.log(this.largura + " - " + this.comprimento);
          getEstrado(this.largura, this.comprimento).then((resposta) => {
          console.log(resposta);
          
          this.dialog = true;
          this.items[0].quantidade = resposta.taipal;
          this.items[1].quantidade = resposta.b25_total;
          this.items[2].quantidade = resposta.b125;
          this.items[3].quantidade = resposta.pontoApoio;
          
        });
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

