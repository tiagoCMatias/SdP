<template>
  <v-container class="text-sm-center" >
    <v-layout row wrap d-flex>
        <v-flex xs3 offset-xs1
            v-for="itens in menuItens" :key="itens.select_index">
        <v-btn large class="primary" router :to="itens.link">{{itens.title}}</v-btn>
        </v-flex>
    </v-layout>

    <!-- Dialog Cabeçalho -->
    <v-dialog v-model="cabecalho_dialog" max-width="500px">
            <v-card>
            <v-card-title>
                Preencher Cabeçalho
            </v-card-title>
            <v-form v-model="cabecalho_form" ref="cabecalho_form">
                    <v-layout row>
                    <v-flex>
                        <v-subheader>Local da Montagem</v-subheader>
                    </v-flex>
                    <v-flex offset-xs2 mr-5>
                        <v-text-field box 
                            v-model="local_montagem"
                            required></v-text-field>
                    </v-flex>
                </v-layout>
                    <v-layout row>
                        <v-flex xs3 offset-xs2>
                            <v-date-picker v-model="dia_evento" :reactive=true></v-date-picker>
                        </v-flex>
                    </v-layout> 
                <v-layout row xs3 offset-xs2>
                    <v-btn color="primary" flat @click.stop="cabecalho_dialog=false">Close</v-btn>
                </v-layout> 
            </v-form>         
        </v-card>
      </v-dialog>
  
  </v-container>
</template>


<script>
import { calcularTenda, calcularEstrutura, calcularCobertura, calcularLaterais, calcularIglo } from "../utils/tendas";

export default {
    data() {
        return {
            menuItens: [
                { icon: "", title: "Cónicas", link: "/conicas"},
                { icon: "", title: "2 Águas", link: "/aguas" },
                { icon: "", title: "Iglo", link: "/iglo"}
            ]
        };
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

  methods: {
    addRow: function() {
      console.log("a tentar");
      var elem = document.createElement("tr");
      this.rows.push({});
    },
    disableSlide: function() {
        if(this.tenda.lateral_opaco + this.tenda.lateral_transparante + this.tenda.lateral_blackout < 4)
            return true;
        else
            return false;
    },
    resto: function() {
        let tenda = 
            { 
                tipo: "iglo",
                largura: "10",
                comprimento: "15",
                altura_do_pe: "",
                fixacao: "Estrado",
                tipo_topo: "redondo",
                cobertura: "blackout",
                laterais: "",
                lateral_opaco: "",
                lateral_transparante: "",
                lateral_blackout: "",
                triangulo_opaco: "",
                triangulo_transparente: "",
                triangulo_blackout: "",
                triangulo: ""

            };
        
        console.log("Iglo" + calcularIglo(tenda))
    },
    removeRow: function() {
      this.rows.splice(-1, 1);
    },
    loadContent: function(index) {
      this.dialog_slider = true;
      this.index_tamanho = index;
      if(index == 0) this.tenda.tipo = "conica";
      if(index == 1) this.tenda.tipo = "2aguas";
      if(index == 2) this.tenda.tipo = "iglo";
    },
    clear() {
      this.$refs.form_tenda.reset();
    },
    submit_form() {
      if (this.$refs.form_tenda.validate()) {
        this.items = [];
        //console.log(this.quantidade_tendas);
        let resposta = calcularTenda(this.tenda, this.quantidade_tendas);
        let index = 0;
        resposta.forEach(element => {
          this.items.push({
            codigo: "1.1." + this.tenda.largura + "." + element.codigo,
            title: element.title,
            qt: element.qt
          });
        });
        this.table_dialog = true;
        //console.log(this.items);//this.cabecalho_dialog = true;

        //this.generatePDF();
      }
    },
    laterais_form() {
        if(this.tenda.tipo == "conica")
            this.mySlider = 5;
        else
            this.mySlider = 4;
        let resposta = calcularLaterais(this.tenda);
        console.log(resposta);

            resposta.forEach(element => {
                this.items.push({
                    codigo: "1.1." + this.tenda.largura + "." + element.codigo,
                    title: element.title,
                    qt: element.qt
                });
            });
        

    },
    cobertura_form(){
        this.mySlider = 3;
        let resposta = calcularCobertura(this.tenda);
        console.log(resposta);
            this.items.push({
            codigo: "",
            title: resposta.title,
            qt: resposta.qt
        });
    },
    estrutura_form() {
        if (this.$refs.form_estrutura.validate()) {
            this.items = [];
            this.mySlider = 2;
            let resposta = calcularEstrutura(this.tenda);
            console.log(resposta);
            resposta.forEach(element => {
            this.items.push({
                codigo: "1.1." + this.tenda.largura + "." + element.codigo,
                title: element.title,
                qt: element.qt
            });
            });
        }
    },
    editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.table_edit_dialog = true
    },

    deleteItem (item) {
        //this.snackbar = true;

        const index = this.items.indexOf(item)
        //this.snackbar_text = "Apagar Item?"
        confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
        //if(this.snackbar == false)
        //    this.items.splice(index, 1);
    },

    close () {
        this.table_edit_dialog = false
        setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
        }, 300)
    },

    save () {
        if (this.editedIndex > -1) {
            Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
            this.items.push(this.editedItem)
        }
        this.close()
    }
  }
};
</script>