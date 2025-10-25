import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import SelectDemoPage from '@/views/demo/SelectDemoPage.vue';
import TabMenuDemoPage from '@/views/demo/TabMenuDemoPage.vue';

const routes = [
    { path: '/', component: HomeView },
    { path: '/demo/select', component: SelectDemoPage },
    { path: '/demo/tab', component: TabMenuDemoPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;