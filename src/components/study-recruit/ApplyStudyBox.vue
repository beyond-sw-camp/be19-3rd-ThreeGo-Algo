<template>
  <div class="apply-study-box">
    <!-- 타이틀 -->
    <h2 class="title">스터디 신청하기</h2>

    <!-- 입력 영역 -->
    <div class="input-section">
      <textarea
        v-model="applicationText"
        class="application-textarea"
        placeholder="지원동기 또는 각오를 작성해주세요."
        :maxlength="maxLength"
        @input="handleInput"
      ></textarea>
      <div class="char-count">{{ applicationText.length }} / {{ maxLength }}</div>
    </div>

    <!-- 신청 버튼 (slot 방식으로 텍스트 전달) -->
    <CustomButton
      :disabled="isButtonDisabled"
      variant="primary"
      height="lg"
      class="apply-button"
      @click="handleApply"
    >
      + 스터디 신청하기
    </CustomButton>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CustomButton from '@/components/common/CustomButton.vue'

const props = defineProps({
  maxLength: {
    type: Number,
    default: 500
  }
})

const emit = defineEmits(['apply'])

const applicationText = ref('')

const isButtonDisabled = computed(() => {
  return applicationText.value.trim().length === 0
})

const handleInput = () => {
  // maxlength로 자동 제어
}

const handleApply = () => {
  if (!isButtonDisabled.value) {
    emit('apply', applicationText.value)
  }
}
</script>

<style scoped>
.apply-study-box {
  background-color: #fff;
  border: 1px solid #e4e4e4;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.title {
  font-size: 22px;
  font-weight: 700;
  color: #222;
  margin: 0;
}

.input-section {
  position: relative;
  display: flex;
  flex-direction: column;
}

.application-textarea {
  width: 100%;
  min-height: 150px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 14px;
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 1.6;
  resize: vertical;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.application-textarea:focus {
  outline: none;
  border-color: #4a9eff;
}

.application-textarea::placeholder {
  color: #aaa;
}

.char-count {
  margin-top: 8px;
  text-align: right;
  font-size: 13px;
  color: #888;
}

.apply-button {
  width: 100%;
  font-weight: 600;
  font-size: 16px;
  border-radius: 12px;
}

/* 반응형 */
@media (max-width: 768px) {
  .apply-study-box {
    padding: 20px;
  }
  .title {
    font-size: 20px;
  }
  .application-textarea {
    min-height: 120px;
  }
}

@media (max-width: 480px) {
  .apply-study-box {
    padding: 16px;
  }
  .title {
    font-size: 18px;
  }
}
</style>
