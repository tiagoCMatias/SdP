<template>
    <v-container fill-height>
        <v-layout row wrap align-center>
          <v-flex class="text-xs-center">
            <v-alert class="text-xs-center" outline color="error" icon="priority_high" :value="true">
                Tem a certeza que deseja sair? 
            </v-alert>   
            <div>   
             <v-spacer></v-spacer>
                <v-btn color="primary" @click="confirmar">Confirmar</v-btn>
                <v-btn color="primary" @click="cancelar">Cancelar</v-btn>
             <v-spacer></v-spacer>  
            </div>    
          </v-flex>
        </v-layout>
    </v-container> 
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
            this.$store.commit({ 
                type: 'logout'
            });
            this.$router.push('/');
        },
        cancelar(){
            this.$router.go(-1)
        }
    }
  }
</script>