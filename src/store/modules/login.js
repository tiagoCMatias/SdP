import {
  signIn
} from "../../utils/configuration-manager";

import router from '../../router'
import {
  SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION
} from "constants";

const state = {
  token: null,
  user: null,
  auth: false,
};

const getters = {
  isLoggedIn: state => {
    return state.token !== null;
  },
  getToken: state => {
    return state.token;
  },
  authResult: state => {
    return state.auth;
  }
}

const mutations = {
  login: (state, payload) => {
    state.token = payload.token;
    state.user = payload.user;
    state.auth = true;
  },
  logout: (state) => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    state.token = null;
    state.user = null;
    state.auth = false;
    router.replace('/');
  }
}

const actions = {
  setLogoutTime({
    commit
  }, expirationTime) {
    setTimeout(() => {
      commit('logout')
    }, expirationTime * 1000) // miliseconds to seconds
  },
  autoLogIn({
    commit
  }) {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (!token || !username)
      return;
    commit('login', {
      'token': token,
      'user': username
    });
  },
  authLogin: ({
    commit,
    dispatch
  }, payload) => {
    return new Promise((resolve, reject) => {
      // Do something here... lets say, a http call using vue-resource
      signIn(payload.username, payload.password)
        .then(suc => {
          localStorage.setItem("token", suc.data.jwt);
          localStorage.setItem("username", suc.data.username);
          commit('login', {
            'token': suc.data.jwt,
            'user': suc.data.username
          });
          dispatch('setLogoutTime', 3600);
          router.replace('/menu');
          resolve(true);
        })
        .catch(err => {
          commit('logout')
          reject(Error("An error has occurred! Please try again."))
        })
    })
  },

}

export default {
  state,
  getters,
  mutations,
  actions
}
