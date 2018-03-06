
<template v-if="userStore.state=='loged'">
  <v-container class="text-sm-center" grid-list-xs>
      <v-layout row wrap>
          <v-flex xs10 offset-xs2 >
            <v-btn large class="primary" router-link to='/estrado'>Calcular Estrado</v-btn>
          </v-flex>
          <v-flex xs10 offset-xs2 >
            <v-btn large class="primary" router-link to='/tendas'>Calcular Tendas</v-btn>
          </v-flex>
          <v-flex xs10 offset-xs2
          v-for="itens in menuItens" :key="itens.title">
            <v-btn large class="primary" disabled="" router :to="itens.link">{{itens.title}}</v-btn>
          </v-flex>
           {{userStore}}
      </v-layout>
  </v-container>
</template>


<script>
import {mapState} from 'vuex'
export default {

    computed: {
    ...mapState({
      userStore: state => state.userStore
       })
    },

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
