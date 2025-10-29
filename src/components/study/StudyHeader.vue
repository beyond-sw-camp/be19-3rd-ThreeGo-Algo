<template>
  <header class="header-bar">
      <!-- 왼쪽 로고 -->
      <div class="logo-section" @click="goHome">
          <img src="@/assets/images/study_blog_logo.png" alt="logo" class="logo-icon" />
      </div>

      <!-- 가운데 메뉴 -->
      <nav class="nav-menu">
          <RouterLink v-for="item in menuItems" :key="item.label" :to="item.path" class="nav-item"
              active-class="active">
              {{ item.label }}
          </RouterLink>
      </nav>

      <!-- 오른쪽 유저 영역 -->
      <div class="user-section">
          <template v-if="isLoggedIn">
              <MyProfileDropdown :userName="nickname" :rankName="rankName" @mypage="goMyPage"
                  @logout="handleLogout" />
          </template>

          <template v-else>
              <RouterLink to="/login" class="login-btn">로그인</RouterLink>
          </template>
      </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MyProfileDropdown from '@/components/common/MyProfileDropdown.vue'
import coreApi from '@/api/coreApi'

const router = useRouter()
// 사용자 정보
const isLoggedIn = ref(true)
const nickname = ref('')
const rankName = ref('')
const memberId = ref('')

// 스터디 정보
const studyId = ref(null)
const isLeader = ref(false)

onMounted(async () => {
    const token = localStorage.getItem('accessToken')
    const name = localStorage.getItem('nickname')
    const rank = localStorage.getItem('rank')
    const id = localStorage.getItem('memberId')

    if (token) {
        isLoggedIn.value = true
        nickname.value = name || '사용자'
        rankName.value = rank || '코알못'
        memberId.value = id || '0'
    }

    await checkLeaderStatus();
})




const menuItems = computed(() => {
  const baseMenus = [
    { label: '홈', path: '/study/home' },
    { label: '게시판', path: '/study/board' }
  ]

  if (isLeader.value) {
    baseMenus.push({ label: '설정', path: '/study/settings/member' })
  }

  return baseMenus
})

// ✅ 스터디장 여부 확인
const checkLeaderStatus = async () => {
  try {
    studyId.value = localStorage.getItem('studyId')

    if (!studyId.value) {
      console.warn('⚠️ studyId가 없습니다.')
      return
    }

    // 스터디 멤버 정보 조회
    const response = await coreApi.get(`/study/${studyId.value}/members`)
    const members = response.data
    console.log('📋 스터디 멤버 목록:', members)
    console.log('👤 현재 memberId:', memberId.value)

    // 현재 사용자가 LEADER인지 확인
    const currentUserMember = members.find(m => m.memberId === Number(memberId.value))
    console.log('🔍 현재 사용자 멤버 정보:', currentUserMember)

    isLeader.value = currentUserMember.role === 'LEADER'

    console.log('👑 스터디장 여부:', isLeader.value)
  } catch (error) {
    console.error('❌ 스터디장 확인 실패:', error)
    console.error('❌ 에러 상세:', error.response?.data)
    isLeader.value = false
  }
}

// Blog 로고 클릭 시 마이페이지 스터디 목록으로 이동
const goHome = () => {
  router.push('/mypage/study')
}

// 마이페이지 이동
const goMyPage = () => {
  console.log('➡️ 마이페이지 이동')
  router.push('/mypage/dashboard')
}

const handleLogout = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('nickname')
  localStorage.removeItem('memberId')
  localStorage.removeItem('rankName')
  localStorage.removeItem('studyId')

  isLoggedIn.value = false

  window.dispatchEvent(new Event('auth-change'))

  router.push('/')
}
</script>

<style scoped>
.header-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 80px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  font-family: 'Pretendard', sans-serif;
}

.logo-section {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo-icon {
  width: 80px;
}

.nav-menu {
  display: flex;
  gap: 200px;
}

.nav-item {
  font-size: 17px;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  transition: color 0.2s;
}

.nav-item:hover {
  color: #0aa2eb;
}

.nav-item.active {
  color: #0aa2eb;
  font-weight: 600;
}

.user-section {
  display: flex;
  align-items: center;
}

.login-btn {
  color: #0aa2eb;
  text-decoration: none;
  font-weight: 600;
}

:global(body) {
  padding-top: 70px;
}
</style>
