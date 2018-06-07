<template>
    <v-container fluid>
        <v-card >
            <v-card-title>
                <h2>Registar nova obra</h2>
            </v-card-title>
        <v-container grid-list-md class="text-xs-center" style="margin-bottom: 20px">
            <v-form v-model="formNovaObra" ref="formNovaObra">
                <v-layout row wrap align-center>
                    <v-flex  xs12 sm3 mr2>
                        <v-text-field
                            v-model="local"
                            label="Local"
                            :rules="form_base_rule"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm3 mr2>
                        <v-select
                            :items="clientes"
                            full-width="true"
                            v-model="novoCliente"
                            label="Cliente"
                            :rules="form_base_rule"
                            combobox
                            autocomplete
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm3 md4>
                        <v-menu
                            ref="dateModal"
                            :close-on-content-click="true"
                            v-model="dateModal"
                            :nudge-right="40"
                            :return-value.sync="date"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                        >
                            <v-text-field
                                slot="activator"
                                v-model="date"
                                label="Data"
                                prepend-icon="event"
                                :rules="form_base_rule"
                                readonly
                            ></v-text-field>
                            <v-date-picker v-model="date"></v-date-picker>
                        </v-menu>
                    </v-flex>
                    <v-flex xs12 sm2 class="text-xs-center">
                        <v-btn color="info" right @click.native="novaObraClick()">Adicionar Obra</v-btn>
                    </v-flex>
                </v-layout>
            </v-form>
        </v-container>
        </v-card>          
        <tabela 
            :listaDeObras="this.listaDeObras"
        />
        <mySnack
            :snackbar="this.mySnack"
            :text="this.mySnackText"
        />
   </v-container>
</template>


<script>
import tabela from "./tabela/tabela";
import mySnack from "./snackbar/mySnackbar";
import { getClientes, getObras, novaObra } from "@/utils/CRM/crm-events.js";
export default {
  components: { tabela, mySnack },
  data() {
    return {
      novoCliente: [],
      clientes: [],
      local: null,
      date: null,
      dateModal: false,
      formNovaObra: null,
      listaDeObras: [],
      form_base_rule: [v => !!v || "Introduzir Valor"],
      mySnack: false,
      mySnackText: ""
    };
  },
  methods: {
    listarClientes: function() {
      getClientes()
        .then(suc => {
          suc.data.forEach(element => {
            this.clientes.push(element.nome);
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    listarObras: function() {
      getObras()
        .then(suc => {
          suc.data.forEach(element => {
            this.listaDeObras.push({
              id: element.id,
              local: element.local,
              cliente: element.cliente,
              dia: element.date
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    novaObraClick: function() {
      if (this.$refs.formNovaObra.validate()) {
        //console.log(this.novoCliente);
        //console.log(this.local);
        //console.log(this.date);
        novaObra(this.local, this.novoCliente, this.date)
          .then(suc => {
            this.mySnackText = "Registo com sucesso";
            this.mySnack = true;
          })
          .catch(err => {
            console.log(err);
            this.mySnackText = "Erro no registo";
            this.mySnack = true;
          });
      }
    }
  },
  mounted() {
    this.listarObras();
    this.listarClientes();
  }
};
</script>
