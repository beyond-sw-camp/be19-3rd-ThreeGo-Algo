<template>
  <el-dropdown trigger="click" class="profile-dropdown" popper-class="my-profile-popper">
    <div class="el-dropdown-link">
      <img src="@/assets/icons/myicon.svg" alt="myinfo" class="my-information">
      <span class="ml-1">내 정보</span>
    </div>

    <template #dropdown>
      <el-dropdown-menu>
        <!-- 마이페이지 -->
        <el-dropdown-item @click="handleMyPage">
          <img src="@/assets/icons/myicon.svg" alt="mypage" class="mypage-icon">
          <span>{{ myPageText }}</span>
        </el-dropdown-item>

        <!-- 로그아웃 -->
        <el-dropdown-item divided @click="openLogoutModal">
          <img src="@/assets/icons/logout.svg" alt="logout" class="logout-icon" />
          <span>{{ logoutText }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <!-- 로그아웃 다이얼로그 -->
  <el-dialog
    v-model="logoutDialog"
    :title="logoutDialogTitle"
    width="320px"
  >
    <span>{{ logoutDialogMessage }}</span>
    <template #footer>
      <el-button @click="logoutDialog = false">취소</el-button>
      <el-button type="danger" @click="handleLogout">확인</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  userName: {
    type: String,
    default: ''
  },
  myPageText: {
    type: String,
    default: '마이페이지'
  },
  logoutText: {
    type: String,
    default: '로그아웃'
  },
  logoutDialogTitle: {
    type: String,
    default: '로그아웃 하시겠습니까?'
  },
  logoutDialogMessage: {
    type: String,
    default: '정말 로그아웃하시겠습니까?'
  }
})

const emit = defineEmits(['mypage', 'logout'])

const logoutDialog = ref(false)

const handleMyPage = () => {
  emit('mypage')
}

const openLogoutModal = () => {
  logoutDialog.value = true
}

const handleLogout = () => {
  logoutDialog.value = false
  emit('logout')
}
</script>

<style scoped>
.profile-dropdown {
  cursor: pointer;
  position: relative;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
  cursor: pointer;
}

.my-information {
  width: 24px;
  height: 24px;
}

.mypage-icon,
.logout-icon {
  width: 18px;
  height: 18px;
}
</style>

<style>
/* 전역 스타일로 드롭다운 메뉴 스타일 적용 */
.my-profile-popper {
  z-index: 3000 !important;
}

.my-profile-popper .el-dropdown-menu {
  min-width: 140px;
  padding: 4px 0;
}

.my-profile-popper .el-dropdown-menu__item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 14px;
}

.my-profile-popper .el-dropdown-menu__item:hover {
  background-color: #f5f7fa;
}
</style>
