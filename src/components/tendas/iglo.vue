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
                label="Comprimento"
                required></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row wrap >
            <v-flex xs3 hidden-xs-only>
                <v-subheader>Topo</v-subheader>
            </v-flex>
            <v-flex mr-2>
              <v-radio-group  label="Topo" v-model="tenda.tipo_topo" row>
                <v-radio label="Direito" value="Direito" ></v-radio>
                <v-radio label="Redondo" value="Redondo" ></v-radio>
              </v-radio-group>
            </v-flex> 
        </v-layout>     
        <v-layout row >
            <v-flex xs3 hidden-xs-only>
                <v-subheader>Altura do Pé</v-subheader>
            </v-flex>
            <v-flex mr-2>
            <v-text-field box 
                v-model="tenda.altura_do_pe"
                label="Altura do Pé"
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
        <v-btn color="primary" @click.native="estrutura_iglo()">Continue</v-btn>
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
            <v-btn color="primary" @click.native="cobertura_iglo()">Continue</v-btn>
            <v-btn flat @click.native="mySlider = mySlider -  1">Cancel</v-btn>
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
            <v-btn color="primary" @click.native="lateraisIglo()">Continue</v-btn>
            <v-btn flat @click.native="mySlider = mySlider -  1">Cancel</v-btn>                    
        </v-stepper-content>
       <v-stepper-content step="4">
          <v-card >
          <v-card-text>
          <v-container fluid grid-list-md>
              <v-layout row wrap>
                <v-flex xs12 text-xs-center>
                    <v-subheader class="display-2" >Triangulo</v-subheader>
                </v-flex>
              <v-flex xs9>
                  <v-slider label="Opaco" v-model="tenda.triangulo_opaco"></v-slider>
              </v-flex>
              <v-flex xs3>
                  <v-text-field v-model="tenda.triangulo_opaco" type="number"></v-text-field>
              </v-flex>
              <v-flex xs9>
                  <v-slider label="Transparente"  v-model="tenda.triangulo_transparante"></v-slider>
              </v-flex>
              <v-flex xs3>
                  <v-text-field v-model="tenda.triangulo_transparante" type="number"></v-text-field>
              </v-flex>
              <v-flex xs9>
                  <v-slider label="Blackout" v-model="tenda.triangulo_blackout"></v-slider>
              </v-flex>
              <v-flex xs3 >
                  <v-text-field v-model="tenda.triangulo_blackout" type="number"></v-text-field>
              </v-flex>
              </v-layout>
          </v-container>
          </v-card-text>
          </v-card>
          <v-btn color="primary" @click.native="trianguloIglo()">Continue</v-btn>
          <v-btn flat @click.native="mySlider = mySlider -  1">Cancel</v-btn>                    
        </v-stepper-content>

        <v-stepper-content step="5">
            <v-dialog v-model="table_edit_dialog" max-width="500px">
            <v-btn color="primary" dark slot="activator" class="mb-2">New Item</v-btn>
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
  </v-container>
</template>


<script>
import { EstruturaIglo, CoberturaIglo, LateraisIglo } from "@/utils/tendas/iglo.js";
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
            altura_do_pe: "",
            fixacao: "",
            tipo_topo: "Direito",
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
        header: [
            {
                text: "Material",
                align: "left",
                sortable: false,
                value: "title"
            },
            { text: "Qt", value: "qt" }
        ],
        items: [],
        index_tamanho: 0,
        form_base_rule: [
            v => !!v || "Introduzir Valor"
        ],
        lateral_rules: [
            
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
        max_laterais: 0,
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
        let tenda = 
            { 
                tipo: "iglo",
                largura: "20",
                comprimento: "15",
                altura_do_pe: "",
                fixacao: "Estrado",
                tipo_topo: "direito",
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
        if (this.$refs.form_estrutura.validate()) {
        //calcularIglo(tenda);
        let resposta = EstruturaIglo(this.tenda);
        console.log(resposta);
        resposta.forEach(element => {
            this.items.push({
                codigo: "1.1." + this.tenda.largura + "." + element.codigo,
                title: element.title,
                qt: element.qt
            });
        });
        let resto = this.tenda.comprimento%5;
        let modulos_5 = Math.floor(this.tenda.comprimento/5);

        this.max_laterais = modulos_5*2; 
        this.mySlider = 2;
        }
    },
    cobertura_iglo: function() {
        this.mySlider = 3;
        let resposta = CoberturaIglo(this.tenda);
        resposta.forEach(element => {
            this.items.push({
                codigo: "1.1." + this.tenda.largura + "." + element.codigo,
                title: element.title,
                qt: element.qt
            });
        });
    },
    lateraisIglo: function() {
        
        this.mySlider = 4;

    },
    trianguloIglo: function() {
        this.mySlider = 5;
    }
  }
}
</script>

