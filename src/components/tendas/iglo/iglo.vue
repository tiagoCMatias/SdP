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
          <v-stepper-step step="4" :complete="stepCount > 4">Topo</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="5" :complete="stepCount > 4">Tabela</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <StepOne @formComplete="stepOneForm" />
          </v-stepper-content>
          <v-stepper-content step="2">
            <StepTwo 
              @formComplete="stepTwoForm" 
              :maxCobertura="this.totalCobertura" 
              :mostrarEspecial="this.mostrarEspecial"
              :tamanhoEspecial="this.tamanhoEspecial"
            />
          </v-stepper-content>

          <v-stepper-content step="3">
            <StepThree
              @formComplete="stepThreeForm" 
              :maxLateral="this.totalModulos*2"
              :topo1="this.topo1"
              :topo2="this.topo2"
              :mostrarEspecial="this.mostrarEspecial" 
            />
          </v-stepper-content>

          <v-stepper-content step="4">
            <StepFour
              @formComplete="stepFourForm" 
              :maxBacalhau="this.totalBacalhaus"
              :topo1="this.topo1"
              :topo2="this.topo2"
            />
          </v-stepper-content>

          <v-stepper-content step="5">
            <StepFive
              @formComplete="stepFourForm" 
              :items="this.tableItens"
              :estrutura="this.estrutura"
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
  import StepFive from "./Steps/StepFive";
  import { EstruturaIglo, CoberturaIglo, LateraisIglo, calcularTopoIglo, calcularBola, UpdateRepeatedValues } from "@/utils/tendas/iglo.js";
  import { calcularEstrado } from "../../../utils/helper";
  export default {
    components: {StepOne, StepTwo, StepThree, StepFour, StepFive},
    data() {
      return {
        stepCount: 0,
        estrutura: {},
        componentesEstrutura:[],
        componentesCobertura:[],
        componentesLaterais:[],
        componentesBacalhau:[],
        totalCobertura: 0,
        totalModulos: 0,
        mostrarEspecial: false,
        tamanhoEspecial: 0,
        totalBacalhaus: 0,
        totalLaterais: 0,
        topo1: "",
        topo2: "",
        tableItens: [],

      }
    },
    methods: {
      stepOneForm (estrutura) {
          console.log(estrutura);
          this.estrutura = estrutura;
          this.totalModulos = Math.floor(estrutura.comprimento/5)
          console.log(this.totalModulos);
          this.totalCobertura = this.totalModulos;
          this.tamanhoEspecial = estrutura.comprimento%5
          if(this.tamanhoEspecial != 0) this.mostrarEspecial = true;

          this.dimensionarLaterais(estrutura);

          let resposta = EstruturaIglo(estrutura);
          console.log(resposta);
          resposta.forEach(element => {
              this.componentesEstrutura.push({
                  codigo: "1.1." + estrutura.largura + "." + element.codigo,
                  title: element.title,
                  qt: element.qt
              });
          });

          if(estrutura.fixacao == "Estrado"){
            let componentesEstrado = calcularEstrado(estrutura.largura, estrutura.comprimento);
            console.log(componentesEstrado);
            this.componentesEstrutura.push(this, ... componentesEstrado);
          }
          this.stepCount++;
      },
      stepTwoForm (cobertura) {
          console.log(cobertura);
          this.stepCount++;
          if(this.estrutura.comprimento == this.estrutura.largura && (this.estrutura.tipo_topo_1 == "Redondo" && this.estrutura.tipo_topo_2 == "Redondo"))
                return;

          let resposta = CoberturaIglo(cobertura, this.estrutura);
          console.log(resposta);
          resposta.forEach(element => {
              this.componentesCobertura.push({
                  codigo: "1.1." + this.estrutura.largura + "." + element.codigo,
                  title: element.title,
                  qt: element.qt
              });
          });
          
      },
      stepThreeForm (laterais) {
          console.log('value');
          console.log(laterais);
          this.stepCount++;
          if(this.estrutura.comprimento == this.estrutura.largura && (this.estrutura.tipo_topo_1 == "Redondo" && this.estrutura.tipo_topo_2 == "Redondo"))
                return;

          let resposta = LateraisIglo(laterais, this.estrutura);
          console.log(resposta);
          resposta.forEach(element => {
              this.componentesLaterais.push({
                  codigo: "1.1." + this.estrutura.largura + "." + element.codigo,
                  title: element.title,
                  qt: element.qt
              });
          });
          
      },
      stepFourForm: function (bacalhau) {
          console.log('value');
          console.log(bacalhau);
          
          if(this.estrutura.comprimento == this.estrutura.largura && (this.estrutura.tipo_topo_1 == "Redondo" && this.estrutura.tipo_topo_2 == "Redondo"))
            calcularEspecial();
          else {
            let resposta =  calcularTopoIglo(this.estrutura, bacalhau);
            console.log("Update");
            resposta.forEach(element => {
                this.componentesBacalhau.push({
                    codigo: "1.1." + this.estrutura.largura + "." + element.codigo,
                    title: element.title,
                    qt: element.qt
                });
            });
          }

          this.updateItens();
          this.stepCount++;

          //
      },

      updateItens: function(){
        let new_items = UpdateRepeatedValues([
          ...this.componentesEstrutura, 
          ...this.componentesCobertura,
          ...this.componentesLaterais,
          ...this.componentesBacalhau
        ]);
        new_items.forEach(element => {
            this.tableItens.push({
                codigo: "1.1." + this.estrutura.largura + "." + element.codigo,
                title: element.title,
                qt: element.qt
            });
        });
      },

      calcularEspecial: function(){
            let resposta =  calcularBola(this.estrutura);
            resposta.forEach(element => {
                  this.componentesEstrutura.push({
                      codigo: "1.1." + this.estrutura.largura + "." + element.codigo,
                      title: element.title,
                      qt: element.qt
                  });
              });
      },
      dimensionarLaterais: function (estrutura){
        let raio = (estrutura.largura/2);
        let laterais_topo = 0;
        let new_comprimento = estrutura.comprimento;
        let modulos5 = estrutura.comprimento%5;

        this.topo1 = estrutura.tipo_topo_1;
        this.topo2 = estrutura.tipo_topo_2;

        if(estrutura.tipo_topo_1 == "Redondo")
        {
            new_comprimento -= raio;
            this.totalBacalhaus += (estrutura.largura/5)+2;
            laterais_topo += (estrutura.largura/5)*2;

        }
        if(estrutura.tipo_topo_2 == "Redondo")
        {
            new_comprimento -= raio;
            this.totalBacalhaus += (estrutura.largura/5)+2;
            laterais_topo += (estrutura.largura/5)*2;
        }
        if(estrutura.tipo_topo_2 == "Redondo" || estrutura.tipo_topo_1 == "Redondo")
        {
            this.resto = new_comprimento%5;
            modulos5 = Math.floor(new_comprimento/5);
            this.totalLaterais = (modulos5*2);
        }
        else
        {
            this.resto = new_comprimento%5;
            modulos5 = Math.floor(estrutura.comprimento/5);
            this.totalLaterais = (modulos5*2);
        }

        if(estrutura.tipo_topo_1 == "Direito")
        {
            this.totalLaterais += estrutura.largura/5;
            this.totalLaterais -= 2 ;
        }
        if(estrutura.tipo_topo_2 == "Direito")
        {
            this.totalLaterais += estrutura.largura/5;
            this.totalLaterais -= 2 ;
        }
      }
    }
  }
</script>
