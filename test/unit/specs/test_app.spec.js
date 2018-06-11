import Vue from 'vue';
// The path is relative to the project root.
import App from '../../../src/App'
import Vuex from 'vuex'
import router from '../../../src/router'
import {
  shallowMount
} from '@vue/test-utils'
//import { mount } from 'avoriaz'

Vue.use(Vuex, router)


describe('test App', () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        token: null,
        user: null,
        auth: false,
      }
    });
  })
  // Inspect the raw component options
  it('should mount component and pass', () => {
    const wrapper = shallowMount(App, {
      store,
      router
    });
    expect(wrapper.isVueInstance()).to.be.true;
  })

});
