import Vue from 'vue'
import Router from 'vue-router'
import Estrado from '@/components/estrado/estrado'
import Login from '@/components/login/login'
import MainMenu from '@/components/Menu/mainMenu'
import MenuTendas from '@/components/Menu/tendas'
import Aguas from '@/components/tendas/aguas/aguas'
import Iglo from '@/components/tendas/iglo/iglo'
import Conica from '@/components/tendas/conicas/conica'
import CRM from '@/components/CRM/crm'

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
      path: '/crm',
      name: 'CRM',
      component: CRM
    }
  ],
  mode: 'history'
})
