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
            <v-stepper-step step="4" :complete="mySlider > 4">Tabela</v-stepper-step>
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
                    <v-subheader>Laterais</v-subheader>
                </v-flex>
                <v-flex xs9>
                    <v-slider :max="4 - tenda.lateral_transparante - tenda.lateral_blackout"  v-model="tenda.lateral_opaco"></v-slider>
                </v-flex>
                <v-flex xs3>
                    <v-text-field v-model="tenda.lateral_opaco" label="Opaco" readonly :max="4 - tenda.lateral_transparante - tenda.lateral_blackout"  type="number"></v-text-field>
                </v-flex>
                <v-flex xs9>
                    <v-slider  :max="4 - tenda.lateral_opaco - tenda.lateral_blackout"  v-model="tenda.lateral_transparante"></v-slider>
                </v-flex>
                <v-flex xs3>
                    <v-text-field v-model="tenda.lateral_transparante" readonly label="Transparente" :max="4 - tenda.lateral_opaco - tenda.lateral_blackout" :rules="sliderRules" type="number"></v-text-field>
                </v-flex>
                <v-flex xs9>
                    <v-slider  :max="4 - tenda.lateral_opaco - tenda.lateral_transparante"   v-model="tenda.lateral_blackout"></v-slider>
                </v-flex>
                <v-flex xs3 >
                    <v-text-field v-model="tenda.lateral_blackout" readonly label="Blackout" :max="4 - tenda.lateral_opaco - tenda.lateral_transparante"  type="number"></v-text-field>
                </v-flex>
                </v-layout>
            </v-container>
            </v-card-text>
            </v-card>
            <v-btn color="primary" @click.native="laterais_form()">Continue</v-btn>
            <v-btn flat @click.native="mySlider = mySlider -  1">Cancel</v-btn>                    
        </v-stepper-content>
        <v-stepper-content step="4">
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
                    <v-icon color="blue ">edit</v-icon>
                </v-btn>
                <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                    <v-icon color="red darken-2">delete</v-icon>
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
import { calcularEstruturaConica, calcularCoberturaConica, calcularLateraisConica } from "@/utils/tendas/conicas.js";
export default {
  data() {
    return {
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

      tamanho_tendas: [
          ["3", "5"],
      ],
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
      sliderRules: [
          v => v <= 4 || "Bad"
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
      mySlider: 1 ,
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
    laterais_form() {
      this.mySlider = 4;
      let resposta = calcularLateraisConica(this.tenda);
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
        let resposta = calcularCoberturaConica(this.tenda);
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
            let resposta = calcularEstruturaConica(this.tenda);
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
    }
  }
}

</script>

