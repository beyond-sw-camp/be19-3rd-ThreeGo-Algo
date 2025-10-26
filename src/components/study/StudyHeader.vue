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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MyProfileDropdown from '@/components/common/MyProfileDropdown.vue'

const router = useRouter()
const isLoggedIn = ref(true)

// 로그인 사용자 정보 예시
const nickname = ref('알코알라')
const rankName = ref('코알못')

// 메뉴 목록
const menuItems = [
  { label: '홈', path: '/study' },
  { label: '게시판', path: '/study/posts' },
  { label: '설정', path: '/study/settings' }
]

// 홈으로 이동
const goHome = () => {
  router.push('/study')
}

// 마이페이지 이동
const goMyPage = () => {
  console.log('➡️ 마이페이지 이동')
  router.push('/mypage')
}

// 로그아웃 처리
const handleLogout = () => {
  console.log('🚪 로그아웃 처리 완료')
  isLoggedIn.value = false
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
