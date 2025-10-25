import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ButtonDemoPage from '@/views/demo/ButtonDemoPage.vue';
import BannerDemoPage from '@/views/demo/BannerDemoPage.vue';
import MiniProfileDemoPage from '@/views/demo/MiniProfileDemoPage.vue';
import CommentDemoPage from '@/views/demo/CommentDemoPage.vue';
import TwoButtonPopupDemo from '@/views/demo/TwoButtonPopupDemo.vue';
import OneButtonPopupDemo from '@/views/demo/OneButtonPopupDemo.vue';

const routes = [
    { path: '/', component: HomeView },
    { path: '/demo/button', component: ButtonDemoPage },
    { path: '/demo/infobanner', component: BannerDemoPage },
    { path: '/demo/mini-profile', component: MiniProfileDemoPage },
    { path: '/demo/comment', component: CommentDemoPage },
    { path: '/demo/twobuttonpopup', component: TwoButtonPopupDemo },
    { path: '/demo/onebuttonpopup', component: OneButtonPopupDemo},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;