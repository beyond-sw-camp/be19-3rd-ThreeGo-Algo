import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ButtonDemoPage from '@/views/demo/ButtonDemoPage.vue';

const routes = [
    { path: '/', component: HomeView },
    { path: '/demo/button', component: ButtonDemoPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;