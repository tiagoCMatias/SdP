import Vue from 'vue';
// The path is relative to the project root.
import Login from '../../../src/components/login/login'

import { shallowMount } from '@vue/test-utils'
import sinon from 'sinon'

import { mount } from '@vue/test-utils'



describe('login.vue', () => {
  const wrapper = shallowMount(Login);

  // Inspect the raw component options
  it('should mount component and pass', () => {
    expect(wrapper.isVueInstance()).to.be.true;
  });

  it('should have a form', () => {
    expect(wrapper.contains('v-form')).to.equal(true);
  });

  it('should click form button', () => {
    const listener = sinon.spy();
    wrapper.setMethods({
      submit: listener
    });
    wrapper.find('#submitButton').trigger('click');
    expect(listener.called);
  });

  it('should clean form data', () => {
    const listener = sinon.spy();
    wrapper.setData({ name: "name", password: "password"});
    wrapper.vm.clear();
    expect(wrapper.vm.name).to.be.a('null');
  });  

  it('should test clear method', () => {
    const wrapper = shallowMount(Login);
    wrapper.vm.clear();
    expect(wrapper.vm.name).to.be.a('null');
  })

});