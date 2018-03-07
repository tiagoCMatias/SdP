<template>
  <v-layout row justify-center>
    <v-btn color="primary" dark @click.native.stop="dialog = true">Open Dialog</v-btn>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-text class="text-xs-center">Tem a certeza que deseja sair?</v-card-text>
        <v-card-actions> 
          <v-spacer></v-spacer>
          <v-btn class="text-xs-center" color="primary" @click="confirmar">Confirmar</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="text-xs-center" color="primary" @click="cancelar">Cancelar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false
      }
    },
    methods: {
        confirmar(){

        },
        cancelar(){

        }
    }
  }
</script>