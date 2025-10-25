<script setup>
import PageIndicator from '@/components/common/PageIndicator.vue'
import { ref, onMounted } from 'vue'

const totalItems = ref(50)
const currentPage = ref(1)

function fetchData(page) {
  console.log(`${page} 페이지 데이터 fetch 중..`)
}

function onPageChange(page) {
  fetchData(page)
}

onMounted(() => {
  fetchData(currentPage.value)
})
</script>

<template>
  <h1>Pagination 예시</h1>
  <PageIndicator
    :total="totalItems"
    v-model:current-page="currentPage"
    @page-change="onPageChange"
  />
</template>
