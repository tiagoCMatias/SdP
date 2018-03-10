<template>
  <v-container fluid>
    <v-card-text>
    <v-stepper v-model="mySlider">
        <v-stepper-header>
            <v-stepper-step step="1" :complete="mySlider > 1">Estrutura</v-stepper-step>
        <v-divider></v-divider>
            <v-stepper-step step="2" :complete="mySlider > 2">Cobertura</v-stepper-step>
        <v-divider></v-divider>
            <v-stepper-step step="3" :complete="mySlider > 3">Laterais</v-stepper-step>
        <v-divider></v-divider>
            <v-stepper-step step="4" :complete="mySlider > 4">Triangulos</v-stepper-step>
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
                    :items="altura_do_pe"
                    v-model="tenda.altura_do_pe"
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
                v-model="tenda.fixacao"
                :rules="form_base_rule"
                label="Fixação"
                class="input-group"
                item-value="text"
                required
                ></v-select>
            </v-flex>
        </v-layout>
        <v-btn color="primary" @click.native="mockAguas()">Continue</v-btn>
        <v-btn flat @click.native="dialog_slider = false">Cancel</v-btn> 
        </v-form>
        </v-stepper-content>
        <v-stepper-content step="2">
            <v-card>
            <v-card-text>
            <v-container>
            <v-layout row wrap>
                <v-flex xs12 text-xs-center>
                    <v-subheader class="display-1" >Cobertura - {{ max_cobertura }}</v-subheader>
                </v-flex>
                <v-flex xs9>
                    <v-slider  :max="max_cobertura - tenda.cobertura_blackout - tenda.cobertura_transparente"  v-model="tenda.cobertura_opaco"></v-slider>
                </v-flex>
                <v-flex xs3>
                    <v-text-field readonly label="Opaco" v-model="tenda.cobertura_opaco" type="number"></v-text-field>
                </v-flex>
                <v-flex xs9>
                    <v-slider  :max="max_cobertura - tenda.cobertura_blackout - tenda.cobertura_opaco"  v-model="tenda.cobertura_transparente"></v-slider>
                </v-flex>
                <v-flex xs3>
                    <v-text-field readonly label="Transparente" v-model="tenda.cobertura_transparente" type="number"></v-text-field>
                </v-flex>
                <v-flex xs9>
                    <v-slider  :max="max_cobertura - tenda.cobertura_transparente - tenda.cobertura_opaco"   v-model="tenda.cobertura_blackout"></v-slider>
                </v-flex>
                <v-flex xs3 >
                    <v-text-field readonly label="Blackout" v-model="tenda.cobertura_blackout" type="number"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row wrap v-if="show_cobertura">
                <v-flex xs3 hidden-xs-only>
                    <v-subheader>Cobertura - {{ modulo_especial }}</v-subheader>
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
            <v-btn color="primary" @click.native="calcularCobertura()">Continue</v-btn>
            <v-btn flat @click.native="mySlider = mySlider -  1">Cancel</v-btn>
            </v-container></v-card-text></v-card>
        </v-stepper-content>
        <v-stepper-content step="3">
            <v-card >
            <v-card-text>
            <v-container fluid grid-list-md>
                <v-layout row wrap>
                <v-flex xs12 text-xs-center>
                    <v-subheader class="display-1">Laterais 5m - {{ max_laterais }}</v-subheader>
                </v-flex>
                <v-flex xs9>
                    <v-slider label="Opaco" :max="max_laterais - tenda.lateral_transparente - tenda.lateral_blackout"  v-model="tenda.lateral_opaco"></v-slider>
                </v-flex>
                <v-flex xs3>
                    <v-text-field readonly v-model="tenda.lateral_opaco" type="number"></v-text-field>
                </v-flex>
                <v-flex xs9>
                    <v-slider label="Transparente" :max="max_laterais - tenda.lateral_opaco - tenda.lateral_blackout"  v-model="tenda.lateral_transparente"></v-slider>
                </v-flex>
                <v-flex xs3>
                    <v-text-field readonly v-model="tenda.lateral_transparente" type="number"></v-text-field>
                </v-flex>
                <v-flex xs9>
                    <v-slider label="Blackout" :max="max_laterais - tenda.lateral_transparente - tenda.lateral_opaco" v-model="tenda.lateral_blackout"></v-slider>
                </v-flex>
                <v-flex xs3 >
                    <v-text-field readonly v-model="tenda.lateral_blackout" type="number"></v-text-field>
                </v-flex>
                </v-layout>

                <v-layout row wrap v-if="tenda.largura==7.5 || tenda.largura==17.5 || tenda.largura==12.5">
                    <v-flex xs12 text-xs-center>
                        <v-subheader class="display-1">Laterais {{ lateral_diferente }}m - {{ max_laterais_triangulo }}</v-subheader>
                    </v-flex>
                    <v-flex xs9>
                        <v-slider label="Opaco" :max="max_laterais_triangulo - tenda.lateral_transparante_diferente - tenda.lateral_blackout_diferente"  v-model="tenda.lateral_opaco_diferente"></v-slider>
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field readonly v-model="tenda.lateral_opaco_diferente" type="number"></v-text-field>
                    </v-flex>
                    <v-flex xs9>
                        <v-slider label="Transparente" :max="max_laterais_triangulo - tenda.lateral_opaco_diferente - tenda.lateral_blackout_diferente"  v-model="tenda.lateral_transparante_diferente"></v-slider>
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field readonly v-model="tenda.lateral_transparante_diferente" type="number"></v-text-field>
                    </v-flex>
                    <v-flex xs9>
                        <v-slider label="Blackout" :max="max_laterais_triangulo - tenda.lateral_transparante_diferente - tenda.lateral_opaco_diferente" v-model="tenda.lateral_blackout_diferente"></v-slider>
                    </v-flex>
                    <v-flex xs3 >
                        <v-text-field readonly v-model="tenda.lateral_blackout_diferente" type="number"></v-text-field>
                    </v-flex>
                </v-layout>

                <v-layout row wrap v-if="show_cobertura">
                    <v-flex xs3 hidden-xs-only>
                        <v-subheader class="display-1">Laterais Modulo {{ modulo_especial }}</v-subheader>
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
            <v-btn color="primary" @click.native="calcularLateral()">Continue</v-btn>
            <v-btn flat @click.native="mySlider = mySlider -  1">Cancel</v-btn>                    
        </v-stepper-content>
       <v-stepper-content step="4">
          <v-card >
          <v-card-text>
          <v-container fluid grid-list-md>
              <v-layout row wrap class="text-xs-center">
                <v-flex xs12 >
                    <v-subheader>Triangulos </v-subheader>
                </v-flex>
                <v-flex xs12 sm4 mr-2>
                    <v-select
                    :items="tipo_de_telas"
                    v-model="tenda.triangulo_1"
                    :rules="form_base_rule"
                    label="Triangulo 1"
                    class="input-group"
                    item-value="text"
                    required
                    ></v-select>
                </v-flex>
                <v-flex xs12 sm4 mr-2>
                    <v-select
                    :items="tipo_de_telas"
                    v-model="tenda.triangulo_2"
                    :rules="form_base_rule"
                    label="Triangulo 2"
                    class="input-group"
                    item-value="text"
                    required
                    ></v-select>
                </v-flex>
                </v-layout>
          </v-container>
          </v-card-text>
          </v-card>
          <v-btn color="primary" @click.native="calcularTriangulo()">Continue</v-btn>
          <v-btn flat @click.native="mySlider = mySlider -  1">Cancel</v-btn>                    
        </v-stepper-content>

        <v-stepper-content step="5">
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
                <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
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
                    <v-icon color="blue">edit</v-icon>
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
import { calcularAguas, calcularTriangulo, calcularCobertura, calcularLaterais, UpdateRepeatedValues } from "@/utils/tendas/aguas.js";
import jsPDF from 'jspdf'
require('jspdf-autotable');
export default {
  data() {
    return {
      tamanho_tendas: [
            ["5", "7.5", "10", "12.5", "15", "17.5", "20"]
        ],
        altura_do_pe: [ "3", "4" ],
        search: '',
        tenda: {
            tipo: "",
            largura: "",
            comprimento: "",
            altura_do_pe: "",
            fixacao: "",
            tipo_topo: "",
            cobertura_opaco: 0,
            cobertura_transparente: 0,
            cobertura_blackout: 0,
            cobertura_especial: null,
            lateral_opaco: 0,
            lateral_transparente: 0,
            lateral_blackout: 0,
            
            lateral_opaco_diferente: 0,
            lateral_transparante_diferente: 0,
            lateral_blackout_diferente: 0,

            lateral_especial_1: null,
            lateral_especial_2: null,
            triangulo_1: null,
            triangulo_2: null,
        },
        header: [
            {
                text: "Material",
                align: "left",
                sortable: false,
                value: "title"
            },
            { text: "Qt", value: "qt" }
            //{ text: "Cod", value: "codigo" }
        ],
        items: [],
        index_tamanho: 0,
        form_base_rule: [
            v => !!v || "Introduzir Valor"
        ],
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
        lateral_diferente: 0,
        local_montagem: "",
        dia_evento: "",
        quantidade_tendas: "",
        dia_carga: "",
        dialog_slider: false,
        mySlider: 0,
        table_edit_dialog: false,
        show_cobertura: false,
        max_cobertura: 0,
        max_laterais: 0,
        modulo_especial: 0,
        max_laterais_triangulo: 0,

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
        snackbar_text: '',
        adicionar_info_dialog: false,
        local_montagem: '',
        adicionar_info_dialog: false,
        info_form: false,
        data_evento: null,
        data_evento_dialog: false,
        date: null,

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

    mockAguas: function() {
        this.max_cobertura = 0;
        let modulos_5 = Math.floor(this.tenda.comprimento/5);
        let modulo_especial = this.tenda.comprimento%5;

        //console.log("Especial -" + modulo_especial);
        if(modulo_especial != 0)
        {
            //console.log("Especial");
            this.show_cobertura = true;
            //this.max_cobertura++;
            this.modulo_especial = modulo_especial;
        }

        let n_triangulo = 0;

        n_triangulo = Math.floor(this.tenda.largura/5)*2;
        
        if(this.tenda.largura%5)
            n_triangulo -= 2;
        if(this.tenda.largura == 12.5)
            n_triangulo =Math.floor(this.tenda.largura/5)*2;
        this.max_laterais = modulos_5*2 + n_triangulo;
        this.max_cobertura += modulos_5;
        this.max_laterais_triangulo = 4;
        
        if(this.tenda.largura == 12.5)
            this.max_laterais_triangulo = 2;
        if(this.tenda.largura == 7.5  || this.tenda.largura == 17.5)
            this.lateral_diferente = 3.75;
        else if(this.tenda.largura == 12.5)
            this.lateral_diferente = 2.5;
        let resposta = calcularAguas(this.tenda);
        resposta.forEach(element => {
            this.items.push({
                codigo: "1.1." + this.tenda.largura + "." + element.codigo,
                title: element.title,
                qt: element.qt
            });
        });
        this.goToNextSlider();

    },
    calcularCobertura: function() {
    
        let resposta = calcularCobertura(this.tenda);
        console.log(resposta);
        resposta.forEach(element => {
            this.items.push({
                codigo: "1.1." + this.tenda.largura + "." + element.codigo,
                title: element.title,
                qt: element.qt
            });
        });
        this.goToNextSlider();
    },
    calcularTriangulo: function() {
        console.log(this.tenda.triangulo_1);
        console.log(this.tenda.triangulo_2);
        let resposta = calcularTriangulo(this.tenda);
        console.log(resposta);
        resposta.forEach(element => {
            this.items.push({
                codigo: "1.1." + this.tenda.largura + "." + element.codigo,
                title: element.title,
                qt: element.qt
            });
        });

        let new_items = UpdateRepeatedValues(this.items);
        this.items = [];
        new_items.forEach(element => {
            this.items.push({
                codigo: "1.1." + this.tenda.largura + "." + element.codigo,
                title: element.title,
                qt: element.qt
            });
        });

        


        this.goToNextSlider();
    },
    calcularLateral: function () {
        let resposta = calcularLaterais(this.tenda);
        console.log(resposta);
        resposta.forEach(element => {
            this.items.push({
                codigo: "1.1." + this.tenda.largura + "." + element.codigo,
                title: element.title,
                qt: element.qt
            });
        });


        this.goToNextSlider();
    },
    goToNextSlider: function() {
        this.mySlider++;
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
            doc.text(250, 40, "Tenda 2 Águas");
            //doc.addImage(imgData, 'JPEG', 350, 20, 180, 160);
            doc.setFontSize(14);
            doc.text(100, 80, "Data: "+ this.date);
            
            doc.text(100, 120, "Dimensões - "+ this.tenda.largura + "x"+this.tenda.comprimento );

            doc.text(100, 160, "Local: "+this.local_montagem);
            doc.autoTable(columns, rows, { startY: 200});
            doc.save(currentDate + " - " + this.largura +"x"+this.comprimento);
        }
    }
  }
}
</script>

