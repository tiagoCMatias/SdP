<template>
  <v-form v-model="formLateral" ref="formLateral" mx-3>
    <v-layout row wrap>
      <v-flex xs12 text-xs-center>
          <v-subheader class="display-1" >Laterais - {{ maxLaterais }}</v-subheader>
      </v-flex>
      <v-flex xs6 sm9>
          <v-text-field label="Opaco" readonly v-model="lateral.opaco" type="number"></v-text-field>
      </v-flex>
      <v-flex xs3 sm1 text-xs-right>
          <v-btn @click.native="lateral.opaco = lateral.opaco+1" color="dark" fab small>
              <v-icon >add</v-icon>
          </v-btn>
      </v-flex>
      <v-flex xs3 sm1 text-xs-right>
          <v-btn @click.native="lateral.opaco > 0 ? lateral.opaco-- : lateral.opaco = 0" color="dark" fab small>
              <v-icon >remove</v-icon>
          </v-btn>
      </v-flex>

      <v-flex xs6 sm9>
          <v-text-field label="Transparente" readonly v-model="lateral.transparente" type="number"></v-text-field>
      </v-flex>
      <v-flex xs3 sm1 text-xs-right>
          <v-btn @click.native="lateral.transparente = lateral.transparente+1" color="dark" fab small >
              <v-icon >add</v-icon>
          </v-btn>
      </v-flex>
      <v-flex xs3 sm1 text-xs-right>
          <v-btn @click.native="lateral.transparente > 0 ? lateral.transparente-- : lateral.transparente = 0" color="dark" fab small >
              <v-icon >remove</v-icon>
          </v-btn>
      </v-flex>

      <v-flex xs6 sm9>
          <v-text-field label="Blackout" readonly v-model="lateral.blackout" type="number"></v-text-field>
      </v-flex>
      <v-flex xs3 sm1 text-xs-right>
          <v-btn @click.native="lateral.blackout = lateral.blackout+1" color="dark" fab small >
              <v-icon >add</v-icon>
          </v-btn>
      </v-flex>
      <v-flex xs3 sm1 text-xs-right>
          <v-btn @click.native="lateral.blackout > 0 ? lateral.blackout-- : lateral.blackout = 0" color="dark" fab small >
              <v-icon >remove</v-icon>
          </v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap v-if="largura==7.5 || largura==17.5 || largura==12.5">
      <v-flex xs12 text-xs-center>
          <v-subheader class="display-1">Laterais {{ lateralDiferente }}m - {{ maxTriangulo }}</v-subheader>
      </v-flex>
      <v-flex xs6 sm9>
          <v-text-field label="Opaco" readonly v-model="lateral.especialOpaco" type="number"></v-text-field>
      </v-flex>
      <v-flex xs3 sm1 text-xs-right>
          <v-btn @click.native="lateral.especialOpaco = lateral.especialOpaco+1" color="dark" fab small>
              <v-icon >add</v-icon>
          </v-btn>
      </v-flex>
      <v-flex xs3 sm1 text-xs-right>
          <v-btn @click.native="lateral.especialOpaco > 0 ? lateral.especialOpaco-- : lateral.especialOpaco = 0" color="dark" fab small>
              <v-icon >remove</v-icon>
          </v-btn>
      </v-flex>

      <v-flex xs6 sm9>
          <v-text-field label="Transparente" readonly v-model="lateral.especialTransparente" type="number"></v-text-field>
      </v-flex>
      <v-flex xs3 sm1 text-xs-right>
          <v-btn @click.native="lateral.especialTransparente = lateral.especialTransparente+1" color="dark" fab small >
              <v-icon >add</v-icon>
          </v-btn>
      </v-flex>
      <v-flex xs3 sm1 text-xs-right>
          <v-btn @click.native="lateral.especialTransparente > 0 ? lateral.especialTransparente-- : lateral.especialTransparente = 0" color="dark" fab small >
              <v-icon >remove</v-icon>
          </v-btn>
      </v-flex>

      <v-flex xs6 sm9>
          <v-text-field label="Blackout" readonly v-model="lateral.especialBlackout" type="number"></v-text-field>
      </v-flex>
      <v-flex xs3 sm1 text-xs-right>
          <v-btn @click.native="lateral.especialBlackout = lateral.especialBlackout+1" color="dark" fab small >
              <v-icon >add</v-icon>
          </v-btn>
      </v-flex>
      <v-flex xs3 sm1 text-xs-right>
          <v-btn @click.native="lateral.especialBlackout > 0 ? lateral.especialBlackout-- : lateral.especialBlackout = 0" color="dark" fab small >
              <v-icon >remove</v-icon>
          </v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap v-if="mostrarEspecial">
      <v-flex xs3 hidden-xs-only>
          <v-subheader class="display-1">Laterais Modulo {{ largura/5 }}</v-subheader>
      </v-flex>
      <v-flex mr-2>
          <v-select
          :items="tipo_de_telas"
          v-model="lateral.especial1"
          :rules="form_base_rule"
          label="Lateral Especial"
          class="input-group"
          item-value="text"
          required
          ></v-select>
      </v-flex>
      <v-flex mr-2>
          <v-select
          :items="tipo_de_telas"
          v-model="lateral.especial2"
          :rules="form_base_rule"
          label="Lateral Especial"
          class="input-group"
          item-value="text"
          required
          ></v-select>
      </v-flex>
    </v-layout>
    <v-btn color="primary" @click.native="sendLaterais()">Continue</v-btn>
  </v-form>
</template>


<script>
  export default {    
    props: ['largura', 'mostrarEspecial', 'maxLaterais'],

    data() {
      return {
        formLateral: null,
        tamanho_tendas: [
          ["10", "15", "20", "25"]
        ],
        lateral: {
          opaco: 0,
          transparente: 0,
          blackout: 0,

          especialOpaco: 0,
          especialTransparente: 0,
          especialBlackout: 0,

          especial1: null,
          especial2: null,
        },
        form_base_rule: [
          v => !!v || "Introduzir Valor"
        ],
        comprimentoRules: [
          v => !!v || "Introduzir Comprimento",
          v => (v >= 1 && v % 1.25 === 0) || "Comprimento (multiplo 1.25)"
        ],
        tipo_de_telas: ["Transparente", "Blackout", "Opaco"],
        tipo_fixacao: ["Estacas", "Pesos", "Estrado"],
      }
    },
    methods: {      
      sendLaterais()
      {
        if(this.$refs.formLateral.validate()){
          this.$emit('formComplete', this.lateral);
        }
      }
    }
  }
</script>
