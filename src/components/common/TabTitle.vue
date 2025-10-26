<template>
  <h1 class="tab-title">{{ title }}</h1>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.tab-title {
  width: 1022px;
  margin: 0 auto;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 35px;
  font-weight: bold;
  color: #222;
  margin-bottom: 24px;
  letter-spacing: -0.5px;
}
</style>
