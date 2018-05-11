<template>
  <v-form v-model="formLaterais" ref="formLaterais" mx-3>
    <v-layout row wrap>
        <v-flex xs12 text-xs-center>
            <v-subheader class="display-2" >Laterais - {{ maxLateral }}</v-subheader>
        </v-flex>
        <v-flex xs6 sm9>
            <v-text-field label="Opaco" :rules="rulesLaterais" readonly v-model="lateral.opaco" type="number"></v-text-field>
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
            <v-text-field label="Transparente" readonly :rules="rulesLaterais" v-model="lateral.transparente" type="number"></v-text-field>
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
            <v-text-field label="Blackout" readonly :rules="rulesLaterais" v-model="lateral.blackout" type="number"></v-text-field>
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
    <v-layout row wrap v-if="topo1 == tipo_de_topo[0]">
        <v-flex xs3 hidden-xs-only>
            <v-subheader>Laterais Angulo</v-subheader>
        </v-flex>
        <v-flex mr-2>
            <v-select
            :items="tipo_de_telas"
            v-model="lateral.topoDireito1"
            :rules="form_base_rule"
            label="Lateral Direito"
            class="input-group"
            item-value="text"
            required
            ></v-select>
        </v-flex>
        <v-flex mr-2>
            <v-select
            :items="tipo_de_telas"
            v-model="lateral.topoEsquerdo1"
            :rules="form_base_rule"
            label="Lateral Esquerdo"
            class="input-group"
            item-value="text"
            required
            ></v-select>
        </v-flex>
    </v-layout>

    <v-layout row wrap v-if="topo2 == tipo_de_topo[0]">
        <v-flex xs3 hidden-xs-only>
            <v-subheader>Laterais Topo Direito</v-subheader>
        </v-flex>
        <v-flex mr-2>
            <v-select
            :items="tipo_de_telas"
            v-model="lateral.topoDireito2"
            :rules="form_base_rule"
            label="Lateral Direito"
            class="input-group"
            item-value="text"
            required
            ></v-select>
        </v-flex>
        <v-flex mr-2>
            <v-select
            :items="tipo_de_telas"
            v-model="lateral.topoEsquerdo2"
            :rules="form_base_rule"
            label="Lateral Esquerdo"
            class="input-group"
            item-value="text"
            required
            ></v-select>
        </v-flex>
    </v-layout>

    <v-layout row wrap v-if="topo1 == tipo_de_topo[1] || topo2 == tipo_de_topo[1]">
        <v-flex xs3 hidden-xs-only>
            <v-subheader>Laterais Topo Redondo</v-subheader>
        </v-flex>
        <v-flex mr-2 v-if="topo1 == tipo_de_topo[1]">
            <v-select
            :items="tipo_de_telas"
            v-model="lateral.topoRedondo1"
            :rules="form_base_rule"
            label="Lateral Topo Redondo 1"
            class="input-group"
            item-value="text"
            required
            ></v-select>
        </v-flex>
        <v-flex mr-2 v-if="topo2 == tipo_de_topo[1]">
            <v-select
            :items="tipo_de_telas"
            v-model="lateral.topoRedondo2"
            :rules="form_base_rule"
            label="Lateral Topo Redondo 2"
            class="input-group"
            item-value="text"
            required
            ></v-select>
        </v-flex>
    </v-layout>
    <v-layout row wrap v-if="mostrarEspecial">
        <v-flex xs3 hidden-xs-only>
            <v-subheader>Laterais Modulo {{ resto }}</v-subheader>
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
    props: ['maxLateral', 'topo1', 'topo2', 'mostrarEspecial'],
    data() {
      return {
        formLaterais: null,
        lateral: {
          opaco: 0,
          transparente: 0,
          blackout: 0,
          topoDireito1: null,
          topoEsquerdo1: null,
          topoDireito2: null,
          topoEsquerdo2: null,
          topoRedondo1: null,
          topoRedondo2: null,
          especial1: null,
          especial2: null,
        },
        tipo_de_telas: ["Transparente", "Blackout", "Opaco"],
        tipo_de_topo:[ "Direito", "Redondo"],
        form_base_rule: [
          v => !!v || "Introduzir Valor"
        ],
        rulesLaterais: [
          v => this.lateral.opaco+this.lateral.transparente+this.lateral.blackout <= this.maxLateral || "Demasiadas Laterais",
        ]
      }
    },
    methods: {      
      sendLaterais()
      {
        if(this.$refs.formLaterais.validate()){
          this.$emit('formComplete', this.lateral);
        }
      }
    }
  }
</script>
