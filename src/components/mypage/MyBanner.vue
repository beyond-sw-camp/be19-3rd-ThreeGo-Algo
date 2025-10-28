<template>
  <div class="section-header-wrapper">
    <div class="section-header">
      <div class="title-bar"></div>
      <h2 class="section-title">{{ title }}</h2>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.section-header-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 50px;       
}

.section-header {
  width: 920px;
  height: 70px;
  background-color: #E7F8FF;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  gap: 12px;
  box-sizing: border-box;
}

.title-bar {
  width: 4px;
  height: 24px;
  background-color: #0AA2EB;
  flex-shrink: 0;
}

.section-title {
  font-size: 20px;
  font-weight: 400;
  color: black;
  margin: 0;
}
</style>
