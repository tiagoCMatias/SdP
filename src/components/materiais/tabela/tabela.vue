<template>
  <v-card>
    <v-container fluid grid-list-lg>
      <editComponentDialog 
        :editComponentDialog="this.editComponentDialog"
        :editItem="this.myEditedItem"
        :listaFamilia="this.$props.listaFamilia"
        :listaTendas="this.$props.listaTendas"
        @editComplete="editForm"
        />
    <v-card-title>
      Materiais
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="lista"
      :search="search"
      :loading="loadinState"
      :rows-per-page-items="rows"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.nome }}</td>
        <td class="text-xs-right">{{ props.item.descricao }}</td>
        <td class="text-xs-right">{{ props.item.tendas }}</td>
        <td class="text-xs-right">{{ props.item.familia }}</td>
        <td class="text-xs-right">{{ props.item.genCodigo }}</td>
        <td class="text-xs-right">{{ props.item.quantidade }}</td>
        <v-btn icon class="mx-0" @click="editItem(props.item)">
          <v-icon color="primary">edit</v-icon>
        </v-btn>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
    </v-container>
  </v-card>
</template>

<script>
  import editComponentDialog from "./editComponentDialog";
  import {updateComponente} from "../../../utils/lista/lista-events";
  export default {    
    props: ['lista', 'listaFamilia', 'listaTendas'],
    components: { editComponentDialog },
    data () {
      return {
        search: '',
        loadinState: true,
        rows: [15,25,{"text":"All","value":-1}],
        headers: [
          {
            text: 'Materiais',
            align: 'left',
            sortable: true,
            value: 'nome'
          },
          { text: 'Descricao', value: 'descricao' },
          { text: 'Tendas', value: 'tendas' },
          { text: 'Familia', value: 'familia' },
          { text: 'Código Interno', value: 'genCodigo' },
          { text: 'Quantidade', value: 'quantidade' },
        ],
        editItemIndex: -1,
        myEditedItem: {
          descricao: '',
          tendas: [],
          genCodigo: 0,
          quantidade: 0,
          nome: ''
        },
        editComponentDialog: false,
      }
    },

    methods: {
      editItem: function (item) {
        this.editItemIndex = this.lista.indexOf(item)
        this.myEditedItem = Object.assign({}, item)
        this.editComponentDialog = true
      },
      editForm: function(value) {
        this.editComponentDialog = false;
        console.log(value);
        if(value !== null){
          updateComponente(
            value.nome, value.descricao, value.quantidade, value.familia, value.id)
            .then(suc => {
              this.$emit('updateTable', true); 
            })
            .catch(err => {
              this.$emit('updateTable', false); 
            })
        }
      }
    },

    watch: {
      lista: function(newVal, oldVal){
        this.loadinState = false;
      }
    },
  }
</script>