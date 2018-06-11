import Vue from 'vue';
// The path is relative to the project root.
import Tabela from '../../../src/components/CRM/tabela/tabela'

import {
  shallowMount
} from '@vue/test-utils'
//import { mount } from 'avoriaz'

import {
  Vuetify,
  VDataTable,
  VAlert
} from 'vuetify'

Vue.use(Vuetify, {
  components: {
    VDataTable,
    VAlert
  }
});


describe('test CRM - Tabela', () => {

  // Inspect the raw component options
  it('should mount component and pass', () => {
    const wrapper = shallowMount(Tabela);
    expect(wrapper.isVueInstance()).to.be.true;
  })

  it('pass table content', () => {

    const listaDeObras = [{
      id: 0,
      local: 'local',
      cliente: 'cliente',
      dia: '2018-01-01'
    }]

    const wrapper = shallowMount(Tabela, {
      propsData: {
        listaDeObras: listaDeObras
      }
    })
    expect(wrapper.find('td'));
  })


});
