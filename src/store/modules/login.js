import {
  signIn
} from "../../utils/configuration-manager";

import router from '../../router'

const ADMIN_LEVEL = 1;

const state = {
  token: null,
  user: null,
  auth: false,
  userLevel: null,
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
  },
  isAdmin: state => {
    return state.userLevel === ADMIN_LEVEL;
  },
  getAccountName: state => {
    return state.user;
  },
  getUserLevel: state => {
    return state.userLevel;
  }
}

const mutations = {
  login: (state, payload) => {
    state.token = payload.token;
    state.user = payload.user;
    state.userLevel = payload.userLevel;
    state.auth = true;
  },
  logout: (state) => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    state.token = null;
    state.user = null;
    state.auth = false;
    state.userLevel = null;
    router.replace('/');
  }
}

const actions = {
  setLogoutTime({ commit }, expirationTime) {
    setTimeout(() => {
      commit('logout')
    }, expirationTime * 1000) // miliseconds to seconds
  },
  autoLogIn({ commit }) {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const userLevel = parseInt(localStorage.getItem("userLevel"));
    if (!token || !username)
      return;
    commit('login', {
      'token': token,
      'user': username,
      'userLevel': userLevel
    });
  },
  authLogin: ({ commit, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      signIn(payload.username, payload.password)
        .then(suc => {
          localStorage.setItem("token", suc.data.jwt);
          localStorage.setItem("username", suc.data.username);
          localStorage.setItem("userLevel", suc.data.level_id);
          commit('login', {
            'token': suc.data.jwt,
            'user': suc.data.username,
            'userLevel': suc.data.level_id
          });
          dispatch('setLogoutTime', 3600);
          router.replace('/menu');
          resolve(true);
        })
        .catch(() => {
            commit('logout');
            reject(Error("An error has occurred! Please try again."));
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
