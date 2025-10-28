<template>
  <div class="roadmap-item" :class="{ active: isActive }" @click="emit('click')">
    <div v-if="index > 8" class="roadmap-number">{{ index + 1 }}</div>
    <div v-else class="roadmap-number">0{{ index + 1 }}</div>
    <span class="roadmap-title">{{ title }}</span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  id: { type: Number, required: true },
  order: { type: Number, required: true },
  index: {type: Number, required: true},
  title: { type: String, required: true },
  isActive: { type: Boolean, default: false }
});

const emit = defineEmits(['click']);
</script>

<style scoped>
.roadmap-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 200px;
  height: 45px;
  padding: 0 14px;
  border-radius: 8px;
  background-color: #ffffff;
  cursor: pointer;
  font-size: 13px;
  color: #666666;
  font-weight: 500;
}

.roadmap-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #E3E3E3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.roadmap-item:hover {
  background-color: #f7f7f7;
  transition: background-color 0.2s;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.roadmap-item.active {
  background-color: #F0FAFF;
  border: 1px solid #94DBFF;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.roadmap-item.active .roadmap-number {
  background-color: #77cbf0;
  color: #383838;
}

.roadmap-title {
  width: 130px;
  overflow: hidden;  /* 텍스트가 넘칠 때 숨기기 */
  white-space: nowrap;  /* 텍스트를 한 줄로 유지 */
  text-overflow: ellipsis;  /* 넘친 텍스트에 대해 ... 표시 */
}

.roadmap-item.active .roadmap-title {
  color: #383838;
}
</style>