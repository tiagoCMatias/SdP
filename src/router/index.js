import Vue from 'vue'
import Router from 'vue-router'
import Estrado from '@/components/estrado'
import Login from '@/components/login'
import MainMenu from '@/components/mainMenu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/estrado',
      name: 'estrado',
      component: Estrado
    },
    {
      path: '/menu',
      name: 'menu',
      component: MainMenu
    }
  ],
  mode: 'history'
})
