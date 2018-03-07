
<template>
  <v-container class="text-sm-center" grid-list-xs>
      <v-layout row wrap>
        <v-flex fill-height>
          <v-flex fill-height>
            <v-btn large class="primary" router-link to='/estrado'>Calcular Estrado</v-btn>
          </v-flex>
          <v-flex fill-height>
            <v-btn large class="primary" router-link to='/tendas'>Calcular Tendas</v-btn>
          </v-flex>
          <v-flex fill-height v-for="itens in menuItens" :key="itens.title">
            <v-btn large class="primary" disabled="" router :to="itens.link">{{itens.title}}</v-btn>
          </v-flex>
        </v-flex>
      </v-layout>
  </v-container>
</template>


<script>
export default {
  data() {
      return {
        menuItens: [
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
