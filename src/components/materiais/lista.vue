<template>
    <v-container fluid>
        <v-card>
            <v-card-title>
                Lista de Materiais
            </v-card-title>
            <v-container grid-list-sm class="text-xs-center" style="margin-bottom: 20px">
                <v-form v-model="formNovoComponente" ref="formNovoComponente">
                    <v-layout row wrap align-center>
                        <v-flex  xs12 sm2 class="text-xs-center">
                            <v-text-field
                                v-model="componente"
                                label="Nome de Componente"
                                :rules="form_base_rule"
                            ></v-text-field>
                        </v-flex>
                        <v-flex  xs12 sm2 >
                            <v-text-field
                                v-model="descricao"
                                label="Descrição"
                                :rules="form_base_rule"
                            ></v-text-field>
                        </v-flex>
                        <v-flex  xs12 sm2 >
                            <v-text-field
                                v-model="tag"
                                label="Tag"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm2 >
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
                        <v-flex  xs12 sm2 >
                            <v-text-field
                                v-model="quantidade"
                                label="Quantidade"
                                type="number"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm2 class="text-xs-center">
                            <v-btn color="info" right @click.native="novoComponente()">Novo Componente</v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-container>
            
        </v-card>
    </v-container>
</template>

<script>
import Tabela from "./tabela/tabela";
import {getFamilia}  from "../../utils/lista/lista-events";
export default {
    components: {Tabela},
    data(){
        return{
            formNovoComponente: null,
            tabelaItens: [],
            listaFamilia: [],
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
    methods: {
        novoComponente: function(){

        },

        listarFamilia: function(){
            getFamilia()
                .then(suc => {
                    console.log(suc);
                    suc.data.forEach(element => {
                        this.listaFamilia.push( { id:element.id, nome:element.nome  } );
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted(){
        this.listarFamilia();
    }
}
</script>

