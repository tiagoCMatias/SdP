import Vue from 'vue';
// The path is relative to the project root.
import CRM from '../../../src/components/CRM/crm'

import { shallowMount } from '@vue/test-utils'
//import { mount } from 'avoriaz'


describe('test CRM', () => {
  const wrapper = shallowMount(CRM);
  // Inspect the raw component options
  it('should mount component and pass', () => {
    expect(wrapper.isVueInstance()).to.be.true;
  })

});