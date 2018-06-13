<template>
    <v-container class="text-xs-center">
        <v-flex xs12 v-if="auth">
           <CreateAccount/>
        </v-flex>
        <v-flex xs12 >
           <h1>{{this.$store.getters.getAccountName}}</h1>
        </v-flex>
        <v-flex xs12 >
           <h1>{{this.$store.getters.getUserLevel}}</h1>
        </v-flex>
    </v-container>
</template>


<script>
import CreateAccount from "./createAccount";
export default {
  components: { CreateAccount },
  data() {
    return {};
  },
  computed: {
    auth: function() {
      return this.$store.getters.isAdmin;
    }
  }
};
</script>
