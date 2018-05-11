<template>
  <v-container>
    <v-card>
      <v-stepper v-model="stepCount">
        <v-stepper-header>
            <v-stepper-step step="1" :complete="stepCount > 1">Estrutura</v-stepper-step>
        <v-divider></v-divider>
            <v-stepper-step step="2" :complete="stepCount > 2">Cobertura</v-stepper-step>
        <v-divider></v-divider>
            <v-stepper-step step="3" :complete="stepCount > 3">Laterais</v-stepper-step>
        <v-divider></v-divider>
            <v-stepper-step step="4" :complete="stepCount > 4">Triangulos</v-stepper-step>
        <v-divider></v-divider>
            <v-stepper-step step="5" :complete="stepCount > 4">Tabela</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
            <v-stepper-content step="1">
              <StepOne 
                @formComplete="stepOneForm" />
            </v-stepper-content>
            <v-stepper-content step="2">
              <StepTwo
                @formComplete="stepTwoForm" 
                :maxCobertura="this.totalCobertura"
                :mostrarEspecial="this.mostrarEspecial"
                />
            </v-stepper-content>
            <v-stepper-content step="3">
              <StepThree 
                @formComplete="stepThreeForm" 
                :largura="this.estrutura.largura"
                :mostrarEspecial="this.mostrarEspecial"
                :maxLaterais="this.maxLaterais"
                />
            </v-stepper-content>
            <v-stepper-content step="4">
              <StepFour
                @formComplete="stepFourForm" />
            </v-stepper-content>
              
            
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-container>
</template>


<script>
import StepOne from "./Steps/StepOne";
import StepTwo from "./Steps/StepTwo";
import StepThree from "./Steps/StepThree";
import StepFour from "./Steps/StepFour";
import { 
    calcularAguas, 
    calcularTriangulo, 
    calcularCobertura, 
    calcularLaterais, 
    UpdateRepeatedValues 
} from "@/utils/tendas/aguas_teste.js";

export default {
  components: {StepOne, StepTwo, StepThree, StepFour},
  data() {
    return {
      stepCount: 0,
      estrutura: {},
      componentesEstrutura: [],
      componentesCobertura: [],
      componentesLaterais: [],
      totalCobertura: 0,
      tamanhoEspecial: 0,
      mostrarEspecial: false,
      maxLaterais: 0,
      tableItens: []
    };
  },
  methods: {
    stepOneForm: function(estrutura) {
      console.log(estrutura);
      this.totalModulos = Math.floor(estrutura.comprimento/5)
      console.log(this.totalModulos);
      this.totalCobertura = this.totalModulos;
      this.tamanhoEspecial = estrutura.comprimento%5
      if(this.tamanhoEspecial != 0) this.mostrarEspecial = true;

      this.stepCount++;
    },

    stepTwoForm: function(cobertura) {
      console.log(cobertura);

      this.stepCount++;
    },

    stepThreeForm: function(laterais) {
      console.log(laterais);

      //this.stepCount++;
    },

    stepFourForm: function(laterais) {
      console.log(laterais);

      //this.stepCount++;
    },

    updateItens: function(){
      let new_items = UpdateRepeatedValues([
        ...this.componentesEstrutura, 
        ...this.componentesCobertura,
        ...this.componentesLaterais,
      ]);
      new_items.forEach(element => {
          this.tableItens.push({
              codigo: "1.1." + this.estrutura.largura + "." + element.codigo,
              title: element.title,
              qt: element.qt
          });
      });
    },

    dimensionarLaterais: function (estrutura){
        this.max_cobertura = 0;
        let modulos_5 = Math.floor(this.estrutura.comprimento/5);
        let modulo_especial = this.estrutura.comprimento%5;

        //console.log("Especial -" + modulo_especial);
        if(modulo_especial != 0)
        {
            //console.log("Especial");
            this.show_cobertura = true;
            //this.max_cobertura++;
            this.modulo_especial = modulo_especial;
        }

        let n_triangulo = 0;

        n_triangulo = Math.floor(this.estrutura.largura/5)*2;

        if(this.estrutura.largura%5)
            n_triangulo -= 2;
        if(this.estrutura.largura == 12.5)
            n_triangulo =Math.floor(this.estrutura.largura/5)*2;
        this.max_laterais = modulos_5*2 + n_triangulo;
        this.max_cobertura += modulos_5;
        this.max_laterais_triangulo = 4;

        if(this.estrutura.largura == 12.5)
            this.max_laterais_triangulo = 2;
        if(this.estrutura.largura == 7.5  || this.estrutura.largura == 17.5)
            this.lateral_diferente = 3.75;
        else if(this.estrutura.largura == 12.5)
            this.lateral_diferente = 2.5;
      }
  }
};
</script>
