<template>
  <v-container>
    <v-card-text>
    <v-stepper v-model="mySlider">
        <v-stepper-header>
            <v-stepper-step step="1" :complete="mySlider > 1">Estrutura</v-stepper-step>
        <v-divider></v-divider>
            <v-stepper-step step="2" :complete="mySlider > 2">Cobertura</v-stepper-step>
        <v-divider></v-divider>
            <v-stepper-step step="3" :complete="mySlider > 3">Laterais</v-stepper-step>
        <v-divider></v-divider>
            <v-stepper-step step="4" :complete="mySlider > 4">Topo</v-stepper-step>
        <v-divider></v-divider>
            <v-stepper-step step="5" :complete="mySlider > 4">Tabela</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
        <v-stepper-content step="1">
        <v-form v-model="form_estrutura" ref="form_estrutura" mx-3>
        <!-- <v-layout row >
            <v-flex xs3 offset-md2>
                <v-subheader>Quantidade</v-subheader>
            </v-flex>
            <v-flex mr-5>
            <v-text-field box 
                v-model="quantidade_tendas"
                required></v-text-field>
            </v-flex>
        </v-layout>-->
        <v-layout row>
            <v-flex xs3  hidden-xs-only>
                <v-subheader>Largura</v-subheader>
            </v-flex>
            <v-flex mr-2 >
                <v-select
                :items="tamanho_tendas[0]"
                v-model="tenda.largura"
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
                v-model="tenda.comprimento"
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
              <v-radio-group  label="Topo" v-model="tenda.tipo_topo_1" row>
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
              <v-radio-group label="Topo" v-model="tenda.tipo_topo_2" row>
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
                v-model="tenda.fixacao"
                :rules="form_base_rule"
                label="Fixação"
                class="input-group"
                item-value="text"
                required
                ></v-select>
            </v-flex>
        </v-layout>
        <v-btn color="primary" @click.native="estrutura_iglo()">Continue</v-btn>
        <v-btn flat @click.native="dialog_slider = false">Cancel</v-btn> 
        </v-form>
        </v-stepper-content>
        <v-stepper-content step="2">
            <v-card>
            <v-card-text>
            <v-container>
            <v-layout row wrap>
                <v-flex xs12 text-xs-center>
                    <v-subheader class="display-2" >Cobertura - {{ max_cobertura }}</v-subheader>
                </v-flex>
                <v-flex xs9>
                    <v-slider  :max="max_cobertura - tenda.cobertura_blackout - tenda.cobertura_transparent"  v-model="tenda.cobertura_opaco"></v-slider>
                </v-flex>
                <v-flex xs3>
                    <v-text-field readonly label="Opaco" v-model="tenda.cobertura_opaco" type="number"></v-text-field>
                </v-flex>
                <v-flex xs9>
                    <v-slider  :max="max_cobertura - tenda.cobertura_blackout - tenda.cobertura_opaco"  v-model="tenda.cobertura_transparent"></v-slider>
                </v-flex>
                <v-flex xs3>
                    <v-text-field readonly label="Transparente" v-model="tenda.cobertura_transparent" type="number"></v-text-field>
                </v-flex>
                <v-flex xs9>
                    <v-slider  :max="max_cobertura - tenda.cobertura_transparent - tenda.cobertura_opaco"   v-model="tenda.cobertura_blackout"></v-slider>
                </v-flex>
                <v-flex xs3 >
                    <v-text-field readonly label="Blackout" v-model="tenda.cobertura_blackout" type="number"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row wrap v-if="show_cobertura">
                <v-flex xs3 hidden-xs-only>
                    <v-subheader>Cobertura - {{ resto }}</v-subheader>
                </v-flex>
                <v-flex mr-2>
                    <v-select
                    :items="tipo_de_telas"
                    v-model="tenda.cobertura_especial"
                    :rules="form_base_rule"
                    label="Cobertura Especial"
                    class="input-group"
                    item-value="text"
                    required
                    ></v-select>
                </v-flex>
            </v-layout>
            <v-btn color="primary" @click.native="cobertura_iglo()">Continue</v-btn>
            <v-btn flat @click.native="mySlider = mySlider -  1">Cancel</v-btn>
            </v-container></v-card-text></v-card>
        </v-stepper-content>
        <v-stepper-content step="3">
            <v-card >
            <v-card-text>
            <v-container fluid grid-list-md>
                <v-layout row wrap>
                <v-flex xs12 text-xs-center>
                    <v-subheader class="display-2" >Laterais - {{ max_laterais }}</v-subheader>
                </v-flex>
                <v-flex xs9>
                    <v-slider  :max="max_laterais - tenda.lateral_transparente - tenda.lateral_blackout"  v-model="tenda.lateral_opaco"></v-slider>
                </v-flex>
                <v-flex xs3>
                    <v-text-field readonly label="Opaco" v-model="tenda.lateral_opaco" type="number"></v-text-field>
                </v-flex>
                <v-flex xs9>
                    <v-slider  :max="max_laterais - tenda.lateral_opaco - tenda.lateral_blackout"  v-model="tenda.lateral_transparente"></v-slider>
                </v-flex>
                <v-flex xs3>
                    <v-text-field readonly label="Transparente" v-model="tenda.lateral_transparente" type="number"></v-text-field>
                </v-flex>
                <v-flex xs9>
                    <v-slider :max="max_laterais - tenda.lateral_opaco - tenda.lateral_transparente"   v-model="tenda.lateral_blackout"></v-slider>
                </v-flex>
                <v-flex xs3 >
                    <v-text-field readonly label="Blackout" v-model="tenda.lateral_blackout" type="number"></v-text-field>
                </v-flex>
                </v-layout>

                <v-layout row wrap v-if="tenda.tipo_topo_1 == 'Direito'">
                    <v-flex xs3 hidden-xs-only>
                        <v-subheader>Laterais Angulo</v-subheader>
                    </v-flex>
                    <v-flex mr-2>
                        <v-select
                        :items="tipo_de_telas"
                        v-model="tenda.lateral_direito_1"
                        :rules="form_base_rule"
                        label="Lateral Direito"
                        class="input-group"
                        item-value="text"
                        required
                        ></v-select>
                    </v-flex>
                    <v-flex mr-2>
                        <v-select
                        :items="tipo_de_telas"
                        v-model="tenda.lateral_esquerdo_1"
                        :rules="form_base_rule"
                        label="Lateral Esquerdo"
                        class="input-group"
                        item-value="text"
                        required
                        ></v-select>
                    </v-flex>
                </v-layout> 

                <v-layout row wrap v-if="tenda.tipo_topo_2 == 'Direito'">
                    <v-flex xs3 hidden-xs-only>
                        <v-subheader>Laterais Topo Direito</v-subheader>
                    </v-flex>
                    <v-flex mr-2>
                        <v-select
                        :items="tipo_de_telas"
                        v-model="tenda.lateral_direito_2"
                        :rules="form_base_rule"
                        label="Lateral Direito"
                        class="input-group"
                        item-value="text"
                        required
                        ></v-select>
                    </v-flex>
                    <v-flex mr-2>
                        <v-select
                        :items="tipo_de_telas"
                        v-model="tenda.lateral_esquerdo_2"
                        :rules="form_base_rule"
                        label="Lateral Esquerdo"
                        class="input-group"
                        item-value="text"
                        required
                        ></v-select>
                    </v-flex>
                </v-layout>   

                <v-layout row wrap v-if="tenda.tipo_topo_1 == 'Redondo' || tenda.tipo_topo_2 == 'Redondo'">
                    <v-flex xs3 hidden-xs-only>
                        <v-subheader>Laterais Topo Redondo</v-subheader>
                    </v-flex>
                    <v-flex mr-2 v-if="tenda.tipo_topo_1 == 'Redondo'">
                        <v-select
                        :items="tipo_de_telas"
                        v-model="tenda.lateral_topo_redondo_1"
                        :rules="form_base_rule"
                        label="Lateral Topo Redondo 1"
                        class="input-group"
                        item-value="text"
                        required
                        ></v-select>
                    </v-flex>
                    <v-flex mr-2 v-if="tenda.tipo_topo_2 == 'Redondo'">
                        <v-select
                        :items="tipo_de_telas"
                        v-model="tenda.lateral_topo_redondo_2"
                        :rules="form_base_rule"
                        label="Lateral Topo Redondo 2"
                        class="input-group"
                        item-value="text"
                        required
                        ></v-select>
                    </v-flex>
                </v-layout>


                <v-layout row wrap v-if="show_cobertura">
                    <v-flex xs3 hidden-xs-only>
                        <v-subheader>Laterais Modulo {{ resto }}</v-subheader>
                    </v-flex>
                    <v-flex mr-2>
                        <v-select
                        :items="tipo_de_telas"
                        v-model="tenda.lateral_especial_1"
                        :rules="form_base_rule"
                        label="Lateral Especial"
                        class="input-group"
                        item-value="text"
                        required
                        ></v-select>
                    </v-flex>
                    <v-flex mr-2>
                        <v-select
                        :items="tipo_de_telas"
                        v-model="tenda.lateral_especial_2"
                        :rules="form_base_rule"
                        label="Lateral Especial"
                        class="input-group"
                        item-value="text"
                        required
                        ></v-select>
                    </v-flex>
                </v-layout>
            </v-container>
            </v-card-text>
            </v-card>
            <v-btn color="primary" @click.native="lateraisIglo()">Continue</v-btn>
            <v-btn flat @click.native="mySlider = mySlider -  1">Cancel</v-btn>                    
        </v-stepper-content>
       <v-stepper-content step="4">
          <v-card >
          <v-card-text>
          <v-container fluid grid-list-md>
              <v-layout row wrap v-if="tenda.tipo_topo_1 == 'Redondo' || tenda.tipo_topo_2 == 'Redondo'">
                <v-flex xs12 text-xs-center>
                    <v-subheader class="display-2" >Bacalhau - {{ max_topo }}</v-subheader>
                </v-flex>
              <v-flex xs9>
                  <v-slider :max="max_topo - tenda.bacalhau_transparente - tenda.bacalhau_blackout" v-model="tenda.bacalhau_opaco"></v-slider>
              </v-flex>
              <v-flex xs3>
                  <v-text-field label="Opaco" readonly v-model="tenda.bacalhau_opaco" type="number"></v-text-field>
              </v-flex>
              <v-flex xs9>
                  <v-slider :max="max_topo - tenda.bacalhau_opaco - tenda.bacalhau_blackout"  v-model="tenda.bacalhau_transparente"></v-slider>
              </v-flex>
              <v-flex xs3>
                  <v-text-field label="Transparente" readonly v-model="tenda.bacalhau_transparente" type="number"></v-text-field>
              </v-flex>
              <v-flex xs9>
                  <v-slider :max="max_topo - tenda.bacalhau_opaco - tenda.bacalhau_transparente" v-model="tenda.bacalhau_blackout"></v-slider>
              </v-flex>
              <v-flex xs3 >
                  <v-text-field label="Blackout" readonly v-model="tenda.bacalhau_blackout" type="number"></v-text-field>
              </v-flex>
              </v-layout>
              <v-layout row wrap v-if="tenda.tipo_topo_1 == 'Direito' || tenda.tipo_topo_2 == 'Direito'">
                <v-flex xs3 hidden-xs-only>
                    <v-subheader>Triangulo</v-subheader>
                </v-flex>
                <v-flex mr-2 v-if="tenda.tipo_topo_1 === 'Direito'">
                    <v-select
                    :items="tipo_de_telas"
                    v-model="tenda.triangulo_1"
                    :rules="form_base_rule"
                    label="Triangulo Topo"
                    class="input-group"
                    item-value="text"
                    required
                    ></v-select>
                </v-flex>
                <v-flex mr-2 v-if="tenda.tipo_topo_2 === 'Direito'">
                    <v-select
                    :items="tipo_de_telas"
                    v-model="tenda.triangulo_2"
                    :rules="form_base_rule"
                    label="Triangulo Topo"
                    class="input-group"
                    item-value="text"
                    required
                    ></v-select>
                </v-flex>
            </v-layout>
          </v-container>
          </v-card-text>
          </v-card>
          <v-btn color="primary" @click.native="trianguloIglo()">Continue</v-btn>
          <v-btn flat @click.native="mySlider = mySlider -  1">Cancel</v-btn>                    
        </v-stepper-content>

        <v-stepper-content step="5">
            <v-card>
                <v-card-text>
                    <v-container>
                    <v-layout>
                        <v-flex xs3 mx-2>
                            <v-btn color="primary" dark slot="activator">New Item</v-btn>
                        </v-flex>
                        <v-flex xs6 mx-2>
                            <v-text-field
                                append-icon="search"
                                label="Search"
                                single-line
                                hide-details
                                v-model="search"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs3 mx-2 class="text-xs-right">
                            <v-btn color="primary" dark @click.native="adicionar_info_dialog = true" class="mb-2">PDF</v-btn>
                        </v-flex>
                    </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>
            <v-dialog v-model="table_edit_dialog" max-width="500px">
            
            <v-card>
                <v-card-title>
                <span class="headline">Novo</span>
                </v-card-title>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                        <v-text-field label="Nome" v-model="editedItem.title"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field label="Quantidade" v-model="editedItem.qt"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field label="Codigo" v-model="editedItem.codigo"></v-text-field>
                    </v-flex>
                    </v-layout>
                </v-container>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="close_table_dialog()">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click.native="save_table_dialog()">Save</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
            
            <v-data-table
                v-bind:headers="header"
                :items="items"
                hide-actions
                :search="search"
                class="elevation-1"
                >
                <template slot="items" slot-scope="props">
                <td>{{ props.item.title }}</td>
                <td class="text-xs-right">{{ props.item.qt }}</td>
                <!--<td class="text-xs-right">{{ props.item.codigo }}</td>-->
                <td class="justify-center layout px-0">
                <v-btn icon class="mx-0" @click="editItem(props.item)">
                    <v-icon color="primary">edit</v-icon>
                </v-btn>
                <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                    <v-icon color="red">delete</v-icon>
                </v-btn>
                </td>
                </template>
            </v-data-table>
            
            <v-btn color="primary" @click.native="mySlider = 1">Continue</v-btn>
            <v-btn flat @click.native="mySlider = mySlider - 1">Cancel</v-btn>

            <!-- PDF -->
            <v-dialog v-model="adicionar_info_dialog" max-width="500px">
                <v-card>
                    <v-card-title>
                        Preencher Cabeçalho
                    </v-card-title>   

                    <v-form v-model="info_form" ref="info_form">
                    <v-layout row wrap>
                        <v-flex xs12 mx-4>
                        <v-text-field
                        label="Local de Montagem"
                        v-model="local_montagem"
                        :rules="form_base_rule"
                        >
                        </v-text-field>
                        </v-flex>
                        <v-flex xs12 mx-4>
                        <v-dialog
                            persistent
                            v-model="data_evento_dialog"
                            lazy
                            full-width
                            width="290px"
                            :return-value.sync="date"
                        >
                            <v-text-field
                            slot="activator"
                            label="Data de Evento"
                            v-model="date"
                            prepend-icon="event"
                            :rules="form_base_rule"
                            readonly
                            ></v-text-field>
                            <v-card class="text-xs-right">
                            <v-date-picker v-model="date" scrollable></v-date-picker>
                                <v-spacer></v-spacer>
                                <v-btn color="primary"  @click="data_evento_dialog = false">Cancel</v-btn>
                                <v-btn color="primary" class="text-xs-right" @click="data_evento_dialog = false">OK</v-btn>
                            
                            </v-card>
                        </v-dialog>
                        </v-flex>
                    </v-layout>
                    <v-flex xs12 class="text-xs-right">
                        <v-btn @click="pdf_checkbox = false;">Cancelar</v-btn>
                        <v-btn class="primary" @click="generatePDF()">Ok</v-btn>
                    </v-flex>
                    </v-form> 
                </v-card>
                </v-dialog>

        </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card-text>
  </v-container>
