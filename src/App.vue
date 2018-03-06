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
    
  <v-toolbar dark color="primary">
    <v-toolbar-title class="white--text"  v-if="$route.path!='/'" >
       <router-link to="/menu" style="cursor : pointer">
        <v-btn flat small color="white">{{title}}</v-btn>
       </router-link>
    </v-toolbar-title>
    <v-toolbar-title class="white--text"  v-else>
        <v-btn flat small color="white">{{title}}</v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>
     <v-menu bottom left v-if="$route.path!='/'">
            <v-btn icon slot="activator" dark>
              <v-icon>menu</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="(item, i) in items" :key="i" router-link :to=item.link> 
                  <v-list-tile-title>{{ item.iten }}</v-list-tile-title>
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
import {mapState} from 'vuex'
export default {

  created () {
       console.log("i was created")
       const userObj = JSON.parse(window.localStorage.getItem('authUser'))
       this.$store.dispatch('setUserObject', userObj)
      },

  computed: {
    ...mapState({
      userStore: state => state.userStore
    })
  },

  data: () => ({ 
      title: ' Sitio do Passal ',
      items: [
        { iten: 'Menu', link:'/menu'},
        { iten: 'Logout', link: '/'}],
    }),
  name: 'App',
  home: '/menu',

  methods: {
     shoulddisplay(){
       if(this.$route.path=='/'){
        this.false;
       }
       else
        this.true;
     }
  }

}  
</script>




