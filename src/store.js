import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        comments: [],
        user: {
           authorized: false,
           login: '',
           password: '',
           name: '',
        },
    },
    getters: {
        getComments(state) {
            return state.comments;
        },
        getUser(state) {
            return state.user;
        },
    },
    mutations: {
        SET_COMMENTS(state, payload) {
            state.comments = payload.comments;
        },
        SET_USER(state, payload) {
            state.user = payload.user;
        },
    },
    actions: {
        setComments({ commit }, comments) {
            commit('SET_COMMENTS', { comments: comments });
            return comments;
        },
        setUser({ commit }, user) {
            commit('SET_USER', { user: user });
            return user;
        },
    },
});
