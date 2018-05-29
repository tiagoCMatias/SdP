<template>
  <v-container class="text-xs-center" grid-list-xs>
      <v-layout row wrap>
          <v-flex xs12 sm12
            v-for="itens in menuItens" :key="itens.title">
            <v-btn large class="primary" :disabled="itens.status" router :to="itens.link">{{itens.title}}</v-btn>
          </v-flex>
      </v-layout>
  </v-container>
</template>


<script>
export default {
  data() {
      return {
        menuItens: [
            { icon: '', title: 'Calcular Estrado', link: '/estrado', status: false },
            { icon: '', title: 'Calcular Tendas', link: '/tendas', status: false },
            { icon: '', title: 'CRM', link: '/crm', status: false },
            { icon: '', title: 'Stock', link: '/lista', status: false },
            { icon: '', title: 'Serralharia', link: '/adicionar', status: true },
            { icon: '', title: 'Gestão de Stock', link: '/stock', status:true }
        ]
      }
  },
}
</script>



<style scoped>

.btn--large {
    width: 200px;
    margin: 20 20 20 20;
}

</style>
