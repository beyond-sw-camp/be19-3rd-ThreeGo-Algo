
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import NewHomeView from '@/views/home/HomePage.vue'
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

import StudyRecruitMain from '@/views/study-recruit/StudyRecruitMain.vue';
import StudyRecruitPost from '@/views/study-recruit/StudyRecruitPost.vue'
import StudyRecruitDetailPost from '@/views/study-recruit/StudyRecruitDetailPost.vue'
import StudyRecruitManage from '@/views/study-recruit/StudyRecruitManage.vue'
import CreateStudyGroup from '@/views/study-recruit/CreateStudyGroup.vue'
import RoadmapListItemDemoPage from '@/views/demo/RoadmapListItemDemoPage.vue';
import AlgoPostListItemDemoPage from '@/views/demo/AlgoPostListItemDemoPage.vue';
import AlgoMainView from '@/views/algo/AlgoMainView.vue';
import AlgoQuizView from '@/views/algo/AlgoQuizView.vue';
import AlgoPostView from '@/views/algo/AlgoPostView.vue';
import CareerInfoMainView from '@/views/career/CareerInfoMainView.vue'
import CareerPostCreate from '@/views/career/CareerPostCreate.vue'
import CareerPostDetail from '@/views/career/CareerPostDetail.vue'

import SignupPage from '@/views/login/SignupPage.vue'
import InputDemoPage from '@/views/demo/InputDemoPage.vue'
import LoginPage from '@/views/login/LoginPage.vue'
import StudyRoadmapDemoPage from '@/views/demo/StudyRoadmapDemoPage.vue'


const routes = [
  // 기본 홈
  { path: '/', component: NewHomeView },
  { path: '/home', component: NewHomeView },

  // 스터디 모집
  { path: '/study-recruit', name: 'StudyRecruit', component: StudyRecruitMain },
  { path: '/study-recruit/post', name: 'StudyRecruitPost', component: StudyRecruitPost },
  { path: '/study-recruit/:id', name: 'StudyRecruitDetail', component: StudyRecruitDetailPost },
  { path: '/study-recruit/manage/:id', name: 'StudyRecruitManage', component: StudyRecruitManage },
  { path: '/study-recruit/create-study', name: 'CreateStudyGroup', component: CreateStudyGroup},
  
  // 기업별 정보 공유
  { path: '/career-info', component: CareerInfoMainView },
  { path: '/career-info/post', component: CareerPostCreate },
  { path: '/career-info/:id', component: CareerPostDetail },

  { path: '/signup', component: SignupPage },
  { path: '/login', component: LoginPage },



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
  { path: '/demo/onebuttonpopup', component: OneButtonPopupDemo },
  { path: '/demo/input', component: InputDemoPage },
  { path: '/demo/study/:studyId/roadmap', component: StudyRoadmapDemoPage }
  { path: '/demo/roadmap/:roadmapId', component: RoadmapListItemDemoPage},
  { path: '/demo/roadmap', redirect: '/demo/roadmap/1'},
  { path: '/demo/algo-post-list-item', component: AlgoPostListItemDemoPage },

  // 알고리즘 학습 라우트
  { path: '/algorithm/roadmap/:roadmapId', component: AlgoMainView},
  { path: '/algorithm/roadmap', redirect: '/algorithm/roadmap/1'},
  { path: '/algorithm', redirect: '/algorithm/roadmap/1'},
  { path: '/algorithm/post/:postId/quiz/:quizId', component: AlgoQuizView },
  { path: '/algorithm/post/:postId', component: AlgoPostView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
