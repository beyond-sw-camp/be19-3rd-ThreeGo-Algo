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
