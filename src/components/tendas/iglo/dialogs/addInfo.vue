<template>
    <v-dialog v-model="addInfo" max-width="500px">      
        <v-card>
            <v-card-title>
            <span class="headline">Novo</span>
            </v-card-title>
            <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                <v-flex xs12 sm6 md4>
                    <v-text-field label="Nome" v-model="editedItem.title"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-text-field label="Quantidade" v-model="editedItem.qt"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-text-field label="Codigo" v-model="editedItem.codigo"></v-text-field>
                </v-flex>
                </v-layout>
            </v-container>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close_table_dialog()">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save_table_dialog()">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<script>
export default {
    props: ['addInfo'],
    data() {
        return {
            editedItem: {
                title: '',
                qt: 0,
                codigo: '',
            },
        }
    }
}
</script>
