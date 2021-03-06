import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: '',
    privilage: '',
    jwt: ''
  },
  getters: {
    isLogged(state) {
      return state.user;
    }
  },
  mutations: {
    login(state, payload) {
      state.user = payload.user;
      state.jwt = payload.jwt;
    },
    logout(state) {
      state.user = null;
      state.jwt = null;
    }
  },
  plugins: [
    createPersistedState({
      getState: (key) => {
        //Cookies.getJSON(key)
        Cookies.getJSON('SdpCookie');
      },
      setState: (key, state) => {
        Cookies.set(
          'SdpCookie',
          JSON.stringify({
            username: state.username,
            jwt: state.jwt
          }), {
            expires: 3,
            secure: true
          }
        );
        //Cookies.set(key, state, { expires: 3, secure: true })

      },
      //removeItem: key => Cookies.remove(key)
    })
  ]
});
