<template>
  <el-dropdown trigger="click" class="profile-dropdown" popper-class="my-profile-popper">
    <span class="el-dropdown-link">
      <MiniProfile :nickname="userName" :rankName="rankName" />
    </span>

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
  <el-dialog v-model="logoutDialog" :title="logoutDialogTitle" width="320px">
    <span>{{ logoutDialogMessage }}</span>
    <template #footer>
      <el-button @click="logoutDialog = false">취소</el-button>
      <el-button type="danger" @click="handleLogout">확인</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import MiniProfile from '@/components/common/MiniProfile.vue'

const props = defineProps({
  userName: {
    type: String,
    default: ''
  },
  rankName: {
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

const handleMyPage = () => emit('mypage')
const openLogoutModal = () => (logoutDialog.value = true)
const handleLogout = () => {
  logoutDialog.value = false
  emit('logout')
}
</script>

<style scoped>
.profile-dropdown {
  cursor: pointer;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
}

.el-dropdown-menu .el-dropdown-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 14px;
}

.mypage-icon,
.logout-icon {
  width: 16px;
}
</style>
