<template>
  <v-card>
    <v-snackbar
      :timeout="timeout"
      :top="y === 'top'"
      :bottom="y === 'bottom'"
      :right="x === 'right'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      v-model="snackbar"
      color="primary"
    >
      {{ text }}
      <v-btn flat color="white" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
  export default {
    props: ['snackbar', 'text' ],
    data () {
      return {
        y: 'bottom',
        x: 'right',
        mode: 'multi-line',
        timeout: 6000,
      }
    }
  }
</script>