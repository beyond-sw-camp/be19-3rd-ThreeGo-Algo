<template>
  <div class="study-card" @click="handleCardClick">
    <h3 class="study-name">{{ name }}</h3>
    <p class="study-date">{{ startDate }} ~ {{ endDate }}</p>
    
    <div class="study-footer">
      <MiniProfile 
        :nickname="nickname"
        :rankName="rankName"
      />
      
      <EmojiText type="grayPeople" :count= "memberCount"/>

    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import MiniProfile from '../common/MiniProfile.vue'
import EmojiText from '../common/EmojiText.vue'

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  name: {
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
  },
  nickname: {
    type: String,
    required: true
  },
  rankName: {
    type: String,
    required: true
  },
  memberCount: {
    type: Number,
    required: true
  }
})

const handleCardClick = () => {
  const url = `${window.location.origin}/study/home?id=${props.id}`
  window.open(url, '_blank')
}
</script>

<style scoped>
.study-card {
  width: 270px;
  height: 170px;
  background: white;
  border: 1px solid #D9D9D9;
  border-radius: 16px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.study-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.study-name {
  font-size: 18px;
  font-weight: 700;
  color: #383838;
  margin: 0 0 8px 0;
}

.study-date {
  font-size: 12px;
  color: #838383;
  margin: 0 0 auto 0;
}

.study-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.member-count {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #838383;
}
</style>