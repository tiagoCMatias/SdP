<template>
  <v-app>
    <navBar/>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
import navBar from "./components/navBar/navBar";
export default {
  components: { navBar },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("autoLogIn");
    if (!this.$store.getters.isLoggedIn) this.$router.push("/");
  },

  name: "App"
};
</script>
