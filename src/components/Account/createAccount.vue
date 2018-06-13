<template>
    <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn slot="activator" color="primary" dark>Criar novo utilizador</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Novo Utilizador</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 >
                <v-text-field label="Username" v-model="username" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email" v-model="email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" v-model="password" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                    :items="userLevel"
                    item-text="value"
                    item-value="id"
                    label="Acesso"
                    required
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*required</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Cancelar</v-btn>
          <v-btn color="primary" @click.native="dialog = false">Criar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      username: "",
      email: "",
      password: "",
      level: "",
      userLevel: [{ id: 2, value: "Normal" }, { id: 3, value: "Viewer" }]
    };
  },
  methods:{
    createAccount: function(){
      
    }
  }
};
</script>

