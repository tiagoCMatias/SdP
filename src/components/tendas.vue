<template>
  <v-container class="text-sm-center" grid-list-xs>
    <v-layout row wrap>
        <v-flex xs3 offset-xs1
        v-for="itens in menuItens" :key="itens.select_index">
        <v-btn large class="primary" @click.native="loadContent(itens.select_index)">{{itens.title}}</v-btn>
        </v-flex>
    </v-layout>


    <!-- Teste de Stepper em dialog -->

    <v-dialog
            v-model="dialog_slider"
            fullscreen
            transition="dialog-bottom-transition"
            :overlay="false"
            scrollable
        >
        <v-card tile>
            <v-toolbar card dark color="primary">
            <v-btn icon @click.native="dialog_slider = false" dark>
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn dark flat @click.native="dialog = false">Save</v-btn>
            </v-toolbar-items>
            
            </v-toolbar>
            <v-card-text>
            
                <v-stepper v-model="mySlider">
                    <v-stepper-header>
                    <v-stepper-step step="1" :complete="mySlider > 1">Name of step 1</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="2" :complete="mySlider > 2">Name of step 2</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="3">Name of step 3</v-stepper-step>
                    </v-stepper-header>
                    <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-form v-model="form_tenda" ref="form_tenda" mx-3>
                <v-layout row >
                    <v-flex xs3 offset-md2>
                        <v-subheader>Quantidade</v-subheader>
                    </v-flex>
                    <v-flex mr-5>
                    <v-text-field box 
                        v-model="quantidade_tendas"
                        required></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs3 offset-md2>
                        <v-subheader>Largura</v-subheader>
                    </v-flex>
                    <v-flex mr-5>
                        <v-select
                        :items="tamanho_tendas[index_tamanho]"
                        v-model="tenda.largura"
                        label="Tamanho"
                        class="input-group"
                        item-value="text"
                        ></v-select>
                    </v-flex>
                </v-layout>               
                <v-layout row v-if="index_tamanho != 0">
                    <v-flex xs3 offset-md2>
                        <v-subheader>Comprimento</v-subheader>
                    </v-flex>
                    <v-flex mr-5>
                    <v-text-field box 
                        v-model="tenda.comprimento"
                        :rules="comprimentoRules"
                        required></v-text-field>
                    </v-flex>
                </v-layout> 
                <v-layout row v-if="index_tamanho != 0">
                    <v-flex xs3 offset-md2>
                        <v-subheader>Altura do Pé</v-subheader>
                    </v-flex>
                    <v-flex mr-5>
                    <v-text-field box 
                        v-model="tenda.altura_do_pe"
                        required></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs3 offset-md2>
                        <v-subheader>Fixação</v-subheader>
                    </v-flex>
                    <v-flex mr-5>
                        <v-select
                        :items="tipo_fixacao"
                        v-model="tenda.fixacao"
                        label="Fixação"
                        class="input-group"
                        item-value="text"
                        required
                        ></v-select>
                    </v-flex>
                </v-layout>
                    
                    
                    

           
                    <v-btn color="primary" @click.native="mySlider = 2">Continue</v-btn>
                    <v-btn flat @click.native="dialog_slider = false">Cancel</v-btn> </v-form>
                    </v-stepper-content>
                    <v-stepper-content step="2">
                        <v-layout row>
                            <v-flex xs3 offset-md2>
                                <v-subheader>Cobertura</v-subheader>
                            </v-flex>
                            <v-flex >
                                <v-select
                                :items="tipo_de_telas"
                                v-model="tenda.cobertura"
                                label="Telas"
                                class="input-group"
                                item-value="text"
                                required
                                ></v-select>
                            </v-flex>
                            <v-flex xs1 mr-5>
                                <v-btn fab small dark color="primary" @click="addRow"  >
                                    <v-icon dark>add</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                        <table class="table">
                            <tbody>
                                <tr v-for="item in rows" :key="item.index">
                                    <td width=30%></td>
                                    <td width=20%><v-select
                                            :items="tipo_de_telas"
                                            v-model="tenda.cobertura"
                                            label="Telas"
                                            class="input-group"
                                            item-value="text"
                                            required
                                            ></v-select>
                                    </td>
                                    <td width=20%>
                                    <v-flex>
                                    <v-text-field box 
                                        label="Quantidade"
                                        v-model="teste"
                                        required></v-text-field>
                                    </v-flex>
                                    </td>
                                    <td width=5%>
                                        <v-btn fab small dark color="primary" @click="addRow">
                                            <v-icon dark>add</v-icon>
                                        </v-btn>
                                    </td>
                                    <td width=5%>
                                        <v-btn fab small dark color="red" @click="removeRow">
                                            <v-icon dark>remove_circle</v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <v-layout row>
                            <v-flex xs3 offset-md2>
                                <v-subheader>Laterais</v-subheader>
                            </v-flex>
                            <v-flex mr-5>
                                <v-select
                                :items="tipo_de_telas"
                                v-model="tenda.laterais"
                                label="Telas"
                                class="input-group"
                                item-value="text"
                                required
                                ></v-select>
                            </v-flex>
                        </v-layout>
                    
                    <v-layout row v-if="index_tamanho != 0">
                        <v-flex xs3 offset-md2>
                            <v-subheader>Triangulo</v-subheader>
                        </v-flex>
                        <v-flex mr-5>
                            <v-select
                            :items="tipo_de_telas"
                            v-model="tenda.triangulo"
                            label="Telas"
                            class="input-group"
                            item-value="text"
                            required
                            ></v-select>
                        </v-flex>
                    </v-layout>
                        <v-btn color="primary" @click.native="mySlider = 3">Continue</v-btn>
                        <v-btn flat @click.native="mySlider = 1">Cancel</v-btn>
                    </v-stepper-content>
                    <v-stepper-content step="3">
                        <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                        <v-btn color="primary" @click.native="mySlider = 1">Continue</v-btn>
                        <v-btn flat @click.native="mySlider = 2">Cancel</v-btn>
                    </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>


            </v-card-text>

            <div style="flex: 1 1 auto;"/>
        </v-card>
    </v-dialog>


    <!-- End -->
    <!-- Dialog Configurador 

    <v-dialog
        v-model="dialog_tendas"
        fullscreen
        transition="dialog-bottom-transition"
        :overlay="false"
        scrollable
      >
        <v-card tile>
            <v-toolbar card dark color="primary">
            <v-btn icon @click.native="dialog_tendas = false" dark>
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Configurador</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn dark flat @click.native="dialog_tendas = false">Save</v-btn>
            </v-toolbar-items>
            <v-menu bottom right offset-y>
                <v-list>     
                </v-list>
            </v-menu>
            </v-toolbar>
            <v-form v-model="form_tenda" ref="form_tenda" mx-3>
                <v-layout row >
                    <v-flex xs3 offset-md2>
                        <v-subheader>Quantidade</v-subheader>
                    </v-flex>
                    <v-flex mr-5>
                    <v-text-field box 
                        v-model="quantidade_tendas"
                        required></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs3 offset-md2>
                        <v-subheader>Largura</v-subheader>
                    </v-flex>
                    <v-flex mr-5>
                        <v-select
                        :items="tamanho_tendas[index_tamanho]"
                        v-model="tenda.largura"
                        label="Tamanho"
                        class="input-group"
                        item-value="text"
                        ></v-select>
                    </v-flex>
                </v-layout>               
                <v-layout row v-if="index_tamanho != 0">
                    <v-flex xs3 offset-md2>
                        <v-subheader>Comprimento</v-subheader>
                    </v-flex>
                    <v-flex mr-5>
                    <v-text-field box 
                        v-model="tenda.comprimento"
                        :rules="comprimentoRules"
                        required></v-text-field>
                    </v-flex>
                </v-layout> 
                <v-layout row v-if="index_tamanho != 0">
                    <v-flex xs3 offset-md2>
                        <v-subheader>Altura do Pé</v-subheader>
                    </v-flex>
                    <v-flex mr-5>
                    <v-text-field box 
                        v-model="tenda.altura_do_pe"
                        required></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs3 offset-md2>
                        <v-subheader>Fixação</v-subheader>
                    </v-flex>
                    <v-flex mr-5>
                        <v-select
                        :items="tipo_fixacao"
                        v-model="tenda.fixacao"
                        label="Fixação"
                        class="input-group"
                        item-value="text"
                        required
                        ></v-select>
                    </v-flex>
                </v-layout>
                    <v-layout row>
                        <v-flex xs3 offset-md2>
                            <v-subheader>Cobertura</v-subheader>
                        </v-flex>
                        <v-flex >
                            <v-select
                            :items="tipo_de_telas"
                            v-model="tenda.cobertura"
                            label="Telas"
                            class="input-group"
                            item-value="text"
                            required
                            ></v-select>
                        </v-flex>
                        <v-flex xs1 mr-5>
                            <v-btn fab small dark color="primary" @click="addRow"  >
                                <v-icon dark>add</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                    <table class="table">
                        <tbody>
                            <tr v-for="item in rows" :key="item.index">
                                <td width=30%></td>
                                <td width=20%><v-select
                                        :items="tipo_de_telas"
                                        v-model="tenda.cobertura"
                                        label="Telas"
                                        class="input-group"
                                        item-value="text"
                                        required
                                        ></v-select>
                                </td>
                                <td width=20%>
                                <v-flex>
                                <v-text-field box 
                                    label="Quantidade"
                                    v-model="teste"
                                    required></v-text-field>
                                </v-flex>
                                </td>
                                <td width=5%>
                                    <v-btn fab small dark color="primary" @click="addRow">
                                        <v-icon dark>add</v-icon>
                                    </v-btn>
                                </td>
                                <td width=5%>
                                    <v-btn fab small dark color="red" @click="removeRow">
                                        <v-icon dark>remove_circle</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <v-layout row>
                        <v-flex xs3 offset-md2>
                            <v-subheader>Laterais</v-subheader>
                        </v-flex>
                        <v-flex mr-5>
                            <v-select
                            :items="tipo_de_telas"
                            v-model="tenda.laterais"
                            label="Telas"
                            class="input-group"
                            item-value="text"
                            required
                            ></v-select>
                        </v-flex>
                    </v-layout>
                
                <v-layout row v-if="index_tamanho != 0">
                    <v-flex xs3 offset-md2>
                        <v-subheader>Triangulo</v-subheader>
                    </v-flex>
                    <v-flex mr-5>
                        <v-select
                        :items="tipo_de_telas"
                        v-model="tenda.triangulo"
                        label="Telas"
                        class="input-group"
                        item-value="text"
                        required
                        ></v-select>
                    </v-flex>
                </v-layout>

                <v-layout>
                    <v-flex xs3 offset-xs6>
                        <v-btn @click="submit_form" :disabled="!form_tenda" focused >Submeter</v-btn>
                        <v-btn @click="clear">Limpar</v-btn>
                    </v-flex>
                </v-layout>
            </v-form>
        <div style="flex: 1 1 auto;"/>
        </v-card>
      </v-dialog>


    
    
    
    
    
    
   --> <!-- Tabela -->
    <v-dialog v-model="table_dialog">
      <v-card align-center >
        <v-data-table
          v-bind:headers="header"
          :items="items"
          hide-actions
          class="elevation-1"
        >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.title }}</td>
          <td class="text-xs-right">{{ props.item.qt }}</td>
          <td class="text-xs-right">{{ props.item.codigo }}</td>
        </template>
      </v-data-table>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="table_dialog = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog Cabeçalho -->
    <v-dialog v-model="cabecalho_dialog" max-width="500px">
            <v-card>
            <v-card-title>
                Preencher Cabeçalho
            </v-card-title>
            <v-form v-model="cabecalho_form" ref="cabecalho_form">
                    <v-layout row>
                    <v-flex>
                        <v-subheader>Local da Montagem</v-subheader>
                    </v-flex>
                    <v-flex offset-xs2 mr-5>
                        <v-text-field box 
                            v-model="local_montagem"
                            required></v-text-field>
                    </v-flex>
                </v-layout>
                    <v-layout row>
                        <v-flex xs3 offset-xs2>
                            <v-date-picker v-model="dia_evento" :reactive=true></v-date-picker>
                        </v-flex>
                    </v-layout> 
                <v-layout row xs3 offset-xs2>
                    <v-btn color="primary" flat @click.stop="cabecalho_dialog=false">Close</v-btn>
                </v-layout> 
            </v-form>         
        </v-card>
      </v-dialog>
  
  </v-container>
