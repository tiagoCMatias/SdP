import Vue from 'vue';
// The path is relative to the project root.
import MainMenu from '../../../src/components/Menu/mainMenu'

import { shallowMount } from '@vue/test-utils'
//import { mount } from 'avoriaz'


describe('mainMenu.vue', () => {
  const wrapper = shallowMount(MainMenu);
  // Inspect the raw component options
  it('should mount component and pass', () => {
    expect(wrapper.contains('v-layout')).to.equal(true)
  })

  it('check menuItens', () => {
    const vm = wrapper.vm;
    const menuItens = vm.menuItens;
    expect(menuItens).to.be.an('array')
  })

  it('check for buttons', () => {
    expect(wrapper.contains('v-btn')).to.equal(true)
  })

});