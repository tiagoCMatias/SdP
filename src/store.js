import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

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
        },
        logout(state){
            state.user = null;
        }
    },
    plugins: [
        createPersistedState({
            getState: (key) => {
                //Cookies.getJSON(key)
                Cookies.getJSON('username');
            },
            setState: (key, state) => {
                Cookies.set('username', state.user, { expires: 3, secure: true });
                //Cookies.set(key, state, { expires: 3, secure: true })

            },
            //removeItem: key => Cookies.remove(key)
        })
    ]
});