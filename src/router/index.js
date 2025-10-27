
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

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

import StudyDemoPage from '@/views/demo/StudyDemoPage.vue'
import StudyMainPage from '@/views/study/StudyMainPage.vue'
import StudyBoardPage from '@/views/study/StudyBoardPage.vue'
import StudySettingPage from '@/views/study/StudySettingPage.vue'
import StudyRoadmapDemoPage from '@/views/demo/StudyRoadmapDemoPage.vue'
import MyStudyPage from '@/views/mypage/MyStudyPage.vue'
import StudyPostCreate from '@/views/study/StudyPostCreate.vue'

import CodingProblemList from '@/views/coding/CodingProblemList.vue'
import CodingProblemDetail from '@/views/coding/CodingProblemDetail.vue'
import Codingpost from '@/views/coding/Codingpost.vue'
import CodingPostDetail from '@/views/coding/CodingPostDetail.vue'
import StudyPostDetail from '@/views/study/StudyPostDetail.vue'

import StudyRoadmapManagePage from '@/views/study/StudyRoadmapManagePage.vue'
import StudyDeletePage from '@/views/study/StudyDeletePage.vue'

const routes = [
  // 기본 홈
  { path: '/', component: NewHomeView },
  { path: '/home', component: NewHomeView },

  // 스터디 모집
  { path: '/study-recruit', name: 'StudyRecruit', component: StudyRecruitMain, meta: { requiresAuth: true } },
  { path: '/study-recruit/post', name: 'StudyRecruitPost', component: StudyRecruitPost, meta: { requiresAuth: true } },
  { path: '/study-recruit/:id', name: 'StudyRecruitDetail', component: StudyRecruitDetailPost, meta: { requiresAuth: true } },
  { path: '/study-recruit/manage/:id', name: 'StudyRecruitManage', component: StudyRecruitManage, meta: { requiresAuth: true } },
  { path: '/study-recruit/create-study', name: 'CreateStudyGroup', component: CreateStudyGroup, meta: { requiresAuth: true } },

  // 스터디
  { path: '/study/home', component: StudyMainPage, meta: { requiresAuth: true } },
  { path: '/study/board', component: StudyBoardPage, meta: { requiresAuth: true } },
  { path: '/study/settings', component: StudySettingPage, meta: { requiresAuth: true } },

  { path: '/study/settings/member', component: StudySettingPage, meta: { requiresAuth: true } },
  { path: '/study/settings/roadmap', component: StudyRoadmapManagePage, meta: { requiresAuth: true } },
  { path: '/study/settings/delete', component: StudyDeletePage, meta: { requiresAuth: true } },

  { path: '/study/board/new', component: StudyPostCreate, meta: { requiresAuth: true } },
  { path: '/study/board/post/:id', component: StudyPostDetail, meta: { requiresAuth: true } },

  // 기업별 정보 공유
  { path: '/career-info', component: CareerInfoMainView, meta: { requiresAuth: true } },
  { path: '/career-info/post', component: CareerPostCreate, meta: { requiresAuth: true } },
  { path: '/career-info/:id', component: CareerPostDetail, meta: { requiresAuth: true } },

  // 알고리즘 학습
  { path: '/algorithm/roadmap/:roadmapId', component: AlgoMainView, meta: { requiresAuth: true } },
  { path: '/algorithm/post/:postId/quiz/:quizId', component: AlgoQuizView, meta: { requiresAuth: true } },
  { path: '/algorithm/post/:postId', component: AlgoPostView, meta: { requiresAuth: true } },
  { path: '/algorithm/roadmap', redirect: '/algorithm/roadmap/1' },
  { path: '/algorithm', redirect: '/algorithm/roadmap/1' },

  // 코딩 풀이
  { path: '/coding-problems', component: CodingProblemList, meta: { requiresAuth: true }},
  { path: '/coding-problem/:problemId/solutions', component: CodingProblemDetail, meta: { requiresAuth: true }},
  { path: '/coding-problems/:problemId/solutions/new', component: Codingpost, meta: { requiresAuth: true }},
  { path: '/coding-problems/:problemId/solutions/:solutionId', component: CodingPostDetail, meta: { requiresAuth: true }},

  // 회원 관련 (로그인 불필요)
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
  { path: '/demo/study', component: StudyDemoPage },
  { path: '/demo/onebuttonpopup', component: OneButtonPopupDemo },
  { path: '/demo/input', component: InputDemoPage },
  { path: '/demo/study/:studyId/roadmap', component: StudyRoadmapDemoPage },
  { path: '/demo/roadmap/:roadmapId', component: RoadmapListItemDemoPage },
  { path: '/demo/roadmap', redirect: '/demo/roadmap/1' },
  { path: '/demo/algo-post-list-item', component: AlgoPostListItemDemoPage },

  // 알고리즘 학습 라우트
  { path: '/algorithm/roadmap/:roadmapId', component: AlgoMainView },
  { path: '/algorithm/roadmap', redirect: '/algorithm/roadmap/1' },
  { path: '/algorithm', redirect: '/algorithm/roadmap/1' },
  { path: '/algorithm/post/:postId/quiz/:quizId', component: AlgoQuizView },
  { path: '/algorithm/post/:postId', component: AlgoPostView },

  // 마이페이지 라우트
  { path: '/mypage/study', component: MyStudyPage },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('accessToken')

  // 로그인 필요한 페이지인데 토큰이 없는 경우
  if (to.meta.requiresAuth && !token) {
    if (confirm('로그인 후 이용 가능합니다. 로그인 페이지로 이동하시겠습니까?')) {
      next('/login')
    } else {
      next(false)
    }
    return
  }

  // 토큰 만료 여부 확인
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const now = Date.now() / 1000
      if (payload.exp && payload.exp < now) {
        alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.')
        localStorage.clear()
        return next('/login')
      }
    } catch (e) {
      console.warn('토큰 파싱 실패:', e)
      localStorage.clear()
      alert('로그인 정보가 올바르지 않습니다. 다시 로그인해주세요.')
      return next('/login')
    }
  }

  next()
})



export default router
