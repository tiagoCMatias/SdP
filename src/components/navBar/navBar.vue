<template>
    <div>
        <sideBar 
        :menuItems="this.menuItems"
        :drawer="this.drawer"
        />
        <topBar 
        :menuItems="this.menuItems"
        :title="this.title"
        @drawerClick="drawerClick" 
        />
  </div>
</template>


<script>
import sideBar from "./sideBar";
import topBar from "./topBar";
export default {
  components: { sideBar, topBar },
  data() {
    return {
      drawer: false,
      title: "Sitio do Passal",
      menuItems: [
        { title: "Menu", link: "/menu" },
        { title: "Conta", link: "/account" },
        { title: "Logout", link: "/" }
      ],
      itemShow: false
    };
  },
  created() {
    //this.$store.getters.isLoggedIn = this.itemShow;
  },
  methods: {
    drawerClick: function() {
      this.drawer = !this.drawer;
    }
  }
};
</script>
