<template>
  <OneButtonPopup
    v-model="isVisible"
    title="스터디 그룹이 만들어졌어요!"
    subtitle="축하합니다🎉 이제 함께 공부할 준비가 되었어요."
    confirm-text="스터디 그룹 공간 바로가기"
    @confirm="handleConfirm"
  />
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import OneButtonPopup from '@/components/common/OneButtonPopup.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  groupId: {
    type: [String, Number],
    default: null
  }
});

const emit = defineEmits(['update:modelValue', 'confirm']);

const router = useRouter();
const isVisible = ref(props.modelValue);

// props와 동기화
watch(() => props.modelValue, (val) => {
  isVisible.value = val;
});

watch(isVisible, (val) => {
  emit('update:modelValue', val);
});

const handleConfirm = () => {
  emit('confirm');
  
  // 스터디 그룹 페이지로 이동 (현재는 목록으로)
  if (props.groupId) {
    // 추후: router.push(`/study-group/${props.groupId}`);
    router.push('/study-recruit');
  } else {
    router.push('/study-recruit');
  }
};
</script>

<style scoped>
/* OneButtonPopup을 사용하므로 추가 스타일 불필요 */
</style>