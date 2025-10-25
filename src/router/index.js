import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ButtonDemoPage from '@/views/demo/ButtonDemoPage.vue';
import DateButtonDemoPage from '@/views/demo/DateButtonDemoPage.vue';
import PostCountDemoPage from '@/views/demo/PostCountDemoPage.vue';
import MiniProfileDemoPage from '@/views/demo/MiniProfileDemoPage.vue';
import PostListItemDemoPage from '@/views/demo/PostListItemDemoPage.vue';
import FooterDemoPage from '@/views/demo/FooterDemoPage.vue';
import SelectDemoPage from '@/views/demo/SelectDemoPage.vue';
import TabMenuDemoPage from '@/views/demo/TabMenuDemoPage.vue';
import PageIndicatorDemoPage from '@/views/demo/PageIndicatorDemoPage.vue';
import MarkdownEditorDemoPage from '@/views/demo/MarkdownEditorDemoPage.vue';

const routes = [
    { path: '/', component: HomeView },
    { path: '/demo/button', component: ButtonDemoPage },
    { path: '/demo/date-button', component: DateButtonDemoPage },
    { path: '/demo/post-count', component: PostCountDemoPage },
    { path: '/demo/mini-profile', component: MiniProfileDemoPage },
    { path: '/demo/post-list-item', component: PostListItemDemoPage },
    { path: '/demo/footer', component: FooterDemoPage },
    { path: '/demo/select', component: SelectDemoPage },
    { path: '/demo/tab', component: TabMenuDemoPage },
    { path: '/demo/page', component: PageIndicatorDemoPage },
    { path: '/demo/markdown', component: MarkdownEditorDemoPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;