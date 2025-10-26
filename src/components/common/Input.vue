<template>
  <el-input
    :model-value="props.modelValue"
    @input="handleInput"
    :style="{ width }"
    :placeholder="placeholder"
  >
    <template v-if="iconSrc" #prefix>
      <img :src="iconSrc" alt="icon" class="input-icon" />
    </template>
  </el-input>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  width: { type: String, default: '240px' },
  placeholder: { type: String, default: 'Please input' },
  icon: { type: String, default: '' },
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const handleInput = (value) => {
  emit('update:modelValue', value)
}

const iconSrc = computed(() => {
  if (!props.icon) return null
  try {
    return new URL(`../../assets/icons/${props.icon}`, import.meta.url).href
  } catch (e) {
    console.warn(`[Input.vue] 아이콘 로드 실패: ${props.icon}`)
    return null
  }
})
</script>
