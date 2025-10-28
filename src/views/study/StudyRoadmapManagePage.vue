<template>
  <div class="study-roadmap-manage-page">
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
      <!-- 상단 배너 -->
      <PageInfoBanner
        title="로드맵 및 마일스톤 관리"
        subtitle="스터디의 방향을 잡아줄 로드맵과 마일스톤을 등록, 수정, 삭제를 자유롭게 할 수 있습니다."
        :image="bannerBoard"
        bgColor="#F0FAFF"
      />

      <!-- 로드맵 등록 버튼 -->
      <div class="roadmap-header">
        <p class="header-text">💡 제목을 클릭하면 해당 로드맵의 마일스톤 목록 조회가 가능합니다!</p>
        <CustomButton @click="handleOpenRoadmapModal">+ 로드맵 등록</CustomButton>
      </div>

      <!-- 로드맵 리스트 -->
      <div class="roadmap-list">
        <div class="table-header">
          <div class="col checkbox"></div>
          <div class="col index">순서</div>
          <div class="col title">제목</div>
          <div class="col desc">설명</div>
          <div class="col created">생성일</div>
        </div>

        <div class="table-body">
          <div
            v-for="(item, index) in roadmaps"
            :key="item.id"
            class="table-row"
            :class="{ selected: selectedRoadmap === item.id }"
            @click="selectRoadmap(item.id)"
          >
            <div class="col checkbox">
              <input type="radio" name="selected" :checked="selectedRoadmap === item.id" />
            </div>
            <div class="col index">{{ index + 1 }}</div>
            <div class="col title clickable" @click.stop="showMilestonesAndSelect(item.id)">
              {{ item.title }}
            </div>
            <div class="col desc">{{ item.description }}</div>
            <div class="col created">{{ item.createdAt }}</div>
          </div>
        </div>
      </div>

      <!-- 하단 버튼 -->
      <div class="actions">
        <CustomButton @click="modifyRoadMap" height="sm">수정</CustomButton>
        <CustomButton variant="danger" @click="deleteRoadMap" height="sm">삭제</CustomButton>
      </div>

      <!-- 마일스톤 목록 (선택된 로드맵이 있을 때만 표시) -->
      <div v-if="showMilestoneList" class="milestone-section">
        <div class="milestone-header">
          <h3 class="milestone-title">{{ selectedRoadmapTitle }} - 마일스톤 목록</h3>
          <CustomButton @click="handleOpenMilestoneModal">+ 마일스톤 등록</CustomButton>
        </div>

        <div class="milestone-list">
          <div class="milestone-table-header">
            <div class="milestone-col checkbox"></div>
            <div class="milestone-col order">순서</div>
            <div class="milestone-col title">제목</div>
            <div class="milestone-col desc">설명</div>
            <div class="milestone-col date">생성일</div>
          </div>

          <div class="milestone-table-body">
            <div
              v-for="(milestone, index) in milestones"
              :key="milestone.id"
              class="milestone-row"
              :class="{ selected: selectedMilestone === milestone.id }"
              @click="selectMilestone(milestone.id)"
            >
              <div class="milestone-col checkbox">
                <input type="radio" name="selectedMilestone" :checked="selectedMilestone === milestone.id" />
              </div>
              <div class="milestone-col order">{{ index + 1 }}</div>
              <div class="milestone-col title">{{ milestone.title }}</div>
              <div class="milestone-col desc">{{ milestone.description }}</div>
              <div class="milestone-col date">{{ milestone.createdAt }}</div>
            </div>
          </div>
        </div>

        <!-- 마일스톤 하단 버튼 -->
        <div class="milestone-actions">
          <CustomButton @click="modifyMilestone" height="sm">수정</CustomButton>
          <CustomButton variant="danger" height="sm" @click="deleteMilestone">삭제</CustomButton>
        </div>
      </div>

      <!-- ✅ 모달: 항상 main의 마지막에 위치 -->
      <StudyModal
        v-if="showRoadmapModal"
        modalTitle="로드맵 등록"
        @close="handleCloseModal"
        @submit="handleSubmitRoadmap"
      />
      <StudyModal
        v-if="showMilestoneModal"
        modalTitle="마일스톤 등록"
        @close="handleCloseModal"
        @submit="handleSubmitMilestone"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import PageInfoBanner from '@/components/common/PageInfoBanner.vue'
import StudyProfile from '@/components/study/StudyProfile.vue'
import StudySetting from '@/components/study/StudySetting.vue'
import bannerBoard from '@/assets/images/study_blog_banner_setting.png'
import StudyModal from '@/components/study/StudyModal.vue'
import CustomButton from '@/components/common/CustomButton.vue'

const route = useRoute()
const userRole = ref('leader')
const currentRoute = computed(() => route.path)

const selectedRoadmap = ref(null)
const selectRoadmap = (id) => (selectedRoadmap.value = id)

