import Vue from 'vue'
import Router from 'vue-router'
import Estrado from '@/components/estrado'
import Login from '@/components/login'
import MainMenu from '@/components/mainMenu'
import MenuTendas from '@/components/tendas'
import Aguas from '@/components/tendas/aguas'
import Iglo from '@/components/tendas/iglo'
import Conica from '@/components/tendas/conicas'
import CenaDoMal from '@/components/tendas/iglo/iglo'
import uConicas from '@/components/tendas/conicas/conica'
import uAguas from '@/components/tendas/aguas/aguas'


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
    },
    {
      path: '/mal',
      name: 'Mal',
      component: CenaDoMal
    },
    {
      path: '/uconica',
      name: 'Conicas',
      component: uConicas
    },
    {
      path: '/uaguas',
      name: 'aguas',
      component: uAguas
    }
  ],
  mode: 'history'
})