</template>


<script>

import { EstruturaIglo, CoberturaIglo, LateraisIglo, calcularTopoIglo, calcularBola, UpdateRepeatedValues } from "@/utils/tendas/iglo.js";
import jsPDF from 'jspdf'
require('jspdf-autotable');
export default {
  data() {
    return {
      tamanho_tendas: [
            ["10", "15", "20", "25"]
        ],
        tenda: {
            tipo: "",
            largura: "",
            comprimento: "",
            fixacao: "",
            tipo_topo_1: "Direito",
            tipo_topo_2: "Direito",
            cobertura_opaco: 0,
            cobertura_transparent: 0,
            cobertura_blackout: 0,
            cobertura_especial: null,
            lateral_opaco: 0,
            lateral_transparente: 0,
            lateral_blackout: 0,
            lateral_topo_redondo_1: null,
            lateral_topo_redondo_2: null,
            lateral_especial_1: null,
            lateral_especial_2: null,
            triangulo_1: null,
            triangulo_2: null,
            bacalhau_blackout: 0,
            bacalhau_transparente: 0,
            bacalhau_opaco: 0,
            lateral_direito_1: 0,
            lateral_esquerdo_1: 0,
            lateral_direito_2: 0,
            lateral_esquerdo_2: 0
            
        },
        header: [
            {
                text: "Material",
                align: "left",
                sortable: false,
                value: "title"
            },
            { text: "Qt", value: "qt" }
        ],
        adicionar_info_dialog: false,
        local_montagem: '',
        adicionar_info_dialog: false,
        info_form: false,
        data_evento: null,
        data_evento_dialog: false,
        date: null,
        show_cobertura: false,
        search: '',
        items: [],
        index_tamanho: 0,
        form_base_rule: [
            v => !!v || "Introduzir Valor"
        ],
        lateral_rules: [
            
        ],
        resto: 0,
        comprimentoRules: [
            v => !!v || "Introduzir Comprimento",
            v => (v >= 1 && v % 1.25 === 0) || "Comprimento (multiplo 1.25)"
        ],
        tipo_fixacao: ["Estacas", "Pesos", "Estrado"],
        tipo_de_telas: ["Transparente", "Blackout", "Opaco"],
        dialog_tendas: false,
        form_estrutura: false,
        cabecalho_form: false,
        cabecalho_dialog: false,
        local_montagem: "",
        dia_evento: "",
        quantidade_tendas: "",
        dia_carga: "",
        dialog_slider: false,
        mySlider: 0,
        max_laterais: 0,
        max_cobertura: 0,
        max_topo: 2,
        table_edit_dialog: false,

        editedIndex: -1,
        editedItem: {
            title: '',
            qt: 0,
        },
        defaultItem: {
            title: '',
            qt: 0,
        },

        snackbar: false,
        snackbar_y: 'top',
        snackbar_x: null,
        snackbar_mode: '',
        snackbar_timeout: null,
        snackbar_text: ''
    };
  },
  methods: {
    editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.table_edit_dialog = true
    },
    deleteItem (item) {
        const index = this.items.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
    },
    close_table_dialog () {
        this.table_edit_dialog = false
        setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
        }, 300)
    },

    save_table_dialog () {
        if (this.editedIndex > -1) {
            Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
            this.items.push(this.editedItem)
        }
        this.close_table_dialog()
    },
    estrutura_iglo: function() {
        if (this.$refs.form_estrutura.validate()) {
            //calcularIglo(tenda);
            this.mySlider = 2;
            this.resto = this.tenda.comprimento%5;
            this.max_topo = 0;
            let modulos_5 = 0;
            let raio = (this.tenda.largura/2);
            let new_comprimento = this.tenda.comprimento;
            let laterais_topo = 0;

            if(this.tenda.tipo_topo_1 == "Redondo")
            {
                new_comprimento -= raio;
                this.max_topo += (this.tenda.largura/5)+2;
                laterais_topo += (this.tenda.largura/5)*2;
                
            }
            if(this.tenda.tipo_topo_2 == "Redondo")
            {
                new_comprimento -= raio;
                this.max_topo += (this.tenda.largura/5)+2;
                laterais_topo += (this.tenda.largura/5)*2;
            }
            if(this.tenda.tipo_topo_2 == "Redondo" || this.tenda.tipo_topo_1 == "Redondo")
            {
                this.resto = new_comprimento%5;    
                modulos_5 = Math.floor(new_comprimento/5);
                this.max_laterais = (modulos_5*2);
            }
            else
            {
                this.resto = new_comprimento%5;  
                modulos_5 = Math.floor(this.tenda.comprimento/5);
                this.max_laterais = (modulos_5*2); 
            }
            
            if(this.tenda.tipo_topo_1 == "Direito")
            {
                this.max_laterais += this.tenda.largura/5; 
                this.max_laterais -= 2 ;
            }
            if(this.tenda.tipo_topo_2 == "Direito")
            {
                this.max_laterais += this.tenda.largura/5; 
                this.max_laterais -= 2 ;
            }     

            this.max_cobertura = modulos_5; 
            if(this.resto){
                this.show_cobertura = true;
            }
            else {
                this.show_cobertura = false;
            }
            if(this.tenda.comprimento == this.tenda.largura && (this.tenda.tipo_topo_1 == "Redondo" && this.tenda.tipo_topo_2 == "Redondo"))
                return;
            let resposta = EstruturaIglo(this.tenda);
            console.log(resposta);
            resposta.forEach(element => {
                this.items.push({
                    codigo: "1.1." + this.tenda.largura + "." + element.codigo,
                    title: element.title,
                    qt: element.qt
                });
            });
            

            console.log("Bacalhau: " +this.max_topo);
                
        }
    },
    cobertura_iglo: function() {
        this.mySlider = 3;
        if(this.tenda.comprimento == this.tenda.largura && (this.tenda.tipo_topo_1 == "Redondo" && this.tenda.tipo_topo_2 == "Redondo"))                
            return;
        let resposta = CoberturaIglo(this.tenda);
        console.log(resposta);
        resposta.forEach(element => {
            this.items.push({
                codigo: "1.1." + this.tenda.largura + "." + element.codigo,
                title: element.title,
                qt: element.qt
            });
        });
    },
    lateraisIglo: function() {
        console.log("Opaco: " + this.tenda.lateral_opaco);
        console.log("Transparente: " + this.tenda.lateral_transparente);
        console.log("Blackout: " + this.tenda.lateral_blackout);

        this.mySlider = 4;
        if(this.tenda.comprimento == this.tenda.largura && (this.tenda.tipo_topo_1 == "Redondo" && this.tenda.tipo_topo_2 == "Redondo"))
                return;
        let resposta = LateraisIglo(this.tenda);
        resposta.forEach(element => {
            this.items.push({
                codigo: "1.1." + this.tenda.largura + "." + element.codigo,
                title: element.title,
                qt: element.qt
            });
        });
        //console.log(resposta);

    },
    trianguloIglo: function() {
        
        if(this.tenda.comprimento == this.tenda.largura && (this.tenda.tipo_topo_1 == "Redondo" && this.tenda.tipo_topo_2 == "Redondo"))
        {
           let resposta =  calcularBola(this.tenda);
           resposta.forEach(element => {
                this.items.push({
                    codigo: "1.1." + this.tenda.largura + "." + element.codigo,
                    title: element.title,
                    qt: element.qt
                });
            });
        }
        else
        {
            let resposta = calcularTopoIglo(this.tenda);
            resposta.forEach(element => {
                this.items.push({
                    codigo: "1.1." + this.tenda.largura + "." + element.codigo,
                    title: element.title,
                    qt: element.qt
                });
            });
        }

        let new_items = UpdateRepeatedValues(this.items);
        this.items = [];
        new_items.forEach(element => {
            this.items.push({
                codigo: "1.1." + this.tenda.largura + "." + element.codigo,
                title: element.title,
                qt: element.qt
            });
        });

        this.mySlider = 5;
        //console.log(resposta);
        
    },
    generatePDF() {
        if(this.$refs.info_form.validate())
        {
            let columns = [];
            this.header.forEach(element => {
            columns.push(element.text);
            });

            let rows = [];
            this.items.forEach(element => {
            rows.push([ element.title, element.qt  ]);
            });
            var doc = new jsPDF('p', 'pt');

            var currentDate = new Date();
            doc.setFontSize(24);
            doc.text(250, 40, "Tenda Iglo");
            //doc.addImage(imgData, 'JPEG', 350, 20, 180, 160);
            doc.setFontSize(14);
            doc.text(100, 80, "Data: "+ this.date);
            
            doc.text(100, 120, "Dimensões - "+ this.tenda.largura + "x"+this.tenda.comprimento );
                
            if(this.tenda.tipo_topo_1 != this.tenda.tipo_topo_2)
            {
                doc.text(100, 140, "Topo - "+ this.tenda.tipo_topo_1 + " e "+this.tenda.tipo_topo_2 );
            }
            else
            {
                doc.text(100, 140, "Topo - "+ this.tenda.tipo_topo_1 );
            }
            doc.text(100, 160, "Local: "+this.local_montagem);
            doc.autoTable(columns, rows, { startY: 200});
            doc.save(currentDate + " - " + this.largura +"x"+this.comprimento);
        }
    },
  }
}
</script>

