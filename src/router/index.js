import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ButtonDemoPage from '@/views/demo/ButtonDemoPage.vue';
import MiniProfileDemoPage from '@/views/demo/MiniProfileDemoPage.vue';
import PostListItemDemoPage from '@/views/demo/PostListItemDemoPage.vue';

const routes = [
    { path: '/', component: HomeView },
    { path: '/demo/button', component: ButtonDemoPage },
    { path: '/demo/mini-profile', component: MiniProfileDemoPage },
    { path: '/demo/post-list-item', component: PostListItemDemoPage}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;