const roadmaps = ref([
  { id: 1, title: '1주차 기업 분석', description: '카카오 기업분석', createdAt: '2025.10.13' },
  { id: 2, title: '2주차 자소서 작성', description: '각자 자소서 초안 작성', createdAt: '2025.10.13' },
  { id: 3, title: '3주차 CS 면접 대비', description: '운영체제, 네트워크 정리', createdAt: '2025.10.13' },
  { id: 4, title: '4주차 CS 면접 대비', description: '네트워크 복습', createdAt: '2025.10.13' },
  { id: 5, title: '5주차 카카오 상반기 모의면접', description: '코딩테스트 및 PT 면접', createdAt: '2025.10.13' },
])

// 마일스톤 상태
const showMilestoneList = ref(false)
const selectedRoadmapTitle = ref('')
const selectedMilestone = ref(null)
const milestones = ref([])

const selectMilestone = (id) => (selectedMilestone.value = id)
const showMilestonesAndSelect = (roadmapId) => {
  selectedRoadmap.value = roadmapId
  const roadmap = roadmaps.value.find(r => r.id === roadmapId)
  if (roadmap) {
    selectedRoadmapTitle.value = roadmap.title
    milestones.value = [
      { id: 1, title: '기업 리서치', description: '카카오 기업 조사 및 분석', createdAt: '2025.10.13' },
      { id: 2, title: '채용 공고 분석', description: '카카오 채용 공고 상세 분석', createdAt: '2025.10.14' },
      { id: 3, title: '면접 후기 수집', description: '카카오 면접 후기 정리', createdAt: '2025.10.15' },
      { id: 4, title: '발표 준비', description: '팀원들과 정보 공유', createdAt: '2025.10.16' },
    ]
    showMilestoneList.value = true
    selectedMilestone.value = null
  }
}

const showRoadmapModal = ref(false)
const showMilestoneModal = ref(false)

const handleOpenRoadmapModal = () => (showRoadmapModal.value = true)
const handleOpenMilestoneModal = () => (showMilestoneModal.value = true)
const handleCloseModal = () => {
  showRoadmapModal.value = false
  showMilestoneModal.value = false
}

const handleSubmitRoadmap = (data) => {
  console.log('📘 신규 로드맵 등록:', data)
  alert(`로드맵 등록 완료!\n제목: ${data.title}`)
  handleCloseModal()
}

const handleSubmitMilestone = (data) => {
  console.log('📍 신규 마일스톤 등록:', data)
  alert(`마일스톤 등록 완료!\n제목: ${data.title}`)
  handleCloseModal()
}
</script>


<style scoped>
.study-roadmap-manage-page {
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

/* 로드맵 상단 헤더 */
.roadmap-header {
  width: 1022px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-text {
  font-size: 14px;
  color: #444;
  margin-left: 4px;
}

.add-btn {
  background-color: #0aa2eb;
  border: none;
  font-weight: 600;
}

/* 테이블 리스트 */
.roadmap-list {
  width: 1022px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #dbf4ff;
  border-radius: 12px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.table-header {
  display: flex;
  background: #f8faff;
  font-weight: 700;
  color: #555;
  border-bottom: 2px solid #dbf4ff;
  padding: 12px 0;
}

.table-body {
  display: flex;
  flex-direction: column;
}

.table-row {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s;
}

.table-row:hover {
  background: #f0faff;
}

.table-row.selected {
  background: #e6f6ff;
  border-left: 4px solid #0aa2eb;
}

.col {
  flex: 1;
  text-align: center;
}

.col.checkbox {
  flex: 0.3;
}

.col.index {
  flex: 0.5;
}

.col.title {
  flex: 1.8;
  text-align: center;
  padding-left: 20px;
}

.col.title.clickable {
  cursor: pointer;
  color: #0aa2eb;
  text-decoration: underline;
  transition: color 0.2s;
}

.col.title.clickable:hover {
  color: #0880c7;
}

.col.desc {
  flex: 1.5;
  color: #777;
  text-align: center;
}

.col.created {
  flex: 1;
  color: #777;
}

/* 하단 버튼 */
.actions {
  width: 1022px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* 마일스톤 섹션 */
.milestone-section {
  width: 1022px;
  margin: 40px auto 0;
  padding-top: 40px;
  border-top: 2px solid #e0e0e0;
}

.milestone-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.milestone-header .milestone-title {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.milestone-list {
  background: #fff;
  border: 1px solid #dbf4ff;
  border-radius: 12px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.milestone-table-header {
  display: flex;
  background: #f8faff;
  font-weight: 700;
  color: #555;
  border-bottom: 2px solid #dbf4ff;
  padding: 12px 0;
}

.milestone-table-body {
  display: flex;
  flex-direction: column;
}

.milestone-row {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s;
}

.milestone-row:hover {
  background: #f0faff;
}

.milestone-row.selected {
  background: #e6f6ff;
  border-left: 4px solid #0aa2eb;
}

.milestone-col {
  flex: 1;
  text-align: center;
}

.milestone-col.checkbox {
  flex: 0.3;
}

.milestone-col.order {
  flex: 0.5;
}

.milestone-col.title {
  flex: 1.8;
  text-align: left;
  padding-left: 20px;
}

.milestone-col.desc {
  flex: 1.5;
  text-align: left;
}

.milestone-col.date {
  flex: 1;
}

.milestone-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
}
</style>
