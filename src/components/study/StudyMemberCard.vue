<template>
  <div class="member-summary-card">
    <div class="card-header">
      <div class="header-text">
        <span class="header-title">참여 인원</span>
        <span class="member-count">({{ members.length }})</span>
      </div>
    </div>

    <div class="member-list">
      <div 
        v-for="member in members" 
        :key="member.id"
        class="member-row"
      >
        <MiniProfile 
          :nickname="member.nickname"
          :rankName="member.rankName"
        />
        <StudyRole :variant="member.role" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import MiniProfile from '../common/MiniProfile.vue'
import StudyRole from './StudyRole.vue'

defineProps({
  members: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.member-summary-card {
  width: 315px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow: hidden;
}

.card-header {
  margin-bottom: 20px;
  padding-left: 8px;
  border-left: 4px solid #0AA2EB;
}

.header-text {
  display: flex;
  align-items: center;
  gap: 4px;
}

.header-title {
  font-size: 18px;
  font-weight: 700;
  color: #333;
}

.member-count {
  font-size: 18px;
  font-weight: 700;
  color: #0AA2EB;
}

.member-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  max-height: 200px;
}

.member-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>