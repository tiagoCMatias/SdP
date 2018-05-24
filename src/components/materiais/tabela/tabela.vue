<template>
  <v-card>
    <v-container fluid grid-list-lg>
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
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
    </v-container>
  </v-card>
</template>

<script>
  export default {    
    props: ['lista' ],
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
      }
    },
    watch: {
      lista: function(newVal, oldVal){
        this.loadinState = false;
      }
    },
  }
</script>