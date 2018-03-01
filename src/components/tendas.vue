<template>
  <v-container class="text-sm-center" >
    <v-layout row wrap d-flex>
        <v-flex xs3 offset-xs1
            v-for="itens in menuItens" :key="itens.select_index">
        <v-btn large class="primary" @click.native="/*loadContent(itens.select_index) && */resto()">{{itens.title}}</v-btn>
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
                        <v-stepper-step step="1" :complete="mySlider > 1">Estrutura</v-stepper-step>
                    <v-divider></v-divider>
                        <v-stepper-step step="2" :complete="mySlider > 2">Cobertura</v-stepper-step>
                    <v-divider></v-divider>
                        <v-stepper-step step="3" :complete="mySlider > 3">Laterais</v-stepper-step>
                    <v-divider></v-divider>
                        <v-stepper-step step="4" :complete="mySlider > 4">Triangulo</v-stepper-step>
                    <v-divider></v-divider>
                        <v-stepper-step step="5" :complete="mySlider > 5">Tabela</v-stepper-step>
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
                            :items="tamanho_tendas[index_tamanho]"
                            v-model="tenda.largura"
                            :rules="form_base_rule"
                            label="Tamanho"
                            class="input-group"
                            item-value="text"
                            required
                            ></v-select>
                        </v-flex>
                    </v-layout>               
                    <v-layout row v-if="index_tamanho != 0">
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
                    <v-layout row v-if="index_tamanho != 0">
                        <v-flex xs3 hidden-xs-only>
                            <v-subheader>Altura do Pé</v-subheader>
                        </v-flex>
                        <v-flex mr-2>
                        <v-text-field box 
                            v-model="tenda.altura_do_pe"
                            required></v-text-field>
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
                    <v-btn color="primary" @click.native="estrutura_form()">Continue</v-btn>
                    <v-btn flat @click.native="dialog_slider = false">Cancel</v-btn> 
                    </v-form>
                    </v-stepper-content>
                    <v-stepper-content step="2">
                        <v-layout row>
                            <v-flex xs3 hidden-xs-only>
                                <v-subheader>Cobertura</v-subheader>
                            </v-flex>
                            <v-flex >
                                <v-select
                                :items="tipo_de_telas"
                                v-model="tenda.cobertura"
                                label="Cobertura"
                                class="input-group"
                                item-value="text"
                                required
                                ></v-select>
                            </v-flex>
                        </v-layout>                        
                        <v-btn color="primary" @click.native="cobertura_form()">Continue</v-btn>
                        <v-btn flat @click.native="mySlider = mySlider -  1">Cancel</v-btn>
                    </v-stepper-content>
                    <v-stepper-content step="3">
                        <v-card >
                        <v-card-text>
                        <v-container fluid grid-list-md>
                            <v-layout row wrap>
                            <v-flex xs12 text-xs-center>
                                <v-subheader>laterais</v-subheader>
                            </v-flex>
                            <v-flex xs9>
                                <v-slider label="Opaco" :max="4"  v-model="tenda.lateral_opaco"></v-slider>
                            </v-flex>
                            <v-flex xs3>
                                <v-text-field v-model="tenda.lateral_opaco" type="number"></v-text-field>
                            </v-flex>
                            <v-flex xs9>
                                <v-slider label="Transparente" :max="4"  v-model="tenda.lateral_transparante"></v-slider>
                            </v-flex>
                            <v-flex xs3>
                                <v-text-field v-model="tenda.lateral_transparante" type="number"></v-text-field>
                            </v-flex>
                            <v-flex xs9>
                                <v-slider label="Blackout" :max="4"   v-model="tenda.lateral_blackout"></v-slider>
                            </v-flex>
                            <v-flex xs3 >
                                <v-text-field v-model="tenda.lateral_blackout" type="number"></v-text-field>
                            </v-flex>
                            </v-layout>
                        </v-container>
                        </v-card-text>
                        </v-card>
                        <v-btn color="primary" @click.native="laterais_form()">Continue</v-btn>
                        <v-btn flat @click.native="mySlider = mySlider -  1">Cancel</v-btn>                    
                    </v-stepper-content>

                    <v-stepper-content step="4">
                        <v-card >
                        <v-card-text>
                        <v-container fluid grid-list-md>
                            <v-layout row wrap>
                            <v-flex xs9>
                                <v-slider label="Opaco" :max="4" :rules="lateral_rules" v-model="tenda.triangulo_opaco"></v-slider>
                            </v-flex>
                            <v-flex xs3>
                                <v-text-field v-model="tenda.lateral_opaco" type="number"></v-text-field>
                            </v-flex>
                            <v-flex xs9>
                                <v-slider label="Transparente" :max="4" :rules="lateral_rules" v-model="tenda.triangulo_transparante"></v-slider>
                            </v-flex>
                            <v-flex xs3>
                                <v-text-field v-model="tenda.lateral_transparante" type="number"></v-text-field>
                            </v-flex>
                            <v-flex xs9>
                                <v-slider label="Blackout" :max="4"  :rules="lateral_rules" v-model="tenda.triangulo_blackout"></v-slider>
                            </v-flex>
                            <v-flex xs3 >
                                <v-text-field v-model="tenda.lateral_blackout" type="number"></v-text-field>
                            </v-flex>
                            </v-layout>
                        </v-container>
                        </v-card-text>
                        </v-card>
                        <v-btn color="primary" @click.native="laterais_form()">Continue</v-btn>
                        <v-btn flat @click.native="mySlider = mySlider -  1">Cancel</v-btn>                    
                    </v-stepper-content>

                    <v-stepper-content step="5">
                        <v-dialog v-model="table_edit_dialog" max-width="500px">
                        <v-btn color="primary" dark slot="activator" class="mb-2">New Item</v-btn>
                        <v-card>
                            <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
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
                            class="elevation-1"
                            >
                            <template slot="items" slot-scope="props">
                            <td>{{ props.item.title }}</td>
                            <td class="text-xs-right">{{ props.item.qt }}</td>
                            <!--<td class="text-xs-right">{{ props.item.codigo }}</td>-->
                            <td class="justify-center layout px-0">
                            <v-btn icon class="mx-0" @click="editItem(props.item)">
                                <v-icon color="teal">edit</v-icon>
                            </v-btn>
                            <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                                <v-icon color="pink">delete</v-icon>
                            </v-btn>
                            </td>
                            </template>
                        </v-data-table>
                        
                        <v-btn color="primary" @click.native="mySlider = 1">Continue</v-btn>
                        <v-btn flat @click.native="mySlider = mySlider - 1">Cancel</v-btn>
                    </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>


            </v-card-text>

            <div style="flex: 1 1 auto;"/>
        </v-card>
    </v-dialog>
    <!-- End -->

    <!-- Snackbar -->

    <v-snackbar
      :timeout="snackbar_timeout"
      :top="snackbar_y === 'top'"
      :bottom="snackbar_y === 'bottom'"
      :right="snackbar_x === 'right'"
      :left="snackbar_x === 'left'"
      :multi-line="snackbar_mode === 'multi-line'"
      :vertical="snackbar_mode === 'vertical'"
      v-model="snackbar"
    >
      {{ snackbar_text }}
      <v-btn flat color="pink" @click.native="snackbar = false">Ok</v-btn>
    </v-snackbar>

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
import { calcularTenda, calcularEstrutura, calcularCobertura, calcularLaterais, calcularIglo } from "../utils/tendas";

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
            tipo: "",
            largura: "",
            comprimento: "",
            altura_do_pe: "",
            fixacao: "",
            tipo_topo: "",
            cobertura: "",
            laterais: "",
            lateral_opaco: "",
            lateral_transparante: "",
            lateral_blackout: "",
            triangulo_opaco: "",
            triangulo_transparente: "",
            triangulo_blackout: "",
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
            { text: "Qt", value: "qt" }
            //{ text: "Cod", value: "codigo" }
        ],
        items: [],
        index_tamanho: 0,
        form_base_rule: [
            v => !!v || "Introduzir Valor"
        ],
        lateral_rules: [
            v => ( v.lateral_opaco + v.lateral_transparante + v.lateral_blackout ) <= 4 || "Quantidade errada" 
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
        local_montagem: "",
        dia_evento: "",
        quantidade_tendas: "",
        dia_carga: "",
        dialog_slider: false,
        mySlider: 0,
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
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

  methods: {
    addRow: function() {
      console.log("a tentar");
      var elem = document.createElement("tr");
      this.rows.push({});
    },
    disableSlide: function() {
        if(this.tenda.lateral_opaco + this.tenda.lateral_transparante + this.tenda.lateral_blackout < 4)
            return true;
        else
            return false;
    },
    resto: function() {
        let tenda = 
            { 
                tipo: "iglo",
                largura: "10",
                comprimento: "15",
                altura_do_pe: "",
                fixacao: "Estrado",
                tipo_topo: "redondo",
                cobertura: "blackout",
                laterais: "",
                lateral_opaco: "",
                lateral_transparante: "",
                lateral_blackout: "",
                triangulo_opaco: "",
                triangulo_transparente: "",
                triangulo_blackout: "",
                triangulo: ""

            };
        
        console.log("Iglo" + calcularIglo(tenda))
    },
    removeRow: function() {
      this.rows.splice(-1, 1);
    },
    loadContent: function(index) {
      this.dialog_slider = true;
      this.index_tamanho = index;
      if(index == 0) this.tenda.tipo = "conica";
      if(index == 1) this.tenda.tipo = "2aguas";
      if(index == 2) this.tenda.tipo = "iglo";
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
    },
    laterais_form() {
        if(this.tenda.tipo == "conica")
            this.mySlider = 5;
        else
            this.mySlider = 4;
        let resposta = calcularLaterais(this.tenda);
        console.log(resposta);

            resposta.forEach(element => {
                this.items.push({
                    codigo: "1.1." + this.tenda.largura + "." + element.codigo,
                    title: element.title,
                    qt: element.qt
                });
            });
        

    },
    cobertura_form(){
        this.mySlider = 3;
        let resposta = calcularCobertura(this.tenda);
        console.log(resposta);
            this.items.push({
            codigo: "",
            title: resposta.title,
            qt: resposta.qt
        });
    },
    estrutura_form() {
        if (this.$refs.form_estrutura.validate()) {
            this.items = [];
            this.mySlider = 2;
            let resposta = calcularEstrutura(this.tenda);
            console.log(resposta);
            resposta.forEach(element => {
            this.items.push({
                codigo: "1.1." + this.tenda.largura + "." + element.codigo,
                title: element.title,
                qt: element.qt
            });
            });
        }
    },
    editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.table_edit_dialog = true
    },

    deleteItem (item) {
        //this.snackbar = true;

        const index = this.items.indexOf(item)
        //this.snackbar_text = "Apagar Item?"
        confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
        //if(this.snackbar == false)
        //    this.items.splice(index, 1);
    },

    close () {
        this.table_edit_dialog = false
        setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
        }, 300)
    },

    save () {
        if (this.editedIndex > -1) {
            Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
            this.items.push(this.editedItem)
        }
        this.close()
    }
  }
};
</script>