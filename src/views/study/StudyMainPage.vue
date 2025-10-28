<template>
  <div class="study-home">
    <div class="banner">
      <HomeBanner 
        v-if="title"
        :title="title"
        :description="description"
        :startDate="startDate"
        :endDate="endDate"
      />
    </div>
    
    <div class="content-layout">
      <div class="left-section">
        <StudyRoadmap :roadmaps="roadmaps" />
      </div>
      
      <div class="right-section">
        <StudyMemberCard :members="formattedMembers" />
        <StudyBoardCard :posts="formattedPosts" />
      </div>
    </div>
  </div>
</template>

<script setup>
import HomeBanner from '@/components/study/HomeBanner.vue';
import StudyRoadmap from '@/components/study/StudyRoadmap.vue';
import StudyBoardCard from '@/components/study/StudyBoardCard.vue';
import StudyMemberCard from '@/components/study/StudyMemberCard.vue';
import { onMounted, ref, computed } from 'vue'
import coreApi from '@/api/coreApi';

const studyId = ref(null)
const title = ref('')
const description = ref('')
const startDate = ref('')
const endDate = ref('')
const roadmaps = ref([])
const boardPosts = ref([])
const members = ref([])

const formattedPosts = computed(() => {
  return boardPosts.value.map(post => ({
    id: post.id,
    title: post.title,
    date: post.createdAt.split(' ')[0] 
  }))
})

const formattedMembers = computed(() => {
  return members.value.map(member => {
    let role = 'member'
    if (member.role === 'LEADER') role = 'leader'
    
    return {
      id: member.id,
      nickname: member.memberNickname,
      rankName: member.memberRank,
      role: role
    }
  })
})

onMounted(async () => {
  studyId.value = sessionStorage.getItem('studyId')
    
  if (studyId.value) {
    try {
      // 1. 스터디 기본 정보 가져오기
      const studyResponse = await coreApi.get(`/study/${studyId.value}`)
      const studyData = studyResponse.data
      
      title.value = studyData.name
      description.value = studyData.description
      startDate.value = studyData.startDate
      endDate.value = studyData.endDate
      
      console.log('Study Data:', studyData)
      
      // 2. 로드맵 목록 가져오기
      const roadmapsResponse = await coreApi.get(`/study/${studyId.value}/roadmaps`)
      const roadmapList = roadmapsResponse.data
      
      console.log('Roadmap List:', roadmapList)
      
      // 3. 각 로드맵의 상세 정보 가져오기
      const roadmapPromises = roadmapList.map(async (roadmap) => {
        const roadmapDetailResponse = await coreApi.get(`/study/roadmaps/${roadmap.id}`)
        const roadmapDetail = roadmapDetailResponse.data
        
        return {
          roadmapId: roadmapDetail.roadmapId,
          roadmapTitle: roadmapDetail.roadmapTitle,
          roadmapDescription: roadmapDetail.roadmapDescription,
          order: roadmap.order,
          milestones: roadmapDetail.milestones.map(milestone => ({
            milestoneId: milestone.milestoneId,
            milestoneTitle: milestone.milestoneTitle,
            milestoneDescription: milestone.milestoneDescription
          }))
        }
      })
      
      roadmaps.value = await Promise.all(roadmapPromises)
      roadmaps.value.sort((a, b) => b.order - a.order)
      
      console.log('Roadmaps:', roadmaps.value)
      
      // 4. 게시판 목록 가져오기 
      const postsResponse = await coreApi.get(`/study/${studyId.value}/posts`, {
        params: {
          page: 0,
          size: 4
        }
      })
      boardPosts.value = postsResponse.data
      
      console.log('Board Posts:', boardPosts.value)
      
      // 5. 스터디 멤버 목록 가져오기
      const membersResponse = await coreApi.get(`/study/${studyId.value}/members`)
      members.value = membersResponse.data
      
      console.log('Members:', members.value)
      
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
})
</script>

<style scoped>
.study-home {
  max-width: 1022px;
  margin: 0 auto;
}

.banner {
  margin-bottom: 30px;
}

.content-layout {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.left-section {
  flex: 1;
  min-width: 0;
}

.right-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>