</template>


<script>
import { calcularTenda } from "../utils/tendas";

export default {
  data() {
    return {
      menuItens: [
        { icon: "", title: "Cónicas", link: "", select_index: 0 },
        { icon: "", title: "2 Águas", link: "", select_index: 1 },
        { icon: "", title: "Iglo", link: "", select_index: 2 }
      ],
      tamanho_tendas: [
        ["3", "5"],
        ["5", "7.5", "8", "10", "12.5", "15", "17.5", "20"],
        ["10", "15", "20", "25"]
      ],
      tenda: {
        largura: "",
        comprimento: "",
        altura_do_pe: "",
        fixacao: "",
        cobertura: "",
        laterais: "",
        triangulo: ""
      },
      rows: [],
      header: [
        {
          text: "Material",
          align: "left",
          sortable: false,
          value: "title"
        },
        { text: "Quantidade", value: "qt" },
        { text: "Codigo", value: "codigo" }
      ],
      items: [],
      index_tamanho: 0,
      comprimentoRules: [
        v => !!v || "Introduzir Comprimento",
        v => (v >= 1 && v % 1.25 === 0) || "Comprimento (multiplo 1.25)"
      ],
      tipo_fixacao: ["Estacas", "Pesos", "Estrado"],
      tipo_de_telas: ["Transparente", "Blackout", "Opaco"],
      dialog_tendas: false,
      form_tenda: false,
      cabecalho_form: false,
      cabecalho_dialog: false,
      local_montagem: "",
      dia_evento: "",
      quantidade_tendas: "",
      dia_carga: "",
      table_dialog: false,
      dialog_slider: false,
      mySlider: 0
    };
  },
  methods: {
    addRow: function() {
      console.log("a tentar");
      var elem = document.createElement("tr");
      this.rows.push({});
    },
    removeRow: function() {
      this.rows.splice(-1, 1);
    },
    loadContent: function(index) {
      this.dialog_slider = true;
      this.index_tamanho = index;
    },
    clear() {
      this.$refs.form_tenda.reset();
    },
    submit_form() {
      if (this.$refs.form_tenda.validate()) {
        this.items = [];
        //console.log(this.quantidade_tendas);
        let resposta = calcularTenda(this.tenda, this.quantidade_tendas);
        let index = 0;
        resposta.forEach(element => {
          this.items.push({
            codigo: "1.1." + this.tenda.largura + "." + element.codigo,
            title: element.title,
            qt: element.qt
          });
        });
        this.table_dialog = true;
        //console.log(this.items);//this.cabecalho_dialog = true;

        //this.generatePDF();
      }
    }
  }
};
</script>