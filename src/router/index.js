import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ButtonDemoPage from '@/views/demo/ButtonDemoPage.vue';
import DateButtonDemoPage from '@/views/demo/DateButtonDemoPage.vue';

const routes = [
    { path: '/', component: HomeView },
    { path: '/demo/button', component: ButtonDemoPage },
    { path: '/demo/date-button', component: DateButtonDemoPage },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;