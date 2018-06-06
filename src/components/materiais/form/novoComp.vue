<template>
    <v-form v-model="formNovoComponente" ref="formNovoComponente">
        <v-layout row wrap align-center>
            <v-flex  xs12 sm4 class="text-xs-center lowMargin">
                <v-text-field
                    v-model="componente"
                    label="Nome de Componente"
                    :rules="form_base_rule"
                ></v-text-field>
            </v-flex>
            <v-flex  xs12 sm4 class="lowMargin">
                <v-text-field
                    v-model="descricao"
                    label="Descrição"
                    :rules="form_base_rule"
                ></v-text-field>
            </v-flex>
            <v-flex  xs12 sm4 class="lowMargin">
                <v-text-field
                    v-model="tag"
                    label="Tag"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm4 class="lowMargin">
                <v-select
                    :items="listaTendas"
                    full-width="true"
                    v-model="familia"
                    item-text="tag"
                    item-value="id"
                    label="Tendas"
                    :rules="form_base_rule"
                    autocomplete
                    multiple
                    chips
                    
                ></v-select>
            </v-flex>
            <v-flex xs12 sm4 class="lowMargin">
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
            <v-flex xs12 sm4 class="lowMargin">
                <v-text-field
                    v-model="quantidade"
                    label="Quantidade"
                    type="number"
                ></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row wrap align-center>
            <v-flex xs12 sm4 class="text-xs-center">
                <v-btn color="info" right @click.native="novoComponente()">Novo Componente</v-btn>
            </v-flex>
        </v-layout>
    </v-form>
</template>


<script>
export default {
    props: ['listaFamilia', 'listaTendas' ],
    data(){
        return{
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
    methods: {
        novoComponente: function(){
            console.log("emit");
        }
    }
}
</script>


<style <style scoped>

.lowMargin{
    margin: 15px;
}

</style>

