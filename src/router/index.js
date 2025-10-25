import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import SelectDemoPage from '@/views/demo/SelectDemoPage.vue';
const routes = [
    { path: '/', component: HomeView },
    { path: '/demo/select', component: SelectDemoPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;