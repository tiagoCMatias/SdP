<template>
    <v-form v-model="formEstrado" ref="formEstrado" lazy-validation>
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
            <v-checkbox
                :label="'Gerar PDF'"
                v-model="pdf_checkbox"
            ></v-checkbox>
            <v-btn class="primary"
            @click.stop="loadIt"
            >Calcular</v-btn>
            <v-btn @click="clear">Limpar</v-btn></v-flex>
        </v-layout>
    </v-form>
</template>

<script>
export default {
  data(){
        return{
            formEstrado: 0,
            comprimento: 0,
            largura: 0,

            form_base_rule: [
                v => !!v || "Introduzir Valor"
            ],

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
      calculateComponents(){
          if (this.$refs.form.validate()) {   
            //console.log(this.largura + " - " + this.comprimento);
            calcEstrado(this.largura, this.comprimento).then((componentes) => {
            console.log(componentes);
            
            this.dialog = true;
            this.items[0].quantidade = componentes.taipal;
            this.items[1].quantidade = componentes.b25_total;
            this.items[2].quantidade = componentes.b125;
            this.items[3].quantidade = componentes.pontoApoio;
            this.items[4].quantidade = componentes.pontoApoio;
            this.items[5].quantidade = componentes.pontoApoio;

            this.$emit('formComplete', componentes);

            });
          }
      }
  }
}
</script>
