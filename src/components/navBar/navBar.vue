<template>
    <div v-if="auth">
      <sideBar 
        :menuItems="this.menuItems"
        :drawer="this.drawer"
        @logout="logout"
      />
      <topBar 
        :menuItems="this.menuItems"
        :title="this.title"
        @drawerClick="drawerClick"
        @logout="logout" 
      />
  </div>
  <div v-else>
    <sideBar 
      :menuItems="this.logoutItems"
      :drawer="this.drawer"
    />
    <topBar 
      :menuItems="this.logoutItems"
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
        { title: "Menu", link: "/menu", action: null },
        { title: "Conta", link: "/account", action: null },
        { title: "Logout", link: "/", action: "logout" }
      ],
      logoutItems: [{ title: "Login", link: "/", action: null }],
      itemShow: false
    };
  },
  computed: {
    auth: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    drawerClick: function() {
      this.drawer = !this.drawer;
    },
    logout: function() {
      console.log("emit");
      this.$store.commit("logout");
    }
  }
};
</script>
