<template>
  <div class="member-list-item">
    <div class="member-select">
      <input
        type="radio"
        name="selectedMember"
        :value="no"
        v-model="selectedMember"
      />
      <span class="member-no">{{ displayNo }}</span>
    </div>
    
    <div class="mini-profile">
      <img :src="rankImage" :alt="rankName" class="mini-profile-img" />
      <span>{{ nickname }}</span>
    </div>
    
    <span class="member-rank">{{ rankName }}</span>
    
    <StudyRole :variant="role" />
  </div>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue'
import { rankImages } from '@/constants/rankImages.js'
import StudyRole from './StudyRole.vue'

const props = defineProps({
  no: {
    type: Number,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  rankName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    validator: (value) => ['member', 'leader', 'invalid'].includes(value)
  }
})

const selectedMember = ref(null)

const rankImage = computed(() => rankImages[props.rankName])
const displayNo = computed(() => props.no)
</script>

<style scoped>
.member-list-item {
  display: flex;
  align-items: center;
  gap: 100px;
  width: 100%;
  padding: 16px 24px;
  border-bottom: 1px solid #EFEFEF;
  box-sizing: border-box;
}

.member-select {
  display: flex;
  align-items: center;
  gap: 70px;
  min-width: 60px;
  flex-shrink: 0;
}

.member-select input[type="radio"] {
  accent-color: #007bff;
  width: 16px;
  height: 16px;
  cursor: pointer;
  margin: 0;
}

.member-no {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  width: 30px;
  text-align: center;
}

.mini-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-family: 'Noto Sans KR';
  min-width: 100px;
  flex-shrink: 0;
}

.mini-profile-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
}

.member-rank {
  font-size: 14px;
  color: #383838;
  min-width: 100px;
  text-align: center;
  flex-shrink: 0;
}
</style>