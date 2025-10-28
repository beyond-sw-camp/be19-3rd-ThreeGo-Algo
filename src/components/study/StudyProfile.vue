<template>
  <div class="rank-card">
    <div v-if="currentUser" class="rank-content">
      <div class="rank-image-container">
        <img :src="rankImage" :alt="currentUser.memberRank" class="mini-profile-img" />
        <img v-if="currentUser.role === 'LEADER'" src="@/assets/icons/crown.svg" alt="crown" class="crown-icon" />
      </div>
      
      <p class="nickname">{{ currentUser.memberNickname }}</p>
      
      <div class="role-badge">
        <StudyRole :variant="roleVariant" />
      </div>
    </div>
    <div v-else class="loading">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import StudyRole from '@/components/study/StudyRole.vue'
import { rankImages } from '@/constants/rankImages.js'
import coreApi from '@/api/coreApi'

const currentUser = ref(null)
const studyId = ref(null)

onMounted(async () => {
  studyId.value = localStorage.getItem('studyId')
  const nickname = localStorage.getItem('nickname')
  
  if (!studyId.value || !nickname) {
    return
  }

  try {
    const response = await coreApi.get(`/study/${studyId.value}/members`)
    const members = response.data
    
    // localStorage의 nickname과 일치하는 멤버 찾기
    currentUser.value = members.find(member => member.memberNickname === nickname)
    
    if (!currentUser.value) {
      console.error('일치하는 멤버를 찾을 수 없습니다.')
    }
  } catch (error) {
    console.error('멤버 정보 조회 실패:', error)
  }
}, )

const rankImage = computed(() => {
  if (!currentUser.value) return ''
  return rankImages[currentUser.value.memberRank] || ''
})

const roleVariant = computed(() => {
  if (!currentUser.value) return 'member'
  return currentUser.value.role === 'LEADER' ? 'leader' : 'member'
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

.rank-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
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