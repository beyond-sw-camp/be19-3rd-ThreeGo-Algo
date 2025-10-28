<template>
  <div class="after-apply-box">
    <!-- 완료 아이콘과 제목 -->
    <div class="header">
      <h2 class="title">
        스터디 신청 완료!
        <span class="emoji">🐶</span>
      </h2>
    </div>

    <!-- 안내 메시지 -->
    <div class="message-section">
      <p class="main-message">신청 내역을 확인 중이에요.</p>
      <p class="sub-message">
        승인되면 스터디 그룹 바로가기 버튼이 활성화됩니다.
        <br />
        마음이 바뀌셨다면 <button class="cancel-link" @click="handleCancel">신청 취소</button>를 눌러주세요.
      </p>
    </div>

    <!-- 확인 중 버튼 (비활성화) -->
    <CustomButton
      :disabled="true"
      variant="gray1"
      class="confirm-button"
    >
      신청 내역 확인 중...
    </CustomButton>

    <!-- 신청 취소 확인 팝업 -->
    <TwoButtonPopup
      v-if="showCancelPopup"
      title="신청을 취소하시겠습니까?"
      message="취소하면 다시 신청할 수 있습니다."
      confirmText="취소하기"
      cancelText="돌아가기"
      @confirm="confirmCancel"
      @cancel="closeCancelPopup"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CustomButton from '@/components/common/CustomButton.vue'
import TwoButtonPopup from '@/components/common/TwoButtonPopup.vue'

const emit = defineEmits(['cancel'])

const showCancelPopup = ref(false)

const handleCancel = () => {
  showCancelPopup.value = true
}

const confirmCancel = () => {
  showCancelPopup.value = false
  emit('cancel')
}

const closeCancelPopup = () => {
  showCancelPopup.value = false
}
</script>

<style scoped>
.after-apply-box {
  background-color: #fff;
  border: 1px solid #e4e4e4;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.header {
  display: flex;
  align-items: center;
}

.title {
  font-size: 22px;
  font-weight: 700;
  color: #222;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.emoji {
  font-size: 24px;
}

.message-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.main-message {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.sub-message {
  font-size: 14px;
  line-height: 1.6;
  color: #666;
  margin: 0;
}

.cancel-link {
  background: none;
  border: none;
  color: #ff5757;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 600;
  transition: color 0.2s ease;
}

.cancel-link:hover {
  color: #ff3333;
}

.confirm-button {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  background-color: #d4d4d4;
  color: ffffff;
  border: none;
  border-radius: 12px;
  cursor: not-allowed;
  opacity: 0.7;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .after-apply-box {
    padding: 20px;
  }

  .title {
    font-size: 20px;
  }

  .emoji {
    font-size: 22px;
  }

  .main-message {
    font-size: 15px;
  }

  .sub-message {
    font-size: 13px;
  }

  .confirm-button {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .after-apply-box {
    padding: 16px;
    gap: 16px;
  }

  .title {
    font-size: 18px;
  }

  .emoji {
    font-size: 20px;
  }

  .main-message {
    font-size: 14px;
  }

  .sub-message {
    font-size: 12px;
  }

  .cancel-link {
    font-size: 13px;
  }
}
</style>
