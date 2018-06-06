<template>
  <v-dialog v-model="adicionar_info_dialog" max-width="500px">
      <v-card>
        <v-card-title>
            Preencher Cabeçalho
        </v-card-title>   

        <v-form v-model="info_form" ref="info_form">
          <v-layout row wrap>
            <v-flex xs12 mx-4>
              <v-text-field
              label="Local de Montagem"
              v-model="local_montagem"
              :rules="form_base_rule"
              >
              </v-text-field>
            </v-flex>
            <v-flex xs12 mx-4>
              <v-dialog
                persistent
                v-model="data_evento_dialog"
                lazy
                full-width
                width="290px"
                :return-value.sync="date"
              >
                <v-text-field
                  slot="activator"
                  label="Data de Evento"
                  v-model="date"
                  prepend-icon="event"
                  :rules="form_base_rule"
                  readonly
                ></v-text-field>
                <v-card class="text-xs-right">
                  <v-date-picker v-model="date" scrollable></v-date-picker>
                    <v-spacer></v-spacer>
                    <v-btn color="primary"  @click="data_evento_dialog = false">Cancel</v-btn>
                    <v-btn color="primary" class="text-xs-right" @click="data_evento_dialog = false">OK</v-btn>
                  
                </v-card>
              </v-dialog>
            </v-flex>
          </v-layout>
          <v-flex xs12 class="text-xs-right">
            <v-btn @click="pdf_checkbox = false;">Cancelar</v-btn>
            <v-btn class="primary" @click="info_complet()">Ok</v-btn>
          </v-flex>
        </v-form> 
      </v-card>
    </v-dialog>
</template>


<script>
export default {
  data(){
      return{
            local_montagem: '',
            adicionar_info_dialog: false,
            info_form: false,
            data_evento: null,
            data_evento_dialog: false,
            date: null,
            header: [
            {
                text: 'Material',
                align: 'left',
                sortable: false,
                value: 'name'
            },
            { text: 'Quantidade', value: 'Quantidade' }
            ],
            items: [
            {
                name: "Madeira",
                quantidade : 0
            },
            {
                name: "Barras 2.5",
                quantidade : 0
            },
            {
                name: "Barras 1.25",
                quantidade : 0
            },
            {
                name: "Pé",
                quantidade : 0
            },
            {
                name: "Chapa Base",
                quantidade : 0
            },
            {
                name: "Chaveta Normal",
                quantidade : 0
            }
            ],

            dialog: false,
      }
  }
}
</script>

