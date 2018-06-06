<template>
  <v-card>
    <v-container fluid grid-list-lg>
    <v-card-title>
      Obras
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
      :items="listaDeObras"
      :search="search"
      :loading="loadinState"
      :rows-per-page-items="rows"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-right">{{ props.item.local }}</td>
        <td class="text-xs-right">{{ props.item.cliente }}</td>
        <td class="text-xs-right">{{ props.item.dia }}</td>
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
    props: ['listaDeObras' ],
    data () {
      return {
        search: '',
        loadinState: true,
        rows: [15,25,{"text":"All","value":-1}],
        headers: [
          {
            text: 'Obras',
            align: 'left',
            sortable: true,
            value: 'id'
          },
          { text: 'Local', value: 'local' },
          { text: 'Cliente', value: 'cliente' },
          { text: 'Dia', value: 'date' },
        ],
      }
    },
    watch: {
      listaDeObras: function(newVal, oldVal){
        this.loadinState = false;
      }
    },
  }
</script>