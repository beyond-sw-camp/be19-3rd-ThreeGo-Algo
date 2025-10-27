<template>
  <div class="popup-demo-page">
    <h1>🧩 Common Popup Demo</h1>

    <!-- 팝업 열기 버튼 그룹 -->
    <div class="btn-group">
      <CustomButton variant="gray2" @click="openPopup('studyLeave')">스터디 탈퇴</CustomButton>
      <CustomButton variant="gray2" @click="openPopup('userLeave')">회원 탈퇴</CustomButton>
      <CustomButton variant="gray2" @click="openPopup('postDelete')">게시물 삭제</CustomButton>
      <CustomButton variant="gray2" @click="openPopup('postCreate')">게시물 등록 완료</CustomButton>
    </div>

    <!-- 스터디 탈퇴 팝업 -->
    <TwoButtonCommonPopup
      v-model="popup.studyLeave"
      title="스터디 탈퇴"
      subtitle="탈퇴 시 다시 복구할 수 없습니다."
      image="/src/assets/icons/studydanger.svg"
      confirmText="탈퇴하기"
      confirmVariant="danger"
      cancelText="취소"
      cancelVariant="gray2"
      @confirm="handleConfirm('스터디 탈퇴')"
    />

    <!-- 회원 탈퇴 팝업 -->
    <TwoButtonCommonPopup
      v-model="popup.userLeave"
      title="회원탈퇴"
      subtitle="모든 데이터가 삭제됩니다."
      image="/src/assets/icons/studydanger.svg"
      confirmText="탈퇴하기"
      confirmVariant="danger"
      cancelText="취소"
      cancelVariant="gray2"
      @confirm="handleConfirm('회원 탈퇴')"
    />

    <!-- 게시물 삭제 팝업 -->
    <TwoButtonCommonPopup
      v-model="popup.postDelete"
      title="게시물을 삭제하시겠습니까?"
      subtitle="삭제 후에는 되돌릴 수 없습니다."
      image="/src/assets/icons/studydanger.svg"
      confirmText="삭제"
      confirmVariant="danger"
      cancelText="취소"
      cancelVariant="gray2"
      @confirm="handleConfirm('게시물 삭제')"
    />

    <!-- 게시물 등록 완료 팝업 -->
    <TwoButtonCommonPopup
      v-model="popup.postCreate"
      title="게시물이 등록되었습니다!"
      subtitle="목록으로 이동하시겠습니까?"
      confirmText="확인"
      confirmVariant="primary"
      cancelText="닫기"
      cancelVariant="gray2"
      @confirm="handleConfirm('게시물 등록 완료')"
    />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import CustomButton from '@/components/common/CustomButton.vue'
import TwoButtonCommonPopup from '@/components/common/TwoButtonPopup.vue'

const popup = reactive({
  studyLeave: false,
  userLeave: false,
  postDelete: false,
  postCreate: false,
})

const openPopup = (key) => {
  popup[key] = true
}

const handleConfirm = (type) => {
  console.log(`[확인 클릭됨]: ${type}`)
}
</script>

<style scoped>
.popup-demo-page {
  padding: 40px;
  /* text-align: center; */
}

.btn-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
