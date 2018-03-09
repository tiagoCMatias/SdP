<template>
  <v-container fluid class="text-sm-center" >
    <v-layout row wrap>
        <v-flex xs12 sm4
            v-for="itens in menuItens" :key="itens.select_index">
            <v-btn large class="primary" router :to="itens.link">{{itens.title}}</v-btn>
        </v-flex>
    </v-layout>
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

  methods: {
    
  }
};
</script>