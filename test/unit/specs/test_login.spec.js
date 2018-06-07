import Vue from 'vue';
import Login from '../../../src/components/login/login'
import MainMenu from '../../../src/components/Menu/mainMenu'
import sinon from 'sinon'
import Router from 'vue-router'
import {
  shallowMount,
  createLocalVue

} from '@vue/test-utils'
import {
  store
} from '../../../src/store'
import {
  Vuetify,
  VForm,
  VBtn
} from 'vuetify'

Vue.use(Vuetify, {
  components: {
    VForm,
    VBtn
  }
})

const localVue = createLocalVue()
localVue.use(Router)

const routes = [{
    path: '/menu',
    name: 'menu',
    component: MainMenu
  },
  {
    path: '/',
    name: 'login',
    component: Login
  },
]
const router = new Router({
  routes
})

describe('login.vue', () => {
  let wrapper = null;
  //Mount component
  beforeEach(function () {
    wrapper = shallowMount(Login, {

    });
  });
  // Inspect the raw component options
  it('should mount component and pass', () => {
    expect(wrapper.isVueInstance()).to.be.true;
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
