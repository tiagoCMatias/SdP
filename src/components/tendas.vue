<template>
  <v-container class="text-sm-center" >
    <v-layout row wrap d-flex>
        <v-flex xs3 offset-xs1
            v-for="itens in menuItens" :key="itens.select_index">
        <v-btn large class="primary" router :to="itens.link">{{itens.title}}</v-btn>
        </v-flex>
    </v-layout>

    <!-- Dialog Cabeçalho
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
  
   -->
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
    
    clear() {
      this.$refs.form_tenda.reset();
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