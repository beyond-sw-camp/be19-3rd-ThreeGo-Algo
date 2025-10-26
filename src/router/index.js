
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
import StudyRecruitMain from '@/components/study-recruit/StudyRecruitMain.vue';
import StudyRecruitPost from '@/components/study-recruit/StudyRecruitPost.vue'
import StudyRecruitDetailPost from '@/components/study-recruit/StudyRecruitDetailPost.vue'
import StudyRecruitManage from '@/components/study-recruit/StudyRecruitManage.vue'

const routes = [
  // 기본 홈
  { path: '/', component: HomeView },

  // 스터디 모집
  { path: '/study-recruit', name: 'StudyRecruit', component: StudyRecruitMain },
  { path: '/study-recruit/post', name: 'StudyRecruitPost', component: StudyRecruitPost },
  { path: '/study-recruit/:id', name: 'StudyRecruitDetail', component: StudyRecruitDetailPost },
  { path: '/study-recruit/manage/:id', name: 'StudyRecruitManage', component: StudyRecruitManage },

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

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
