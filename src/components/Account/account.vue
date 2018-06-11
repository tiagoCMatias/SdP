<template>
    <v-container class="text-xs-center">
        <v-flex xs12 >
           <h1>{{this.$store.getters.getAccountName}}</h1>
        </v-flex>
        <v-flex xs12 >
           <h1>{{this.$store.getters.getUserLevel}}</h1>
        </v-flex>
    </v-container>
</template>
