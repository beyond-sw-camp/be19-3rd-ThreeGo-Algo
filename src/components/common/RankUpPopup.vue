<template>
  <OneButtonCommonPopup
    v-model="isVisible"
    title="축하합니다!"
    subtitle="새로운 등급으로 승급하셨습니다 🎉"
    image="/src/assets/images/level_up1_1.png"
    confirmText="확인"
    confirmVariant="primary"
    :showCancel="false"
    @confirm="handleConfirm"
  />
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'
import OneButtonCommonPopup from '@/components/common/OneButtonPopup.vue'

const props = defineProps({
  visible: Boolean,
  rankName: String,
})

const emit = defineEmits(['update:visible'])

// 내부 상태 관리 (v-model 동기화)
const isVisible = ref(props.visible)

watch(
  () => props.visible,
  (val) => {
    isVisible.value = val
  }
)

watch(isVisible, (val) => {
  emit('update:visible', val)
})

// 팝업 확인 버튼 클릭 시
const handleConfirm = () => {
  isVisible.value = false
}
</script>

<style scoped>
/* 필요 시 추가적인 팝업 애니메이션 또는 오버레이 효과 */
</style>
