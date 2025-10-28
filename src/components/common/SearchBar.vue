<template>
  <el-input
    v-model="keyword"
    :placeholder="placeholder"
    prefix-icon="Search"
    clearable
    @input="handleInput"
    @clear="handleClear"
  >
  </el-input>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  placeholder: {
    type: String,
    default: '검색어를 입력하세요'
  },
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['search', 'update:modelValue'])

const keyword = ref(props.modelValue)

// props.modelValue가 변경되면 keyword도 동기화
watch(() => props.modelValue, (newVal) => {
  keyword.value = newVal
})

const handleInput = () => {
  const trimmedValue = keyword.value.trim()
  emit('update:modelValue', trimmedValue)
  emit('search', trimmedValue)
}

const handleClear = () => {
  keyword.value = ''
  emit('update:modelValue', '')
  emit('search', '')
}
</script>

<style scoped>
.custom-search-bar {
  width: 100%;
  max-width: 500px;
}

.custom-search-bar :deep(.el-input__wrapper) {
  border-radius: 25px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  padding: 6px 14px;
  transition: box-shadow 0.2s ease;
}

.custom-search-bar :deep(.el-input__wrapper:hover) {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.custom-search-bar :deep(.el-input__inner) {
  font-size: 15px;
  font-family: 'Noto Sans KR', sans-serif;
}

.custom-search-bar :deep(.el-input__inner::placeholder) {
  color: #aaa;
  font-size: 14px;
}

.search-icon {
  color: #888;
  font-size: 14px;
}
</style>