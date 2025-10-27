<template>
  <div class="study-setting-page">
    <!-- 좌측 사이드바 -->
    <aside class="sidebar">
      <StudyProfile />
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

      <!-- 멤버 테이블 -->
    <div class="member-table">
      <div class="table-header">
        <div class="col checkbox"></div>
        <div class="col no">NO</div>
        <div class="col nickname">닉네임</div>
        <div class="col rank">등급</div>
        <div class="col role">권한</div>
      </div>

      <div class="table-body">
        <div
          v-for="(member, index) in members"
          :key="member.id"
          class="table-row"
          :class="{ selected: selectedMember === member.id }"
          @click="selectMember(member.id)"
        >
          <div class="col checkbox">
            <input
              type="radio"
              :name="'member-select'"
              :checked="selectedMember === member.id"
              @click.stop="selectMember(member.id)"
            />
          </div>
          <div class="col no">{{ index + 1 }}</div>
          <div class="col nickname">
            <MiniProfile
              :nickname="member.nickname"
              :rankName="member.rank"
            />
          </div>
          <div class="col rank">{{ member.rank }}</div>
          <div class="col role">
            <StudyRole :variant="getRoleVariant(member.role)" />
          </div>
        </div>
      </div>
    </div>

      <!-- 하단 버튼 -->
      <div class="actions">
        <el-button type="primary" @click="delegateRole">권한 위임</el-button>
        <el-button type="danger" @click="removeMember">스터디에서 제외</el-button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import PageInfoBanner from '@/components/common/PageInfoBanner.vue'
import MiniProfile from '@/components/common/MiniProfile.vue'
import StudyProfile from '@/components/study/StudyProfile.vue'
import StudySetting from '@/components/study/StudySetting.vue'
import StudyRole from '@/components/study/StudyRole.vue'
import bannerBoard from '@/assets/images/study_blog_banner_board.png'

const route = useRoute()

// 사용자 역할 설정 (임시로 admin으로 설정, 실제로는 API에서 가져와야 함)
const userRole = ref('admin') // 'admin' 또는 'member'

// 현재 라우트 경로
const currentRoute = computed(() => route.path)

const members = ref([
  { id: 1, nickname: '알코알라', rank: '코알못', role: 'leader', avatar: '/src/assets/icons/koala.png' },
  { id: 2, nickname: '라이언', rank: '코뉴비', role: 'member', avatar: '/src/assets/icons/lion.png' },
  { id: 3, nickname: '제이지', rank: '코좀알', role: 'member', avatar: '/src/assets/icons/jay.png' },
  { id: 4, nickname: '무지', rank: '코잘알', role: 'member', avatar: '/src/assets/icons/muzi.png' },
  { id: 5, nickname: '춘식이', rank: '코뉴비', role: 'member', avatar: '/src/assets/icons/chun.png' },
  { id: 6, nickname: '어피치', rank: '코잘알', role: 'expelled', avatar: '/src/assets/icons/apeach.png' },
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
  if (role === 'expelled') return 'inactive'
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
  width: 240px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 테이블 */
.member-table {
  background: #fff;
  border: 1px solid #dbf4ff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
  width: 1022px;
  margin: 0 auto;
}

.table-header {
  display: flex;
  background: #f8faff;
  font-weight: 600;
  font-size: 14px;
  color: #555;
  border-bottom: 2px solid #dbf4ff;
  text-align: center;
  padding: 12px 20px;
}

.table-header .col {
  flex: 1;
}

.table-header .col.checkbox {
  flex: 0.2;
}

.table-header .col.no {
  flex: 0.3;
}

.table-body {
  display: flex;
  flex-direction: column;
}

.table-row {
  display: flex;
  align-items: center;
  text-align: center;
  padding: 10px 20px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;
  font-size: 14px;
}

.table-row:hover {
  background: #f0faff;
}

.table-row.selected {
  background: #e6f6ff;
  border-left: 4px solid #0aa2eb;
}

.table-row .col {
  flex: 1;
}

.table-row .col.checkbox {
  flex: 0.2;
}

.table-row .col.no {
  flex: 0.3;
}

.col.nickname {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

input[type="radio"] {
  cursor: pointer;
  width: 16px;
  height: 16px;
}

/* 버튼 영역 */
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  width: 1022px;
  margin: 0 auto;
}
</style>
