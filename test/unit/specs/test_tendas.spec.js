import Vue from 'vue';
// The path is relative to the project root.
import Tendas from '../../../src/components/Menu/tendas'

import { shallowMount } from '@vue/test-utils'
//import { mount } from 'avoriaz'


describe('tendasMenu.vue', () => {
  const wrapper = shallowMount(Tendas);
  // Inspect the raw component options
  it('should mount component and pass', () => {
    expect(wrapper.isVueInstance()).to.be.true;
  })

  it('check menuItens', () => {
    const vm = wrapper.vm;
    const menuItens = vm.menuItens;
    expect(menuItens).to.be.an('array')
  })

});