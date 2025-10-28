<template>
  <div class="study-setting-page">
    <!-- 좌측 사이드바 -->
    <aside class="sidebar">
      <StudyProfile 
          nickname="알코알라"
          rankName="코신"
          role="leader"/>
      <StudySetting :userRole="userRole" :currentRoute="currentRoute" />
    </aside>

    <!-- 메인 컨텐츠 -->
    <main class="main-content">
      <!-- 상단 안내 배너 -->
      <PageInfoBanner
        title="스터디원 관리"
        subtitle="멤버를 스터디에서 제외하거나, 스터디장 권한을 다른 멤버에게 위임할 수 있습니다."
        :image="bannerBoard"
        bgColor="#F0FAFF"
      />

      <!-- 멤버 리스트 -->
      <div class="member-list">
        <div class="table-header">
          <div class="col checkbox"></div>
          <div class="col no">NO</div>
          <div class="col nickname">닉네임</div>
          <div class="col rank">등급</div>
          <div class="col role">권한</div>
        </div>

        <div class="member-items">
          <MemberList
            v-for="(member, index) in members"
            :key="member.id"
            :no="index + 1"
            :nickname="member.nickname"
            :rankName="member.rank"
            :role="getRoleVariant(member.role)"
            :selected="selectedMember === member.id"
            @click="selectMember(member.id)"
          />
        </div>
      </div>

      <!-- 하단 버튼 -->
      <div class="actions">
        <CustomButton @click="delegateRole">권한 위임</CustomButton>
        <CustomButton variant="danger" @click="removeMember">스터디에서 제외</CustomButton>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import PageInfoBanner from '@/components/common/PageInfoBanner.vue'
import MemberList from '@/components/study/MemberList.vue'
import StudyProfile from '@/components/study/StudyProfile.vue'
import StudySetting from '@/components/study/StudySetting.vue'
import bannerBoard from '@/assets/images/study_blog_banner_board.png'

const route = useRoute()

const userRole = ref('leader')
const currentRoute = computed(() => route.path)

const members = ref([
  { id: 1, nickname: '알코알라', rank: '코알못', role: 'leader' },
  { id: 2, nickname: '라이언', rank: '코뉴비', role: 'member' },
  { id: 3, nickname: '제이지', rank: '코좀알', role: 'member' },
  { id: 4, nickname: '무지', rank: '코잘알', role: 'member' },
  { id: 5, nickname: '춘식이', rank: '코뉴비', role: 'member' },
  { id: 6, nickname: '어피치', rank: '코잘알', role: 'invalid' },
])

const selectedMember = ref(null)
const selectMember = (id) => (selectedMember.value = id)

const delegateRole = () => {
  if (!selectedMember.value) return alert('권한을 위임할 멤버를 선택해주세요!')
  alert('권한이 성공적으로 위임되었습니다!')
}

const removeMember = () => {
  if (!selectedMember.value) return alert('제외할 멤버를 선택해주세요!')
  alert('스터디에서 멤버가 제외되었습니다!')
}

const getRoleVariant = (role) => {
  if (role === 'leader') return 'leader'
  if (role === 'invalid') return 'invalid'
  return 'member'
}
</script>
<style scoped>
.study-setting-page {
  display: flex;
  gap: 40px;
  padding: 40px 80px;
}

.sidebar {
  width: 200px;
  margin-left: 150px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-content {
  width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.member-list {
  background: #fff;
  border: 1px solid #dbf4ff;
  border-radius: 12px;
  overflow: hidden;
  width: 800px;
  margin: 0 auto;
}

.table-header {
  display: flex;
  align-items: center;
  background: #f8faff;
  font-weight: 600;
  font-size: 14px;
  color: #555;
  border-bottom: 2px solid #dbf4ff;
  padding: 12px 20px;
}

.table-header .col {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.table-header .col.checkbox {
  width: 40px;
  justify-content: flex-start;
  margin-right: 20px;
}

.table-header .col.no {
  width: 60px;
  justify-content: center;
  margin-right: 60px;
}

.table-header .col.nickname {
  flex: 1;
  min-width: 200px;
  justify-content: flex-start;
  margin-left: 80px;
}

.table-header .col.rank {
  width: 190px;
  justify-content: flex-start;
}

.table-header .col.role {
  width: 90px;
  justify-content: flex-start;
}

.member-items {
  display: flex;
  flex-direction: column;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  width: 800px;
  margin: 0 auto;
}
</style>