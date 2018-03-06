import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './userStore';

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store ({
    modules: {
        userStore
    },
    strict: debug
})


/*export const store = new Vuex.Store({
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
});*/