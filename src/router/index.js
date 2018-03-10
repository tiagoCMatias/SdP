import Vue from 'vue'
import Router from 'vue-router'
import Estrado from '@/components/estrado'
import Login from '@/components/login'
import MainMenu from '@/components/mainMenu'
import MenuTendas from '@/components/tendas'
import Aguas from '@/components/tendas/aguas'
import Iglo from '@/components/tendas/iglo'
import Conica from '@/components/tendas/conicas'

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
    },
    {
      path: '/tendas',
      name: 'tendas',
      component: MenuTendas
    },
    {
      path: '/aguas',
      name: '2Aguas',
      component: Aguas
    },
    {
      path: '/conicas',
      name: 'Conicas',
      component: Conica
    },
    {
      path: '/iglo',
      name: 'Iglo',
      component: Iglo
    }
  ],
  mode: 'history'
})
