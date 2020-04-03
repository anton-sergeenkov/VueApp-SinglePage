import PageArticle from './pages/PageArticle.vue';
import PageIndex from './pages/PageIndex.vue';
import Page404 from './pages/Page404.vue';

export const routes = [
    { path: '/', component: PageIndex, name: 'index' },
    { path: '/article', component: PageArticle, name: 'article' },
    { path: '*', component: Page404, name: 'page404' },
];
