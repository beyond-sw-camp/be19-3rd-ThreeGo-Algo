<template>
  <div v-if="visible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-card">
      <h3>🎉 출석 완료!</h3>
      <img src="@/assets/images/success_koala.png" alt="success" class="success-img" />
      <p class="point-text">+ <span>1 포인트</span></p>
      <p class="sub-text">적립완료</p>
      <p class="message">오늘도 ALGO와 함께 한걸음 성장했어요 <span>⭐</span></p>
      <button class="confirm-btn" @click="closeModal">확인</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  visible: Boolean
})
const emits = defineEmits(['close'])

const closeModal = () => emits('close')
</script>

<style scoped>
/* 모달 전체 배경 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

/* 모달 카드 */
.modal-card {
  background: white;
  border-radius: 16px;
  width: 320px;
  text-align: center;
  padding: 28px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.3s ease;
}

h3 {
  font-weight: 700;
  font-size: 18px;
  color: #222;
  margin-bottom: 12px;
}

.success-img {
  width: 80px;
  margin: 10px 0;
}

.point-text {
  font-size: 15px;
  color: #555;
}
.point-text span {
  color: #ffb300;
  font-weight: 700;
}
.sub-text {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.message {
  font-size: 13px;
  color: #444;
  margin: 10px 0 20px;
}

.confirm-btn {
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}
.confirm-btn:hover {
  background-color: #1b7ed6;
}

/* 살짝 부드러운 fade-in 효과 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
