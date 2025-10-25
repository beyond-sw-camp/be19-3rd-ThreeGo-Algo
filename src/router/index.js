import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import SelectDemoPage from '@/views/demo/SelectDemoPage.vue';
import TabMenuDemoPage from '@/views/demo/TabMenuDemoPage.vue';
import PageIndicatorDemoPage from '@/views/demo/PageIndicatorDemoPage.vue';
import MarkdownEditorDemoPage from '@/views/demo/MarkdownEditorDemoPage.vue';
const routes = [
    { path: '/', component: HomeView },
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