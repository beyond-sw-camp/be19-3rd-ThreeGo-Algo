<template>
  <div :class="['status-badge', { active: isActive }]">
    {{ isActive ? '진행 중' : '종료' }}
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.status-badge {
  display: inline-block;
  padding: 3px 15px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  color: white;
  background-color: #CFCFCF; 
}

.status-badge.active {
  background-color: #0AA2EB; 
}
</style>
