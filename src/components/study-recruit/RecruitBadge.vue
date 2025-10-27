<template>
  <span
    class="recruit-badge"
    :class="badgeClass"
  >
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
    validator: (v) => ['OPEN', 'CLOSED'].includes(v)
  }
})

const label = computed(() =>
  props.status === 'OPEN' ? '모집 중' : '모집 완료'
)

const badgeClass = computed(() =>
  props.status === 'OPEN' ? 'badge-open' : 'badge-closed'
)
</script>

<style scoped>
.recruit-badge {
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 12px;
  color: white;
  text-align: center;
  width: fit-content;
  white-space: nowrap;
}

.badge-open {
  background-color: #8dd8b2; /* 연한 초록 (모집 중) */
}

.badge-closed {
  background-color: #e4a2a2; /* 연한 빨강 (모집 완료) */
}
</style>
