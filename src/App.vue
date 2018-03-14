<template>
  <v-app>
    <!-- Mobile 
    <v-navigation-drawer temporary v-model="sideNav">
      <v-list>
        <v-list-title 
        v-for="item in menuItens" 
        :key="item.title"
        router :to="item.link">
          <v-list-title-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-title-action>
          <v-list-title-content >{{item.title}}</v-list-title-content>
        </v-list-title>
      </v-list>
    </v-navigation-drawer>
-->
    <!-- Laptop -->
    <v-toolbar dark >
      <v-toolbar-side-icon 
        @click.native.stop="sideNav = !sideNav"
        class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title >
        <router-link to="/" style="cursor : pointer" v-text=title></router-link> 
      </v-toolbar-title>
      <v-spacer></v-spacer> 
      <v-menu offset-y v-if="$route.path!='/'">
      <v-btn icon slot="activator" dark >
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile v-for="item in menuitems" :key="item.title" router :to="item.link">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'Sitio do Passal',
      menuitems: [
        { title: "Menu" , link: '/menu'},
        { title: "Logout" , link: '/'}
      ]
    }
  },
  created () {  
    if(localStorage.getItem("userName") != 'admin')
    {
      this.$router.push('/');
    }
    this.accessMenu();
  },
  methods: {
    redirect: function() {
      
    },
    accessMenu: function (){
       return this.$route.name === 'login'
    }
    
  },
  name: 'App'
}
</script>
