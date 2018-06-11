import Vue from 'vue';
import Vuex from 'vuex'
import Login from '../../../src/components/login/login'
import sinon from 'sinon'
import router from '../../../src/router'
import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils'

import {
  mount
} from 'avoriaz'

import {
  Vuetify,
  VForm,
  VBtn
} from 'vuetify'



describe('login.vue', () => {
  let wrapper;
  let store;
  //Mount component
  beforeEach(function () {
    store = new Vuex.Store({
      state: {
        token: null,
        user: null,
        auth: false,
      }
    });
    const localVue = createLocalVue();
    localVue.use(router);
    localVue.use(Vuex);
    localVue.use(Vuetify);
    localVue.use(VForm);
    wrapper = mount(Login, {
      router,
      Vuex,
      Vuetify,
      VForm
    });
  });
  // Inspect the raw component options
  it('should mount component and pass', () => {
    expect(wrapper.contains('v-layout')).to.equal(true)
    //expect(wrapper.vm.$route).to.be.an('object');
  });

  it('should test submit method', () => {
    wrapper.setData({
      name: "something",
      password: "something"
    });
    wrapper.vm.submit();
    expect(wrapper.vm.alert).to.be.true;
  })

  it('should test Invalid loginForm rules', () => {
    wrapper.setData({
      name: "morethan10characters",
      password: "password"
    });
    wrapper.vm.submit();
    expect(wrapper.vm.loginForm).to.be.false;
  })

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
    wrapper.setData({
      name: "name",
      password: "password"
    });
    wrapper.vm.clear();
    expect(listener.called);
    expect(wrapper.vm.name).to.be.a('null');
  });

});
