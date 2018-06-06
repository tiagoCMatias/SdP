<template>
    <v-dialog v-model="dialogPDF" max-width="500px">
        <v-card>
            <v-card-title>
                Preencher Cabeçalho
            </v-card-title>   

            <v-form v-model="pdfForm" ref="pdfForm">
            <v-layout row wrap>
                <v-flex xs12 mx-4>
                <v-text-field
                label="Local de Montagem"
                v-model="localMontagem"
                :rules="form_base_rule"
                >
                </v-text-field>
                </v-flex>
                <v-flex xs12 mx-4>
                <v-dialog
                    persistent
                    v-model="dataEventoDialog"
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
                        <v-btn color="primary"  @click="dataEventoDialog = false">Cancel</v-btn>
                        <v-btn color="primary" class="text-xs-right" @click="dataEventoDialog = false">OK</v-btn>
                    </v-card>
                </v-dialog>
                </v-flex>
            </v-layout>
            <v-flex xs12 class="text-xs-right">
                <v-btn @click="dialogPDF = false">Cancelar</v-btn>
                <v-btn class="primary" @click="generatePDF()">Ok</v-btn>
            </v-flex>
            </v-form> 
        </v-card>
    </v-dialog>
</template>


<script>
import jsPDF from 'jspdf'
require('jspdf-autotable');
export default {
    props: ['dialogPDF', 'header', 'items' ],
    data(){
        return{
            //dialogPDF: false,
            pdfForm: false,
            localMontagem: null,
            dataEventoDialog: null,
            date: null,
        }
    },
    methods:{
        generatePDF: function() {
            if(this.$refs.pdfForm.validate())
            {
                let columns = [];
                this.header.forEach(element => {
                    columns.push(element.text);
                });
                let rows = [];
                this.items.forEach(element => {
                    rows.push([ element.title, element.qt  ]);
                });
                var doc = new jsPDF('p', 'pt');
                var currentDate = new Date();
                doc.setFontSize(24);
                doc.text(250, 40, "Tenda Iglo");
                //doc.addImage(imgData, 'JPEG', 350, 20, 180, 160);
                doc.setFontSize(14);
                doc.text(100, 80, "Data: "+ this.date);
                
                doc.text(100, 120, "Dimensões - "+ this.tenda.largura + "x"+this.tenda.comprimento );
                    
                if(this.tenda.tipo_topo_1 != this.tenda.tipo_topo_2)
                {
                    doc.text(100, 140, "Topo - "+ this.tenda.tipo_topo_1 + " e "+this.tenda.tipo_topo_2 );
                }
                else
                {
                    doc.text(100, 140, "Topo - "+ this.tenda.tipo_topo_1 );
                }
                doc.text(100, 160, "Local: "+this.local_montagem);
                doc.autoTable(columns, rows, { startY: 200});
                doc.save(currentDate + " - " + this.largura +"x"+this.comprimento);
            }
        }
    }
}
</script>

