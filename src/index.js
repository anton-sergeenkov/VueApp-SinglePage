import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import { store } from './store.js';

import App from './components/App.vue';

import './uikit';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes 
});

new Vue({
    el: '#app',
    store,
    render: h => h (App),
    router
});
