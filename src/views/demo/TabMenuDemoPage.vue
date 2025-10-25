<script setup>
import TabMenu from '@/components/common/TabMenu.vue';

const options = [
  { value: 'all', label: '전체' },
  { value: 'progeammers', label: '프로그래머스' },
  { value: 'backjoon', label: '백준' },
  { value: 'leetcode', label: '리트코드' }
]

function handleSelect(item) {
  alert(`선택됨: ${item.label} (${item.value})`)
}
</script>

<template>
  <TabMenu :items="options" :onClick="handleSelect" class="tab-menu-container"/>
</template>

<style scoped>
.tab-menu-container {
  margin-left: 100px; 
  margin-top: 50px;  
}
</style>