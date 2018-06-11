<template>
    <v-layout row wrap>
            <v-container grid-list-md>
            <v-layout row wrap class="text-xs-center">
                <v-flex xs12 sm2 mx-3>
                    <v-btn color="primary" @click.native="table_edit_dialog = true" dark slot="activator">New Item</v-btn>
                </v-flex>
                <v-flex xs12 sm6 mx-2>
                    <v-text-field
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                        v-model="search"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm2 mx-1 >
                    <v-btn color="primary" dark @click.native="adicionar_info_dialog = true" class="mb-2">PDF</v-btn>
                </v-flex>
            </v-layout>
            </v-container>
        <v-dialog v-model="table_edit_dialog" max-width="500px">
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

        <v-data-table
            v-bind:headers="header"
            :items="items"
            hide-actions
            :search="search"
            class="elevation-1"
            >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.title }}</td>
                <td class="text-xs-right">{{ props.item.qt }}</td>
                <!--<td class="text-xs-right">{{ props.item.codigo }}</td>-->
                <td class="justify-center layout px-0">
                <v-btn icon class="mx-0" @click="editItem(props.item)">
                    <v-icon color="primary">edit</v-icon>
                </v-btn>
                <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                    <v-icon color="red">delete</v-icon>
                </v-btn>
                </td>
            </template>
        </v-data-table>
        <v-btn color="primary" @click.native="complete()">Continue</v-btn>
    </v-layout>
</template>


<script>
  export default {
    props: ['items' ],
    data() {
      return {
        search: '',
        table_edit_dialog: false,
        editedIndex: -1,
        editedItem: {
            title: '',
            qt: 0,
        },
        defaultItem: {
            title: '',
            qt: 0,
        },
        header: [
            {
                text: "Material",
                align: "left",
                sortable: false,
                value: "title"
            },
            { text: "Qt", value: "qt" }
        ],
      }
    },
    methods: {      
        complete()
        {
            this.$emit('formComplete', this.bacalhau);
        },
        editItem (item) {
            this.editedIndex = this.items.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.table_edit_dialog = true
        },
        deleteItem (item) {
            const index = this.items.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
        },
        close_table_dialog () {
            this.table_edit_dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
        },

        save_table_dialog () {
            if (this.editedIndex > -1) {
                Object.assign(this.items[this.editedIndex], this.editedItem)
            } else {
                this.items.push(this.editedItem)
            }
            this.close_table_dialog()
        },
    }
  }
</script>
