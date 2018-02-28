import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: '',
        privilage: ''
    },
    getters: {
        isLogged (state) {
            return state.user;
        }
    },
    mutations: {
        login (state, payload) {
            state.user = payload.user;
        }
    }
});