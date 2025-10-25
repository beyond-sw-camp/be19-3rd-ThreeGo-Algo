<template>
  <el-input
    v-model="keyword"
    :placeholder="placeholder"
    prefix-icon="Search"
    clearable
    @keyup.enter="emitSearch"
  >
    <template #append>
      <el-button type="primary" @click="emitSearch">{{ buttonText }}</el-button>
    </template>
  </el-input>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  placeholder: {
    type: String,
    default: '검색어를 입력하세요'
  },
  buttonText: {
    type: String,
    default: '검색'
  },
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['search', 'update:modelValue'])

const keyword = ref(props.modelValue)

const emitSearch = () => {
  const trimmedKeyword = keyword.value.trim()
  emit('search', trimmedKeyword)
  emit('update:modelValue', trimmedKeyword)
}
</script>

<style scoped>
.custom-search-bar {
  width: 100%;
  max-width: 500px;
}

.custom-search-bar :deep(.el-input__wrapper) {
  border-radius: 25px;        /* 둥근 모서리 */
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