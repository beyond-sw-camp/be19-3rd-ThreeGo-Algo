import { createRouter, createWebHistory } from 'vue-router'

// 🏠 일반 사용자용 뷰 ------------------------
import NewHomeView from '@/views/home/HomePage.vue'
import AlgoTerms from '@/views/home/AlgoTerms.vue'
import OpensourceLicense from '@/views/home/OpenSourceLicense.vue'

// 💬 로그인 / 회원가입 ------------------------
import SignupPage from '@/views/login/SignupPage.vue'
import LoginPage from '@/views/login/LoginPage.vue'

// 📚 스터디 모집 -----------------------------
import StudyRecruitMain from '@/views/study-recruit/StudyRecruitMain.vue'
import StudyRecruitPost from '@/views/study-recruit/StudyRecruitPost.vue'
import StudyRecruitDetailPost from '@/views/study-recruit/StudyRecruitDetailPost.vue'
import StudyRecruitManage from '@/views/study-recruit/StudyRecruitManage.vue'
import CreateStudyGroup from '@/views/study-recruit/CreateStudyGroup.vue'

// 📖 스터디 -----------------------------
import StudyMainPage from '@/views/study/StudyMainPage.vue'
import StudyBoardPage from '@/views/study/StudyBoardPage.vue'
import StudySettingPage from '@/views/study/StudySettingPage.vue'
import StudyRoadmapManagePage from '@/views/study/StudyRoadmapManagePage.vue'
import StudyDeletePage from '@/views/study/StudyDeletePage.vue'
import StudyPostCreate from '@/views/study/StudyPostCreate.vue'
import StudyPostDetail from '@/views/study/StudyPostDetail.vue'

// 💼 기업별 정보 공유 ------------------------
import CareerInfoMainView from '@/views/career/CareerInfoMainView.vue'
import CareerPostCreate from '@/views/career/CareerPostCreate.vue'
import CareerPostDetail from '@/views/career/CareerPostDetail.vue'

// 💻 코딩 문제 / 풀이 ------------------------
import CodingProblemList from '@/views/coding/CodingProblemList.vue'
import CodingProblemDetail from '@/views/coding/CodingProblemDetail.vue'
import Codingpost from '@/views/coding/Codingpost.vue'
import CodingPostDetail from '@/views/coding/CodingPostDetail.vue'

// 🤖 알고리즘 학습 ------------------------
import AlgoMainView from '@/views/algo/AlgoMainView.vue'
import AlgoQuizView from '@/views/algo/AlgoQuizView.vue'
import AlgoPostView from '@/views/algo/AlgoPostView.vue'

// 👤 마이페이지 ------------------------
import MyStudyPage from '@/views/mypage/MyStudyPage.vue'
import MyDashboard from '@/views/mypage/MyDashboard.vue'

// 🧩 관리자(Admin) ------------------------
import AdminLayout from '@/views/admin/AdminLayout.vue'
import AdminLogin from '@/views/admin/AdminLogin.vue'
import AdminMemberManage from '@/views/admin/AdminMemberManage.vue'
import AdminCareerPostManage from '@/views/admin/AdminCareerPostManage.vue'
import AdminCareerCommentManage from '@/views/admin/AdminCareerCommentManage.vue'
import AdminCareerPostDetail from '@/views/admin/AdminCareerPostDetail.vue'

// ----------------------------------------
const routes = [
  // 🌿 기본 홈
  { path: '/', component: NewHomeView },
  { path: '/home', component: NewHomeView },
  { path: '/algo-terms', component: AlgoTerms },
  { path: '/open-source-license', component: OpensourceLicense },

  // 👥 스터디 모집
  { path: '/study-recruit', component: StudyRecruitMain, meta: { requiresAuth: true } },
  { path: '/study-recruit/post', component: StudyRecruitPost, meta: { requiresAuth: true } },
  { path: '/study-recruit/:postId', component: StudyRecruitDetailPost, meta: { requiresAuth: true } },
  { path: '/study-recruit/manage/:postId', component: StudyRecruitManage, meta: { requiresAuth: true } },
  { path: '/study-recruit/create-study', component: CreateStudyGroup, meta: { requiresAuth: true } },

  // 📘 스터디
  { path: '/study/home', component: StudyMainPage, meta: { requiresAuth: true } },
  { path: '/study/board', component: StudyBoardPage, meta: { requiresAuth: true } },
  { path: '/study/settings/member', component: StudySettingPage, meta: { requiresAuth: true } },
  { path: '/study/settings/roadmap', component: StudyRoadmapManagePage, meta: { requiresAuth: true } },
  { path: '/study/settings/delete', component: StudyDeletePage, meta: { requiresAuth: true } },
  { path: '/study/board/new', component: StudyPostCreate, meta: { requiresAuth: true } },
  { path: '/study/board/post/:id', component: StudyPostDetail, meta: { requiresAuth: true } },

  // 💼 기업별 정보 공유
  { path: '/career-info', component: CareerInfoMainView, meta: { requiresAuth: true } },
  { path: '/career-info/post', component: CareerPostCreate, meta: { requiresAuth: true } },
  { path: '/career-info/:postId', component: CareerPostDetail, meta: { requiresAuth: true } },

  // 💻 코딩 풀이
  { path: '/coding-problems', component: CodingProblemList, meta: { requiresAuth: true } },
  { path: '/coding-problems/:problemId/solutions', component: CodingProblemDetail, meta: { requiresAuth: true } },
  { path: '/coding-problems/:problemId/solutions/new', component: Codingpost, meta: { requiresAuth: true } },
  { path: '/coding-problems/:problemId/solutions/:solutionId', component: CodingPostDetail, meta: { requiresAuth: true } },

  // 🤖 알고리즘 학습
  { path: '/algorithm/roadmap/:roadmapId', component: AlgoMainView, meta: { requiresAuth: true } },
  { path: '/algorithm/post/:postId', component: AlgoPostView, meta: { requiresAuth: true } },
  { path: '/algorithm/post/:postId/quiz/:quizId', component: AlgoQuizView, meta: { requiresAuth: true } },
  { path: '/algorithm', redirect: '/algorithm/roadmap/1' },

  // 👤 마이페이지
  { path: '/mypage/study', component: MyStudyPage, meta: { requiresAuth: true } },
  { path: '/mypage/dashboard', component: MyDashboard, meta: { requiresAuth: true } },

  // 🔐 회원 관련 (로그인 불필요)
  { path: '/signup', component: SignupPage },
  { path: '/login', component: LoginPage },

  // 🧩 관리자 페이지
  { path: '/admin/login', component: AdminLogin },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: 'member', component: AdminMemberManage },
      { path: 'career-info/posts', component: AdminCareerPostManage },
      { path: 'career-info/comments', component: AdminCareerCommentManage },
      { path: 'career-info/posts/:id', component: AdminCareerPostDetail },
    ],
  },

  // 🚫 없는 페이지 처리
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

// ----------------------------------------
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// ✅ 인증 체크 (로그인 필요 페이지)
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
