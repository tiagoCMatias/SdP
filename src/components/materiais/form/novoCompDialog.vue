<template>
  <v-layout row justify-center>
    <v-form v-model="formNovoComponente" ref="formNovoComponente">
    <v-dialog v-model="openDialog" persistent max-width="500px">
      <v-btn slot="activator" color="primary" dark>Novo Componente</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Criar Novo Componente</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 >
                <v-text-field
                    v-model="tag"
                    label="Tag"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 >
                <v-text-field
                    v-model="quantidade"
                    label="Quantidade"
                    type="number"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                    v-model="componente"
                    label="Nome de Componente"
                    :rules="form_base_rule"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                    v-model="descricao"
                    label="Descrição"
                    :rules="form_base_rule"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                    :items="listaFamilia"
                    full-width="true"
                    v-model="familia"
                    item-text="nome"
                    item-value="id"
                    label="Familia"
                    :rules="form_base_rule"
                    autocomplete
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                    :items="listaTendas"
                    full-width="true"
                    v-model="tendas"
                    item-text="tag"
                    item-value="id"
                    label="Tendas"
                    :rules="form_base_rule"
                    autocomplete
                    multiple
                    chips
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*Required</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="openDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="submitForm()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-form>
  </v-layout>
</template>

<script>

import {createNovoComponente}  from "../../../utils/lista/lista-events";


export default {
    props: ['listaFamilia', 'listaTendas' ],
    data() {
        return{
            openDialog: false,
            formNovoComponente: null,
            tendas: [],
            familia: null,
            componente: null,
            quantidade: null,
            tag: null,
            descricao: null,
            form_base_rule: [
                v => !!v || "Introduzir Valor"
            ],
        }
    },
    methods:{
        submitForm: function(){
          if(this.$refs.formNovoComponente.validate()){
            createNovoComponente(this.componente, this.tag, this.descricao, this.quantidade, this.familia, this.tendas)
              .then(suc =>{
                console.log(suc);
                this.$emit('formComplete');
                this.openDialog = false;
              })
              .catch(err => {
                console.log(err);
              });
          }
        }
    }
}
</script>
