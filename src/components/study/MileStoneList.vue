<template>
  <div class="milestone-item">
    <div class="milestone-select">
      <input
        type="radio"
        name="selectedMilestone"
        :value="order"
        v-model="selectedMilestone"
      />
      <span class="milestone-order">{{ order }}</span>
    </div>

    <span class="milestone-title" @click="goToRoadmap">
      {{ title }}
    </span>

    <span class="milestone-description">{{ truncatedDescription }}</span>

    <span class="milestone-date">{{ date }}</span>
  </div>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue'
import { useRouter } from 'vue-router'  

const props = defineProps({
  order: Number,
  title: String,
  description: String,
  date: String,
  id: {           
    type: [String, Number],
    required: true
  }
})

const router = useRouter()
const selectedMilestone = ref(null)

const truncatedDescription = computed(() => {
  return props.description.length > 8
    ? props.description.substring(0, 8) + '...'
    : props.description
})

const goToRoadmap = () => {
  router.push(`/study/settings/roadmap/${props.id}`)
}
</script>

<style scoped>
.milestone-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 24px;
  border-bottom: 1px solid #EFEFEF;
  box-sizing: border-box;
  font-size: 16px;
}

.milestone-select {
  display: flex;
  align-items: center;
  gap: 70px;
  min-width: 100px;
}

.milestone-title {
  flex: 2;
  text-align: center;
  font-weight: 500;
  text-decoration: underline;
  cursor: pointer;
  min-width: 40%;
  transition: color 0.2s;
}

.milestone-title:hover {
  color: #007bff; 
}

.milestone-description {
  flex: 3;
  text-align: center;
  color: #666;
}

.milestone-date {
  flex: 2;
  text-align: right;
  color: #383838;
}

.milestone-select input[type="radio"] {
  accent-color: #007bff;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.milestone-order {
  font-weight: 500;
  color: #383838;
}
</style>
