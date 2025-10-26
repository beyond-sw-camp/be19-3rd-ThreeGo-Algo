<template>
  <div class="warning-box" :style="{ borderColor: color }">
    <div class="title-section">
      <div class="bar" :style="{ backgroundColor: color }"></div>
      <h2 class="title">{{ title }}</h2>
    </div>

    <div class="content-section">
      <slot name="content"></slot>
    </div>

    <div class="button-section" v-if="showButton">
      <CustomButton 
        :variant="buttonVariant"
        height="sm" 
        @click="handleAction"
      >
        {{ buttonText }}
      </CustomButton>
    </div>
  </div>
</template>

<script setup>
import CustomButton from '@/components/common/CustomButton.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#FF2B2B'
  },
  buttonVariant: {
    type: String,
    default: 'danger'
  },
  buttonText: {
    type: String,
    default: '확인'
  },
  showButton: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['action'])

const handleAction = () => {
  emit('action')
}
</script>

<style scoped>
.warning-box {
  border: 2px solid;
  border-radius: 8px;
  padding: 32px;
  font-family: 'Noto Sans KR';
}

.title-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.bar {
  width: 4px;
  height: 28px;
  border-radius: 2px;
}

.title {
  font-size: 20px;
  font-weight: 700;
  color: #000;
  margin: 0;
}

.content-section {
  margin-bottom: 32px;
}

.content-section :deep(p) {
  font-size: 16px;
  font-weight: 400;
  color: #000;
  line-height: 1.6;
  margin: 0 0 16px 0;
}

.content-section :deep(.highlight-danger) {
  color: #FF2B2B;
  font-weight: 700;
}

.content-section :deep(.highlight-primary) {
  color: #00A7E1;
  font-weight: 700;
}

.button-section {
  display: flex;
  justify-content: flex-end;
}
</style>