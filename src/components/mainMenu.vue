<template>
  <v-container class="text-sm-center">
      <v-layout row wrap>
          <v-flex xs12 sm6 offset-sm3 
          v-for="itens in menuItens" :key="itens.title">
            <v-btn large class="primary" router :to="itens.link">{{itens.title}}</v-btn>
          </v-flex>
      </v-layout>
  </v-container>
</template>


<script>
export default {
  data() {
      return {
        menuItens: [
            { icon: '', title: 'Calcular Estrado', link: '/estrado' },
            { icon: '', title: 'Calcular Tendas', link: '/configurar' },
            { icon: '', title: 'Obras', link: '/adicionar' },
            { icon: '', title: 'Serralharia', link: '/adicionar' },
            { icon: '', title: 'Gestão de Stock', link: '/stock' }
        ]
      }
  }
}
</script>



<style scoped>

.btn--large {
    width: 200px;
    margin: 20 20 20 20;
}

</style>
