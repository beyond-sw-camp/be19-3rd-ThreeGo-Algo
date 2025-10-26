<template>
  <el-dialog
    v-model="visible"
    width="400px"
    class="common-popup"
    :show-close="false"
    align-center
  >

    <!-- 제목 -->
    <h2 class="popup-title">{{ title }}</h2>

    <!-- 이미지 -->
    <div v-if="image" class="popup-image">
      <img :src="image" alt="popup-image" />
    </div>

    <!-- 부제목 -->
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
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import CustomButton from '@/components/common/CustomButton.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  image: { type: String, default: '' },
  confirmText: { type: String, default: '확인' },
  cancelText: { type: String, default: '취소' },
  confirmVariant: { type: String, default: 'primary' },
  cancelVariant: { type: String, default: 'gray2' }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])
const visible = ref(props.modelValue)

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
  padding-bottom: 20px;
}

.popup-image {
  text-align: center;
  margin-bottom: 12px;
}

.popup-image img {
  width: 90px;
  height: auto;
}

.popup-title {
  font-weight: 600;
  font-size: 20px;
  margin: 8px 0;
  text-align: center;
}

.popup-subtitle {
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
}

.popup-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 12px;
  text-align: center;
}
</style>
