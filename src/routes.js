import PageArticle from './components/PageArticle.vue';
import PageIndex from './components/PageIndex.vue';
import Page404 from './components/Page404.vue';

export const routes = [
    { path: '/',        component: PageIndex,   name: 'index'   },
    { path: '/article', component: PageArticle, name: 'article' },
    { path: '*',        component: Page404,     name: 'page404' }
];
