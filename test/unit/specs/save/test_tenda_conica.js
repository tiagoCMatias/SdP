import Vue from 'vue';
// The path is relative to the project root.
import Conica from '../../../src/components/tendas/conicas/conica'

import { shallowMount } from '@vue/test-utils'
//import { mount } from 'avoriaz'


describe('test Conica', () => {
  const wrapper = shallowMount(Conica);
  // Inspect the raw component options
  it('should mount component and pass', () => {
    expect(wrapper.isVueInstance()).to.be.true;
  })

});