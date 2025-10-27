<template>
    <div class="study-roadmap-container">
      <div class="study-roadmap-title">
        <p>스터디 로드맵</p>
      </div>
  
      <div v-if="roadmaps.length > 0">
        <StudyRoadmapItem
          v-for="r in roadmaps"
          :key="r.roadmapId"
          :roadmap="r"
        />
      </div>
  
      <div v-else class="no-roadmap">
        로드맵이 없습니다.
      </div>
    </div>
  </template>
  
  <script setup>
  import StudyRoadmapItem from '@/components/study/StudyRoadmapItem.vue'
  
  const props = defineProps({
    roadmaps: {
      type: Array,
      required: true
    }
  })
  </script>
  
  <style scoped>
  .study-roadmap-container {
    border: 1px solid #DBF4FF;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
    width: 670px;
  
    /* ✅ 스크롤 처리 */
    height: 520px;
    overflow-y: auto;
    scrollbar-width: thin;
  
    display: flex;
    flex-direction: column;
  }
  
  .study-roadmap-title {
    border-left: 5px solid #0AA2EB;
  }
  
  .study-roadmap-title p {
    margin-left: 10px;
    font-size: 16px;
    font-weight: 600;
  }
  
  .no-roadmap {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #838383;
    font-size: 14px;
  }
  </style>
  