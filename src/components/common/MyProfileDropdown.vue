<template>
  <el-dropdown trigger="click" class="profile-dropdown" popper-class="my-profile-popper" ref="dropdownRef">
    <span class="el-dropdown-link">
      <MiniProfile :nickname="userName" :rankName="rankName" />
    </span>

    <template #dropdown>
      <el-dropdown-menu>
        <!-- 마이페이지 -->
        <el-dropdown-item @click="handleMyPage">
          <img src="@/assets/icons/myicon.svg" alt="mypage" class="mypage-icon" />
          <span>{{ myPageText }}</span>
        </el-dropdown-item>

        <!-- 로그아웃 -->
        <el-dropdown-item divided @click="openLogoutPopup">
          <img src="@/assets/icons/logout.svg" alt="logout" class="logout-icon" />
          <span>{{ logoutText }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <TwoButtonPopup v-model="logoutPopupVisible" title="로그아웃" subtitle="로그아웃 하시겠습니까?" confirmText="확인" cancelText="취소"
    cancelVariant="gray2" @confirm="confirmLogout" />
</template>

<script setup>
import { ref } from 'vue'
import MiniProfile from '@/components/common/MiniProfile.vue'
import TwoButtonPopup from '@/components/common/TwoButtonPopup.vue'

const props = defineProps({
  userName: { type: String, default: '' },
  rankName: { type: String, default: '' },
  myPageText: { type: String, default: '마이페이지' },
  logoutText: { type: String, default: '로그아웃' },
})

const emit = defineEmits(['mypage', 'logout'])

const dropdownRef = ref(null)
const logoutPopupVisible = ref(false)

const handleMyPage = () => {
  emit('mypage')
  dropdownRef.value?.handleClose()
}

const openLogoutPopup = () => {
  logoutPopupVisible.value = true
  dropdownRef.value?.handleClose()
}

const confirmLogout = () => {
  logoutPopupVisible.value = false
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