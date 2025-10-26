<template>
  <div class="rank-card">
    <div class="rank-image-container">
      <img :src="rankImage" :alt="props.rankName" class="mini-profile-img" />
      <img v-if="props.role === 'admin'" src="@/assets/icons/crown.svg" alt="crown" class="crown-icon" />
    </div>
    
    <p class="nickname">{{ props.nickname }}</p>
    
    <div class="role-badge">
      <StudyRole :variant="roleVariant" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import StudyRole from '@/components/study/StudyRole.vue'
import { rankImages } from '@/constants/rankImages.js'

const props = defineProps({
  nickname: {
    type: String,
    required: true
  },
  rankName: {
    type: String,
    required: true,
    validator: (value) => Object.keys(rankImages).includes(value)
  },
  role: {
    type: String,
    default: 'member',
    validator: (value) => ['admin', 'member'].includes(value)
  }
})

const rankImage = computed(() => rankImages[props.rankName])

const roleVariant = computed(() => {
  if (props.role === 'admin') {
    return 'admin'
  }
  return 'member'
})
</script>

<style scoped>
.rank-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  font-family: 'Noto Sans KR';
  gap: 8px;
}

.rank-image-container {
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mini-profile-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #FDD835;
}

.crown-icon {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  object-fit: contain;
  z-index: 1;
}

.nickname {
  font-size: 16px;
  font-weight: 600;
  color: #000;
  margin: 0;
  text-align: center;
}

.role-badge {
  display: flex;
  justify-content: center;
  margin-top: 4px;
}
</style>