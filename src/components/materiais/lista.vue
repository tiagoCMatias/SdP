<template>
    <v-container >
        <NovoDialog 
            :listaFamilia="this.listaFamilia"
            :listaTendas="this.listaTendas"
            @formComplete="updateView"
        />
        <v-spacer></v-spacer><v-spacer></v-spacer>
        <Tabela 
            :style="{ 'margin-top': '30px' }"
            :lista="this.tabelaItens"
        />
        <mySnack
            :snackbar="this.mySnack"
            :text="this.mySnackText"
        />
    </v-container>
</template>

<script>
import Tabela from "./tabela/tabela";
import NovoCompForm from "./form/novoComp";
import NovoDialog from "./form/novoCompDialog";
import mySnack from "../CRM/snackbar/mySnackbar"

import {getFamilia, getConfigTendas, getListaComponentes}  from "../../utils/lista/lista-events";

const filterValue = (obj, key, value) => obj.find(v => v[key] === value);

export default {
    components: {Tabela, NovoCompForm, NovoDialog, mySnack},
    data(){
        return{
            tabelaItens: [],
            listaFamilia: [],
            listaTendas:[],
            mySnack: false,
            mySnackText: "",
        }
    },
    methods: {
        listarFamilia: function(){
            getFamilia()
                .then(suc => {
                    //console.log(suc);
                    suc.data.forEach(element => {
                        this.listaFamilia.push( { id:element.id, nome:element.nome  } );
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },

        obterTendas: function(){
            getConfigTendas()
                .then(suc =>{
                    suc.data.forEach(element => {
                        this.listaTendas.push( { id:element.id, tag:element.tag, descricao: element.descricao, tipo:element.tipo  } );
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },

        createTableContent: function() {
            getListaComponentes()
                .then(component =>{
                    component.data.forEach(myComponent => {
                        let tagTenda = "";
                        myComponent.pertence.forEach(element => {
                            tagTenda += "[" + this.listaTendas.find(v => v['id'] === element.tenda.id).tag + "] ";
                        });
                        this.tabelaItens.push({
                            id: myComponent.id, 
                            nome: myComponent.nome,
                            descricao: myComponent.descricao,
                            genCodigo: myComponent.genCodigo,
                            familia: this.listaFamilia.find(v => v['id'] === myComponent.familia).nome,
                            tendas: tagTenda,
                            quantidade: myComponent.quantidade
                        });
                    });
                    //console.log(this.tabelaItens)
                })
                .catch(err => {
                    console.log(err);
                });
        },

        updateView: function(){
            this.mySnackText = "Registo com sucesso"
            this.mySnack = true;
            this.tabelaItens = [];
            this.createTableContent();  
        },
    },
    mounted(){
        this.listarFamilia();
        this.obterTendas();
        this.createTableContent();  
    }
}
</script>

