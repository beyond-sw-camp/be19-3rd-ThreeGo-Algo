<template>
  <el-dialog
    v-model="visible"
    width="400px"
    class="common-popup"
    :show-close="false"
    align-center
  >
    <!-- 컨텐츠 영역 -->
    <div class="popup-content">
      <!-- 제목 (맨 위) -->
      <h2 class="popup-title">{{ title }}</h2>

      <!-- 이미지 배경 -->
      <div v-if="image" class="popup-background" :style="backgroundStyle"></div>

      <!-- 부제목 (배경 아래) -->
      <p v-if="subtitle" class="popup-subtitle">{{ subtitle }}</p>

      <!-- 버튼 영역 -->
      <div class="popup-buttons">
        <CustomButton
          :variant="confirmVariant"
          height="sm"
          @click="handleConfirm"
        >
          {{ confirmText }}
        </CustomButton>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import CustomButton from '@/components/common/CustomButton.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  image: { type: String, default: '' },
  imageSize: { type: String, default: 'contain' }, // 배경 이미지 크기
  imageHeight: { type: String, default: '150px' }, // 이미지 영역 높이
  confirmText: { type: String, default: '확인' },
  cancelText: { type: String, default: '취소' },
  confirmVariant: { type: String, default: 'primary' },
  cancelVariant: { type: String, default: 'gray2' }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])
const visible = ref(props.modelValue)

// 배경 이미지 스타일
const backgroundStyle = computed(() => ({
  backgroundImage: `url(${props.image})`,
  backgroundSize: props.imageSize,
  height: props.imageHeight
}))

// props <-> dialog v-model 동기화
watch(
  () => props.modelValue,
  (val) => (visible.value = val)
)
watch(visible, (val) => emit('update:modelValue', val))

const handleConfirm = () => {
  emit('confirm')
  visible.value = false
}

const handleCancel = () => {
  emit('cancel')
  visible.value = false
}
</script>

<style scoped>
.common-popup {
  text-align: center;
}

.common-popup :deep(.el-dialog__body) {
  padding: 24px;
}

.popup-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.popup-title {
  font-weight: 600;
  font-size: 20px;
  margin: 0 0 20px 0;
  text-align: center;
  color: #303133;
}

.popup-background {
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 20px;
}

.popup-subtitle {
  color: #666;
  font-size: 14px;
  margin: 0 0 20px 0;
  text-align: center;
  line-height: 1.6;
}

.popup-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>