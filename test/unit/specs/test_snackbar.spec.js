import Vue from 'vue';
// The path is relative to the project root.
import Snackbar from '../../../src/components/CRM/snackbar/mySnackbar'

import { shallowMount } from '@vue/test-utils'
//import { mount } from 'avoriaz'


describe('test Snackbar', () => {
  
  // Inspect the raw component options
  it('should mount component and pass', () => {
    const wrapper = shallowMount(Snackbar);
    expect(wrapper.isVueInstance()).to.be.true;
  })

  it('mount component with props', () => {
    const msg = "snackbar test message";
    const wrapper = shallowMount(Snackbar, {
        propsData: {
            snackbar: true,
            text: msg,
        }
      });
    expect(wrapper.find('v-snackbar').text()).to.contain(msg);
  })

});