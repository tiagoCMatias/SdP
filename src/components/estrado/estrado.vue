<template>
  <v-container>
    <v-layout row>
      
        <v-flex xs12 sm6 offset-sm3>
          <div class="body-2 text-sm-center">Estrado</div>
        </v-flex>
        
    </v-layout>
    <v-form v-model="valid" ref="form" lazy-validation>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
              <v-text-field box 
              label="Largura" 
              v-model="largura"
              :rules="larguraRules"
              required></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
          <v-text-field box 
              label="Comprimento" 
              v-model="comprimento"
              :rules="comprimentoRules"
              required></v-text-field>
            </v-flex>
        </v-layout>  
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3 class="text-xs-right" >
            <v-checkbox
              :label="'Gerar PDF'"
              v-model="pdf_checkbox"
            ></v-checkbox>
            <v-btn class="primary"
            @click.stop="loadIt"
            >Calcular</v-btn>
            <v-btn @click="clear">Limpar</v-btn></v-flex>
        </v-layout>
      </v-form>
      <v-dialog v-model="dialog" max-width="330">
      <v-card align-center >
        <v-data-table
          v-bind:headers="header"
          :items="items"
          hide-actions
          class="elevation-1"
        >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.quantidade }}</td>
        </template>
      </v-data-table>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  <!-- Cabeçalho -->
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
  </v-container>
</template>


<script>
import { getEstrado } from '../../utils/configuration-manager'
import { calcEstrado,  getBase64Image} from '../../utils/helper'
import jsPDF from 'jspdf'
require('jspdf-autotable');

export default {
  data(){
      return {
        pdf_checkbox: false,
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
        valid: true,
        largura: '',
        comprimento: '',

        form_base_rule: [
          v => !!v || "Introduzir Valor"
        ],

        larguraRules: [
          (v) => (!!v || 'Introduzir Largura'),
          (v) => (v >= 1 && v%1.25 === 0 || 'Largura (multiplo 1.25)')
        ],
        comprimentoRules: [
          (v) => (!!v || 'Introduzir Comprimento'),
          (v) => (v >= 1 && v%1.25 === 0 || 'Comprimento (multiplo 1.25)')
        ],
      }
  },

    watch: {
        pdf_checkbox: function (val) {
          this.adicionar_info_dialog = val;
        }
    },

  methods: {
    loadIt() {
      if (this.$refs.form.validate()) {   
          //console.log(this.largura + " - " + this.comprimento);
          calcEstrado(this.largura, this.comprimento).then((resposta) => {
          console.log(resposta);
          
          this.dialog = true;
          this.items[0].quantidade = resposta.taipal;
          this.items[1].quantidade = resposta.b25_total;
          this.items[2].quantidade = resposta.b125;
          this.items[3].quantidade = resposta.pontoApoio;
          this.items[4].quantidade = resposta.pontoApoio;
          this.items[5].quantidade = resposta.pontoApoio;

          console.log(this.items);
          if(this.pdf_checkbox == true)
            this.generatePDF();
          
        });
      }
    },

    info_complet() {
      if(this.$refs.info_form.validate())
      {
        this.adicionar_info_dialog = false;        
      }
    },
    
    clear () {
      this.$refs.form.reset()
    },

    revealDialog() {
      if(this.pdf_checkbox == true)
      {
        this.adicionar_info_dialog = true;
        this.local_montagem = null;
        this.data_evento = null;
        console.log("checked");
      }
      
    },

    generatePDF() {
      if(this.$refs.info_form.validate())
      {
          let columns = [];
          this.header.forEach(element => {
            columns.push(element.text);
          });

          let rows = [];
          this.items.forEach(element => {
            rows.push([ element.name, element.quantidade  ]);
          });
          var doc = new jsPDF('p', 'pt');
          
          doc.autoTable(columns, rows, { startY: 200});
          var currentDate = new Date();
          doc.setFontSize(24);
          doc.text(250, 40, "Estrados");
          
          
         //doc.addImage(imgData, 'JPEG', 350, 20, 180, 160);
          doc.setFontSize(14);
          doc.text(100, 80, "Data: "+ this.date);
          doc.text(100, 120, "Dimensões - "+ this.largura + "x"+this.comprimento);

          doc.text(100, 140, "Local: "+this.local_montagem);
          doc.save(currentDate + " - " + this.largura +"x"+this.comprimento);
      }
    },
    formatDate(date) {
      var year = date.getFullYear(),
      month = date.getMonth() + 1, // months are zero indexed
      day = date.getDate(),
      hour = date.getHours(),
      minute = date.getMinutes(),
      second = date.getSeconds(),
      minuteFormatted = minute < 10 ? "0" + minute : minute

      return month + "/" + day + "/" + year + " " + hour + ":" + minuteFormatted;
    },
    imageToBase64(img){
      var canvas, ctx, dataURL, base64;
      canvas = document.createElement("canvas");
      ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      dataURL = canvas.toDataURL("image/png");
      base64 = dataURL.replace(/^data:image\/png;base64,/, "");
      return base64;
    }
  }
}
</script>


