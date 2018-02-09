import Vue from 'vue'
import Router from 'vue-router'
import Estrado from '@/components/estrado'
import Login from '@/components/login'

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
    }
  ],
  mode: 'history'
})
