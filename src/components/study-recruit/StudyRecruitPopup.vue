<template>
  <div v-if="isVisible" class="popup-overlay" @click.self="closePopup">
    <div class="popup-container">
      <div class="popup-content">
        <!-- 제목 -->
        <h2 class="popup-title">{{ title }}</h2>
        
        <!-- 설명 -->
        <p class="popup-description" v-html="description"></p>
        
        <!-- 버튼 -->
        <CustomButton
          :text="buttonText"
          variant="primary"
          size="lg"
          @click="handleButtonClick"
          class="popup-button"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CustomButton from '@/components/common/CustomButton.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    required: true
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const isVisible = ref(props.modelValue)

// modelValue 변경 감지
watch(() => props.modelValue, (newVal) => {
  isVisible.value = newVal
})

const closePopup = () => {
  isVisible.value = false
  emit('update:modelValue', false)
}

const handleButtonClick = () => {
  emit('confirm')
  closePopup()
}
</script>

<script>
import { watch } from 'vue'
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.popup-container {
  background: white;
  border-radius: 16px;
  padding: 32px 24px 24px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.popup-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.popup-title {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.popup-description {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #666;
  margin: 0 0 24px 0;
  line-height: 1.6;
  white-space: pre-line;
}

.popup-button {
  width: 100%;
  margin-top: 8px;
}

/* 반응형 디자인 */
@media (max-width: 480px) {
  .popup-container {
    padding: 28px 20px 20px;
  }
  
  .popup-title {
    font-size: 18px;
  }
  
  .popup-description {
    font-size: 13px;
  }
}
</style>