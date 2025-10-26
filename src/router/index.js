
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import ButtonDemoPage from '@/views/demo/ButtonDemoPage.vue'
import DateButtonDemoPage from '@/views/demo/DateButtonDemoPage.vue'
import PostCountDemoPage from '@/views/demo/PostCountDemoPage.vue'
import MiniProfileDemoPage from '@/views/demo/MiniProfileDemoPage.vue'
import PostListItemDemoPage from '@/views/demo/PostListItemDemoPage.vue'
import FooterDemoPage from '@/views/demo/FooterDemoPage.vue'
import SelectDemoPage from '@/views/demo/SelectDemoPage.vue'
import TabMenuDemoPage from '@/views/demo/TabMenuDemoPage.vue'
import PageIndicatorDemoPage from '@/views/demo/PageIndicatorDemoPage.vue'
import MarkdownEditorDemoPage from '@/views/demo/MarkdownEditorDemoPage.vue'
import CommonTestView from '@/views/demo/CommonTestView.vue'
import BannerDemoPage from '@/views/demo/BannerDemoPage.vue';
import CommentDemoPage from '@/views/demo/CommentDemoPage.vue';
import TwoButtonPopupDemo from '@/views/demo/TwoButtonPopupDemo.vue';
import OneButtonPopupDemo from '@/views/demo/OneButtonPopupDemo.vue';
import RoadmapListItemDemoPage from '@/views/demo/RoadmapListItemDemoPage.vue';
import AlgoPostListItemDemoPage from '@/views/demo/AlgoPostListItemDemoPage.vue';
import AlgoMainView from '@/views/AlgoMainView.vue';
import AlgoQuizDemoPage from '@/views/demo/AlgoQuizDemoPage.vue';
import AlgoQuizView from '@/views/AlgoQuizView.vue';

const routes = [
  // 기본 홈
  { path: '/', component: HomeView },

  // 데모 페이지 라우트 (main 브랜치)
  { path: '/demo/button', component: ButtonDemoPage },
  { path: '/demo/date-button', component: DateButtonDemoPage },
  { path: '/demo/post-count', component: PostCountDemoPage },
  { path: '/demo/mini-profile', component: MiniProfileDemoPage },
  { path: '/demo/post-list-item', component: PostListItemDemoPage },
  { path: '/demo/footer', component: FooterDemoPage },
  { path: '/demo/select', component: SelectDemoPage },
  { path: '/demo/tab', component: TabMenuDemoPage },
  { path: '/demo/page', component: PageIndicatorDemoPage },
  { path: '/demo/markdown', component: MarkdownEditorDemoPage },
  { path: '/common-test', name: 'CommonTest', component: CommonTestView },
  { path: '/demo/infobanner', component: BannerDemoPage },
  { path: '/demo/comment', component: CommentDemoPage },
  { path: '/demo/twobuttonpopup', component: TwoButtonPopupDemo },
  { path: '/demo/onebuttonpopup', component: OneButtonPopupDemo},
  { path: '/demo/roadmap/:roadmapId', component: RoadmapListItemDemoPage},
  { path: '/demo/roadmap', redirect: '/demo/roadmap/1'},
  { path: '/demo/algo-post-list-item', component: AlgoPostListItemDemoPage },
  { path: '/demo/algo/quiz', component: AlgoQuizDemoPage },

  // 알고리즘 학습 라우트
  { path: '/algorithm/roadmap/:roadmapId', component: AlgoMainView},
  { path: '/algorithm/roadmap', redirect: '/algorithm/roadmap/1'},
  { path: '/algorithm', redirect: '/algorithm/roadmap/1'},
  { path: '/algorithm/post/:postId/quiz/:quizId', component: AlgoQuizView},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
