<template>
  <div class="demo-container">
    <h1>StudyRole 배지 예시</h1>

    <section class="demo-section">
      <h2>모든 배지 한눈에 보기</h2>
      <div class="badge-group">
        <StudyRole variant="member" />
        <StudyRole variant="admin" />
        <StudyRole variant="invalid" />
      </div>

      <HomeBanner 
        title="카카오 면접 대비 스터디"
        startDate="2025.10.21"
        endDate="2025.10.28"
      />

      <MileStoneList
        :order="1"
        title="1주차 기업 분석"
        description="카카오기업문화와 비전 탐구하기"
        date="2025.10.13"
      />

      

      <StudyMemberCard :members="members" />
      <StudyBoardCard :posts="posts" />

      <div class="member-list">
        <MemberList
          v-for="member in sortedMembers"
          :key="member.id"
          :no="member.no"
          :nickname="member.nickname"
          :rankName="member.rankName"
          :role="member.role"
        />
      </div>

      <div class="user-list">
        <!-- 스터디장 (admin) -->
        <StudyProfile 
          nickname="알코알라"
          rankName="코신"
          role="admin"
        />

        <!-- 일반 멤버 -->
        <StudyProfile 
          nickname="코딩마스터"
          rankName="코알못"
          role="member"
        />

      </div>

      <div>
        <button @click="showModal = true">마일스톤 등록</button>

        <StudyModal 
          v-if="showModal"
          modal-title="마일스톤 등록"
          :title="milestoneData.title"
          :order="milestoneData.order"
          :description="milestoneData.description"
          @close="showModal = false"
          @submit="handleSubmit"
        />
      </div>

      <!-- Warning 컴포넌트를 사용하려면 아래 주석 해제 -->
      <Warning />

      <CloseStudy
        title="해체 전 꼭 확인하세요!"
        color="#FF2B2B"
        button-variant="danger"
        button-text="스터디 해체하기"
        @action="handleDissolve"
      >
        <template #content>
          <p>
            스터디원 없이 스터디장만 남아 있을 때 삭제할 수 있습니다.<br />
            <strong>다른 멤버가 남아 있다면 먼저 스터디원을 제외해주세요.</strong>
          </p>
          <p>
            스터디를 해체하면 현재 진행 중인
            <span class="highlight-danger">로드맵, 마일스톤, 스터디원 정보</span>가 모두 삭제됩니다.<br />
            <span class="highlight-danger">복구 불가</span>하므로 신중하게 결정해주세요.
          </p>
        </template>
      </CloseStudy>

      <CloseStudy 
        title="스터디 탈퇴를 원하시나요?"
        color="#00A7E1"
        button-variant="primary"
        button-text="권한 위임"
        @action="handleDelegate"
      >
        <template #content>
          <p class="highlight-primary">
            스터디장은 권한 위임 없이는 탈퇴할 수 없습니다.
          </p>
          <p>
            탈퇴 전 반드시 <span class="highlight-primary">다른 멤버에게 스터디장 권한을 위임</span>해야 합니다.<br />
            권한 위임이 완료되면 일반 멤버로 전환되며, 이후 스터디 탈퇴가 가능합니다.
          </p>
          <p>
            권한 위임은 <span class="highlight-primary">스터디원 관리 페이지</span>에서 가능합니다.
          </p>
        </template>
      </CloseStudy> 
    </section>

    <StudySetting :userRole="'admin'" />
    <StudyBadge :isActive="false" />
  </div>
</template>

<script setup>
import CloseStudy from '@/components/study/CloseStudy.vue'
import StudyModal from '@/components/study/StudyModal.vue'
import StudyRole from '@/components/study/StudyRole.vue'
import StudyProfile from '@/components/study/StudyProfile.vue'
import MemberList from '@/components/study/MemberList.vue'/* Warning 컴포넌트를 사용할 경우 import 주석 해제 */
import Warning from '@/components/study/Warning.vue'
import { ref, computed } from 'vue'
import StudySetting from '@/components/study/StudySetting.vue'
import StudyBadge from '@/components/study/StudyBadge.vue'
import MileStoneList from '@/components/study/MileStoneList.vue'
import HomeBanner from '@/components/study/HomeBanner.vue'
import StudyMemberCard from '@/components/study/StudyMemberCard.vue'
import StudyBoardCard from '@/components/study/StudyBoardCard.vue'

const members = ref([
  { id: 1, nickname: '코알못', rankName: '코알못', role: 'member' },
  { id: 2, nickname: '알코알라', rankName: '코신', role: 'admin' },
  { id: 3, nickname: '개발왕', rankName: '코좀알', role: 'member' },
  { id: 4, nickname: '참여못함', rankName: '코좀알', role: 'invalid' }
])


const posts = [
  { id: 1, title: '[공지] 스터디원끼리 매너를 지킵시다 제발', date: '2025.10.21' },
  { id: 2, title: 'CS 공부 너무 어려워요 짜증나요!', date: '2025.10.23' },
  // { id: 3, title: '지인이 알려준 면접 꿀팁!', date: '2025.10.23' },
  // { id: 4, title: '인재상 같이 분석해요!', date: '2025.10.24' },
  // { id: 5, title: '카카오 최신 기사 모음집입니다.', date: '2025.10.24' }
]


const sortedMembers = computed(() => {
  const sorted = [...members.value].sort((a, b) => {
    if (a.role === 'admin') return -1
    if (b.role === 'admin') return 1
    return 0
  })
  
  return sorted.map((member, index) => ({
    ...member,
    no: index + 1
  }))
})

const showModal = ref(false)
const milestoneData = ref({
  title: '',
  order: '',
  description: ''
})

const handleSubmit = (data) => {
  console.log('제출된 데이터:', data)
  // API 호출 등 처리
  showModal.value = false
}

const handleDissolve = () => {
  console.log('스터디 해체')
}

const handleDelegate = () => {
  console.log('권한 위임 페이지로 이동')
}
</script>

<style scoped>
.demo-container {
  padding: 40px;
  font-family: 'Noto Sans KR', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 40px;
  color: #333;
}

h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #555;
}

.demo-section {
  margin-bottom: 40px;
  padding: 24px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.badge-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.highlight-danger {
  color: #FF2B2B;
  font-weight: 700;
}

.highlight-primary {
  color: #00A7E1;
  font-weight: 700;
}
</style>