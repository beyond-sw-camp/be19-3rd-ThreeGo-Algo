<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  total: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['page-change', 'update:currentPage'])  

const currentPage = ref(props.currentPage)  

function handlePageChange(page) {
  emit('page-change', page)
  emit('update:currentPage', page) 
}

watch(() => props.total, () => {
  currentPage.value = 1
  emit('update:currentPage', 1)
})
</script>

<template>

    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="10"
      :pager-count="4"
      v-model:current-page="currentPage"
      @current-change="handlePageChange"
    />

</template>

<style scoped>
:deep(.el-pager li) {
  font-family: 'Noto Sans KR';
  font-size: 14px;
  color: #383838;
}
</style>