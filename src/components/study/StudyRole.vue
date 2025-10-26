<template>
  <div :class="['badge', `badge-${variant}`]">
    {{ text }}
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'member',
    validator: (value) => ['member', 'leader', 'invalid'].includes(value)
  }
})

const BADGE_CONFIG = {
  member: '스터디원',
  leader: '스터디장',
  invalid: '참여불가'
}

const text = computed(() => BADGE_CONFIG[props.variant] || '')
</script>

<style scoped>
.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  border: 1px solid transparent;
}

.badge-member {
  border-color: #0AA2EB;
  background-color: #FDFEFF;
  color: #0AA2EB;
}

.badge-leader {
  border-color: #0AA2EB;
  background-color: #D5EFFC;
  color: #0AA2EB;
}

.badge-invalid {
  border-color: #FF2B2B;
  background-color: #FDFEFF;
  color: #FF2B2B;
}
</style>