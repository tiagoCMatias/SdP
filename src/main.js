// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {store} from './store'
import router from './router'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VSubheader,
  VAlert,
  VTextField,
  VSelect,
  VMenu,
  VDialog,
  VDataTable,
  VCheckbox,
  VStepper,
  VDivider,
  VDatePicker,
  VSlider,
  VSnackbar,
  VForm,
  VCard,
  VToolbar,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VSnackbar,
    VDatePicker,
    VBtn,
    VSelect,
    VSlider,
    VForm,
    VStepper,
    VDivider,
    VMenu,
    VCheckbox,
    VAlert,
    VIcon,
    VDataTable,
    VDialog,
    VSubheader,
    VTextField,
    VGrid,
    VCard,
    VToolbar,
    transitions
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
