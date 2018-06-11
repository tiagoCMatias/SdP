<template>
    <v-navigation-drawer v-model="drawerState" color="primary" temporary="" fixed app>
    <v-list>
      <v-list-tile v-for="item in menuItems" :key="item.title" router :to="item.link">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["menuItems", "drawer"],
  data() {
    return {
      drawerState: false
    };
  },
  watch: {
    drawer: function(newVal, oldVal) {
      this.drawerState = newVal;
    }
  }
};
</script>

