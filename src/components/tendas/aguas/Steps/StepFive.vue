<template>
    <v-layout row wrap>
        <v-container grid-list-md>
            <v-layout row wrap class="text-xs-center">
                <v-flex xs12 sm2 mx-3>
                    <v-btn color="primary" dark @click.native="editTable = true">New Item</v-btn>
                </v-flex>
                <v-flex xs12 sm6 mx-2>
                    <v-text-field
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                        v-model="search"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm2 mx-1 >
                    <v-btn color="primary" dark @click.native="pdfForm = true" class="mb-2">PDF</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
        <v-dialog v-model="editTable" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Novo</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                            <v-text-field label="Nome" v-model="editedItem.title"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field label="Quantidade" v-model="editedItem.qt"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field label="Codigo" v-model="editedItem.codigo"></v-text-field>
                        </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="close_table_dialog()">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="save_table_dialog()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-data-table
            v-bind:headers="header"
            :items="items"
            hide-actions
            :search="search"
            class="elevation-1"
            >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.title }}</td>
                <td class="text-xs-right">{{ props.item.qt }}</td>
                <!--<td class="text-xs-right">{{ props.item.codigo }}</td>-->
                <td class="justify-center layout px-0">
                <v-btn icon class="mx-0" @click="editItem(props.item)">
                    <v-icon color="primary">edit</v-icon>
                </v-btn>
                <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                    <v-icon color="red">delete</v-icon>
                </v-btn>
                </td>
            </template>
        </v-data-table>
        <v-btn color="primary" @click.native="complete()">Continue</v-btn>

        <v-dialog v-model="pdfForm" max-width="500px">
            <v-card>
                <v-card-title>
                    Preencher Cabeçalho
                </v-card-title>   

                <v-form v-model="addInfo" ref="addInfo">
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
                            v-model="dataEvento"
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
                                <v-btn color="primary"  @click="dataEvento = false">Cancel</v-btn>
                                <v-btn color="primary" class="text-xs-right" @click="dataEvento = false">OK</v-btn>
                            
                            </v-card>
                        </v-dialog>
                        </v-flex>
                    </v-layout>
                    <v-flex xs12 class="text-xs-right">
                        <v-btn @click="pdfForm = false">Cancelar</v-btn>
                        <v-btn class="primary" @click="generatePDF()">Ok</v-btn>
                    </v-flex>
                </v-form> 
            </v-card>
        </v-dialog>
    </v-layout>
</template>


<script>
import jsPDF from 'jspdf'
require('jspdf-autotable');
  export default {
    props: ['items' , 'estrutura' ],
    data() {
      return {
        search: '',
        dataEvento: false,
        editTable: false,
        addInfo: false,
        pdfForm: false,
        editedIndex: -1,
        date: null,
        localMontagem: null,
        editedItem: {
            title: '',
            qt: 0,
        },
        defaultItem: {
            title: '',
            qt: 0,
        },
        header: [
            {
                text: "Material",
                align: "left",
                sortable: false,
                value: "title"
            },
            { text: "Qt", value: "qt" }
        ],
        form_base_rule: [
          v => !!v || "Introduzir Valor"
        ],
      }
    },
    methods: {      
        complete()
        {
            this.$emit('formComplete', this.bacalhau);
        },
        editItem (item) {
            this.editedIndex = this.items.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.editTable = true
        },
        deleteItem (item) {
            const index = this.items.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
        },
        close_table_dialog () {
            this.editTable = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
        },

        save_table_dialog () {
            if (this.editedIndex > -1) {
                Object.assign(this.items[this.editedIndex], this.editedItem)
            } else {
                this.items.push(this.editedItem)
            }
            this.close_table_dialog()
        },
        generatePDF() {
            if(this.$refs.addInfo.validate())
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
                
                doc.text(100, 120, "Dimensões - "+ this.estrutura.largura + "x"+ this.estrutura.comprimento );
                    
                if(this.estrutura.tipo_topo_1 != this.estrutura.tipo_topo_2)
                {
                    doc.text(100, 140, "Topo - "+ this.estrutura.tipo_topo_1 + " e "+this.estrutura.tipo_topo_2 );
                }
                else
                {
                    doc.text(100, 140, "Topo - "+ this.estrutura.tipo_topo_1 );
                }
                doc.text(100, 160, "Local: "+ this.local_montagem);
                doc.autoTable(columns, rows, { startY: 200});
                doc.save(currentDate + " - " + this.estrutura.largura +"x"+this.estrutura.comprimento);
            }
        },
    }
  }
</script>
