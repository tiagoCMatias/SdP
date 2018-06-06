<template>
    <v-dialog v-model="editComponentDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ titulo }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form v-model="formEditComponente" ref="formEditComponente">
            <v-layout wrap>
              <v-flex xs12 sm12>
                <v-text-field v-model="editItem.nome" label="Nome"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12>
                <v-text-field v-model="editItem.descricao" label="Descricao"></v-text-field>
              </v-flex>
              <v-flex xs12 sm3>
                <v-text-field v-model="editItem.quantidade" type="number" label="Quantidade"></v-text-field>
              </v-flex>
              <v-flex xs12 sm9>
                <v-select
                    :items="listaFamilia"
                    full-width="true"
                    v-model="editItem.familia"
                    item-text="nome"
                    item-value="id"
                    label="Familia"
                    :rules="form_base_rule"
                    autocomplete
                    combobox
                ></v-select>
              </v-flex>
              <!-- <v-flex xs12 sm6>
                <v-select
                    :items="listaTendas"
                    full-width="true"
                    v-model="editItem.tendas"
                    item-text="tag"
                    item-value="id"
                    label="Tendas"
                    :rules="form_base_rule"
                    autocomplete
                    multiple
                    chips
                ></v-select>
              </v-flex> -->
            </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="closeDialog()">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="saveDialog()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>


<script>
import {updateComponente} from "../../../utils/lista/lista-events";
import {getIndexFamilia} from "../../../utils/general";
export default {
    props: ['editComponentDialog', 'editItem', 'listaFamilia', 'listaTendas' ],
    data() {
        return {
            formEditComponente: false,
            titulo: 'Editar Componente',
            form_base_rule: [
                v => !!v || "Introduzir Valor"
            ],
        }
    },
    methods: {
      closeDialog: function() {
        this.$emit('editComplete', null);
      },
      saveDialog: function() {
        if(this.$refs.formEditComponente.validate()){
          this.$props.editItem.familia = getIndexFamilia(this.$props.listaFamilia, this.$props.editItem.familia);
          this.$emit('editComplete', this.$props.editItem);          
        }
      }
    }
}
</script>
