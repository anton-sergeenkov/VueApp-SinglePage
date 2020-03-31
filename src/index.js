import Vue from 'vue';
import App from './components/App.vue';

// Vuex
// import { store } from './vuex.js';

// VueRouter
import VueRouter from 'vue-router';
import { routes } from './routes';

// Vuetify
// import Vuetify from 'vuetify';
// Vue.use(Vuetify);

Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    routes 
});

new Vue({
    el: '#app',
    // store,
    render: h => h (App),
    router
});
