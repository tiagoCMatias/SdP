<template>
    <v-toolbar color="primary" fixed app>
      <v-toolbar-side-icon @click="drawerClick"></v-toolbar-side-icon>
    <v-toolbar-title>{{title}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
    <v-btn flat color="white" 
        v-for="item in menuItems" 
        :key="item.title" 
        router :to="item.link"
        @click.native="menuClick(item)"
        > 
        <v-icon>
            {{item.icon}}
        </v-icon>
          {{item.title}}
        </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  props: ["menuItems", "title"],
  data() {
    return {};
  },
  methods: {
    drawerClick: function() {
      this.$emit("drawerClick");
    },
    menuClick: function(item) {
      if (item.action !== null) this.$emit(item.action);
    }
  }
};
</script>

