<template>
  <div class="study-card">
    <img :src="imageSrc" :alt="title" class="study-image" />
    <div class="study-info">
      <h2 class="study-title">{{ title }}</h2>
      <div class="date-container">
        <span class="study-date">{{ startDate }} ~ {{ endDate }}</span>
        <StudyBadge :isActive="isActive" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import StudyBadge from './StudyBadge.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  }
})

const imageSrc = computed(() => {
  return  new URL(`../../assets/images/study_blog_banner_main.png`, import.meta.url).href
})

const isActive = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const start = new Date(props.startDate)
  start.setHours(0, 0, 0, 0)
  
  const end = new Date(props.endDate)
  end.setHours(0, 0, 0, 0)
  
  return today >= start && today <= end
})
</script>

<style scoped>
.study-card {
  display: flex;
  gap: 40px;
  align-items: center;
  padding: 20px;
  background: #F0FAFF;
  border-radius: 35px;
}

.study-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  opacity: 60%;
  margin-left: 80px;
}

.study-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.study-title {
  font-size: 26px;
  font-weight: bold;
  color: #383838;
  margin: 0;
}

.date-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.study-date {
  font-size: 16px;
  color: #838383;
}
</style>