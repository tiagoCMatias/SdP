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
            <v-stepper-step step="4" :complete="stepCount > 4">Tabela</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
            <v-stepper-content step="1">
                <StepOne 
                @formComplete="stepOneForm" />
            </v-stepper-content>

            <v-stepper-content step="2">
                <StepTwo 
                @formComplete="stepTwoForm" />
            </v-stepper-content>

            <v-stepper-content step="3">
                <StepThree 
                @formComplete="stepThreeForm" />
            </v-stepper-content>

            <v-stepper-content step="4">
                <StepFour
                @formComplete="stepThreeForm" 
                :items="this.tableItens"
                />
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
  calcularEstruturaConica,
  calcularCoberturaConica,
  calcularLateraisConica,
  UpdateRepeatedValues
} from "@/utils/tendas/conicas_teste.js";

export default {
  components: {StepOne, StepTwo, StepThree, StepFour},
  data() {
    return {
      stepCount: 0,
      estrutura: {},
      componentesEstrutura: [],
      componentesCobertura: [],
      componentesLaterais: [],
      
      tableItens: []
    };
  },
  methods: {
    stepOneForm: function(estrutura) {
      console.log(estrutura);
      this.estrutura = estrutura;
      let resposta = calcularEstruturaConica(this.estrutura);
      console.log(resposta);
      resposta.forEach(element => {
        this.componentesEstrutura.push({
          codigo: "1.1." + this.estrutura.tamanho + "." + element.codigo,
          title: element.title,
          qt: element.qt
        });
      });

      this.stepCount++;
    },
    stepTwoForm: function(cobertura) {
      console.log(cobertura);

      let resposta = calcularCoberturaConica(cobertura, this.estrutura);
      console.log(resposta);
      this.componentesCobertura.push({
        codigo: "",
        title: resposta.title,
        qt: resposta.qt
      });

      this.stepCount++;
    },

    stepThreeForm: function(laterais) {
      console.log(laterais);
      let resposta = calcularLateraisConica(laterais, this.estrutura);
      console.log(resposta);
      resposta.forEach(element => {
          this.componentesLaterais.push({
              codigo: "1.1." + this.estrutura.largura + "." + element.codigo,
              title: element.title,
              qt: element.qt
          });
      });
      this.updateItens();
      this.stepCount++;
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
  }
};
</script>
