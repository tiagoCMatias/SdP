<template>
  <v-form v-model="formBacalhau" ref="formBacalhau" mx-3>
    <v-layout row wrap>
        <v-flex xs12 text-xs-center>
            <v-subheader class="display-2" >Bacalhau - {{ maxBacalhau }}</v-subheader>
        </v-flex>
        <v-flex xs6 sm9>
            <v-text-field label="Opaco" :rules="rulesLaterais" readonly v-model="bacalhau.opaco" type="number"></v-text-field>
        </v-flex>
        <v-flex xs3 sm1 text-xs-right>
            <v-btn @click.native="bacalhau.opaco = bacalhau.opaco+1" color="dark" fab small>
                <v-icon >add</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs3 sm1 text-xs-right>
            <v-btn @click.native="bacalhau.opaco > 0 ? bacalhau.opaco-- : bacalhau.opaco = 0" color="dark" fab small>
                <v-icon >remove</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs6 sm9>
            <v-text-field label="Transparente" readonly :rules="rulesLaterais" v-model="bacalhau.transparente" type="number"></v-text-field>
        </v-flex>
        <v-flex xs3 sm1 text-xs-right>
            <v-btn @click.native="bacalhau.transparente = bacalhau.transparente+1" color="dark" fab small >
                <v-icon >add</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs3 sm1 text-xs-right>
            <v-btn @click.native="bacalhau.transparente > 0 ? bacalhau.transparente-- : bacalhau.transparente = 0" color="dark" fab small >
                <v-icon >remove</v-icon>
            </v-btn>
        </v-flex>

        <v-flex xs6 sm9>
            <v-text-field label="Blackout" readonly :rules="rulesLaterais" v-model="bacalhau.blackout" type="number"></v-text-field>
        </v-flex>
        <v-flex xs3 sm1 text-xs-right>
            <v-btn @click.native="bacalhau.blackout = bacalhau.blackout+1" color="dark" fab small >
                <v-icon >add</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs3 sm1 text-xs-right>
            <v-btn @click.native="bacalhau.blackout > 0 ? bacalhau.blackout-- : bacalhau.blackout = 0" color="dark" fab small >
                <v-icon >remove</v-icon>
            </v-btn>
        </v-flex>
    </v-layout>
    <v-layout row wrap v-if="topo1 == 'Direito' || topo2 == 'Direito'">
        <v-flex xs3 hidden-xs-only>
            <v-subheader>Triangulo</v-subheader>
        </v-flex>
        <v-flex mr-2 v-if="topo1 === 'Direito'">
            <v-select
            :items="tipo_de_telas"
            v-model="bacalhau.triangulo1"
            :rules="form_base_rule"
            label="Triangulo Topo"
            class="input-group"
            item-value="text"
            required
            ></v-select>
        </v-flex>
        <v-flex mr-2 v-if="topo2 === 'Direito'">
            <v-select
            :items="tipo_de_telas"
            v-model="bacalhau.triangulo2"
            :rules="form_base_rule"
            label="Triangulo Topo"
            class="input-group"
            item-value="text"
            required
            ></v-select>
        </v-flex>
    </v-layout>
    <v-btn color="primary" @click.native="sendBacalhaus()">Continue</v-btn>
    </v-form>
</template>


<script>
  export default {
    props: ['maxBacalhau', 'topo1', 'topo2', 'mostrarEspecial'],
    data() {
      return {
        formBacalhau: null,
        bacalhau: {
          opaco: 0,
          transparente: 0,
          blackout: 0,
          triangulo1: 0,
          triangulo2: 0,
        },
        tipo_de_telas: ["Transparente", "Blackout", "Opaco"],
        tipo_de_topo:[ "Direito", "Redondo"],
        form_base_rule: [
          v => !!v || "Introduzir Valor"
        ],
        rulesLaterais: [
          v => this.bacalhau.opaco+this.bacalhau.transparente+this.bacalhau.blackout <= this.maxBacalhau || "Demasiadas Laterais",
        ]
      }
    },
    methods: {      
      sendBacalhaus()
      {
        if(this.$refs.formBacalhau.validate()){
          this.$emit('formComplete', this.bacalhau);
        }
      }
    }
  }
</script>
