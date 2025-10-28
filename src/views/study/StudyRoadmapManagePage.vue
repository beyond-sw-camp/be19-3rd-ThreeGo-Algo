<template>
  <div class="study-roadmap-manage-page">
    <!-- 좌측 사이드바 -->
    <aside class="sidebar">
      <StudyProfile />
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
            <div class="col index">{{ item.order }}</div>
            <div class="col title clickable" @click.stop="showMilestonesAndSelect(item.id)">
              {{ item.title }}
            </div>
            <div class="col desc">{{ item.description }}</div>
            <div class="col created">{{ formatDate(item.createdAt) }}</div>
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
              :key="milestone.milestoneId"
              class="milestone-row"
              :class="{ selected: selectedMilestone === milestone.milestoneId }"
              @click="selectMilestone(milestone.milestoneId)"
            >
              <div class="milestone-col checkbox">
                <input type="radio" name="selectedMilestone" :checked="selectedMilestone === milestone.milestoneId" />
              </div>
              <div class="milestone-col order">{{ index + 1 }}</div>
              <div class="milestone-col title">{{ milestone.milestoneTitle }}</div>
              <div class="milestone-col desc">{{ milestone.milestoneDescription }}</div>
              <div class="milestone-col date">-</div>
            </div>
          </div>
        </div>

        <!-- 마일스톤 하단 버튼 -->
        <div class="milestone-actions">
          <CustomButton @click="modifyMilestone" height="sm">수정</CustomButton>
          <CustomButton variant="danger" height="sm" @click="deleteMilestone">삭제</CustomButton>
        </div>
      </div>

      <!-- 모달 -->
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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PageInfoBanner from '@/components/common/PageInfoBanner.vue'
import StudyProfile from '@/components/study/StudyProfile.vue'
import StudySetting from '@/components/study/StudySetting.vue'
import bannerBoard from '@/assets/images/study_blog_banner_setting.png'
import StudyModal from '@/components/study/StudyModal.vue'
import CustomButton from '@/components/common/CustomButton.vue'
import coreApi from '@/api/coreApi'

const route = useRoute()
const userRole = ref('leader')
const currentRoute = computed(() => route.path)

const studyId = ref(null)
const roadmaps = ref([])
const selectedRoadmap = ref(null)

// 마일스톤 상태
const showMilestoneList = ref(false)
const selectedRoadmapTitle = ref('')
const selectedMilestone = ref(null)
const milestones = ref([])

// 모달 상태
const showRoadmapModal = ref(false)
const showMilestoneModal = ref(false)

onMounted(async () => {
  studyId.value = localStorage.getItem('studyId')

  if (!studyId.value) {
    console.error('studyId가 없습니다.')
    return
  }

  await fetchRoadmaps()
})

// 날짜 포맷 함수
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  // "2025-10-28 15:29:03" -> "2025.10.28"
  return dateStr.split(' ')[0].replace(/-/g, '.')
}

// 로드맵 목록 조회
const fetchRoadmaps = async () => {
  try {
    const response = await coreApi.get(`/study/${studyId.value}/roadmaps`)
    roadmaps.value = response.data
    console.log('로드맵 목록:', roadmaps.value)
  } catch (error) {
    console.error('로드맵 목록 조회 실패:', error)
    alert('로드맵을 불러올 수 없습니다.')
  }
}

// 마일스톤 목록 조회
const fetchMilestones = async (roadmapId) => {
  try {
    const response = await coreApi.get(`/study/roadmaps/${roadmapId}`)
    const data = response.data
    
    // 응답에서 milestones 배열 추출
    milestones.value = data.milestones || []
    
    // 로드맵 제목도 업데이트 (응답에서 가져온 정확한 제목)
    if (data.roadmapTitle) {
      selectedRoadmapTitle.value = data.roadmapTitle
    }
    
    console.log('마일스톤 목록:', milestones.value)
  } catch (error) {
    console.error('마일스톤 목록 조회 실패:', error)
    alert('마일스톤을 불러올 수 없습니다.')
  }
}

// 로드맵 선택
const selectRoadmap = (id) => {
  selectedRoadmap.value = id
}

// 마일스톤 선택
const selectMilestone = (id) => {
  selectedMilestone.value = id
}

// 로드맵 제목 클릭 시 마일스톤 표시
const showMilestonesAndSelect = async (roadmapId) => {
  selectedRoadmap.value = roadmapId
  await fetchMilestones(roadmapId)
  showMilestoneList.value = true
  selectedMilestone.value = null
}

// 로드맵 수정
const modifyRoadMap = () => {
  if (!selectedRoadmap.value) {
    alert('수정할 로드맵을 선택해주세요!')
    return
  }
  console.log('로드맵 수정:', selectedRoadmap.value)
  // TODO: 로드맵 수정 모달 또는 페이지로 이동
}

// 로드맵 삭제
const deleteRoadMap = async () => {
  if (!selectedRoadmap.value) {
    alert('삭제할 로드맵을 선택해주세요!')
    return
  }

  if (!confirm('정말로 이 로드맵을 삭제하시겠습니까?')) {
    return
  }

  try {
    await coreApi.delete(`/study/${studyId.value}/roadmaps/${selectedRoadmap.value}`)
    alert('로드맵이 삭제되었습니다!')
    
    // 목록 새로고침
    await fetchRoadmaps()
    selectedRoadmap.value = null
    showMilestoneList.value = false
  } catch (error) {
    console.error('로드맵 삭제 실패:', error)
    alert('로드맵 삭제에 실패했습니다.')
  }
}

// 마일스톤 수정
const modifyMilestone = () => {
  if (!selectedMilestone.value) {
    alert('수정할 마일스톤을 선택해주세요!')
    return
  }
  console.log('마일스톤 수정:', selectedMilestone.value)
  // TODO: 마일스톤 수정 모달 또는 페이지로 이동
}

// 마일스톤 삭제
const deleteMilestone = async () => {
  if (!selectedMilestone.value) {
    alert('삭제할 마일스톤을 선택해주세요!')
    return
  }

  if (!confirm('정말로 이 마일스톤을 삭제하시겠습니까?')) {
    return
  }

  try {
    await coreApi.delete(`/study/${studyId.value}/roadmaps/${selectedRoadmap.value}/milestones/${selectedMilestone.value}`)
    alert('마일스톤이 삭제되었습니다!')
    
    // 마일스톤 목록 새로고침
    await fetchMilestones(selectedRoadmap.value)
    selectedMilestone.value = null
  } catch (error) {
    console.error('마일스톤 삭제 실패:', error)
    alert('마일스톤 삭제에 실패했습니다.')
  }
}

// 모달 열기/닫기
const handleOpenRoadmapModal = () => {
  showRoadmapModal.value = true
}

const handleOpenMilestoneModal = () => {
  if (!selectedRoadmap.value) {
    alert('마일스톤을 등록할 로드맵을 먼저 선택해주세요!')
    return
  }
  showMilestoneModal.value = true
}

const handleCloseModal = () => {
  showRoadmapModal.value = false
  showMilestoneModal.value = false
}

// 로드맵 등록
const handleSubmitRoadmap = async (data) => {
  try {
    await coreApi.post(`/study/roadmap/${studyId.value}/roadmaps`, {
      title: data.title,
      description: data.description,
      order: data.order
    })
    
    alert(`로드맵 등록 완료!\n제목: ${data.title}`)
    await fetchRoadmaps()
    handleCloseModal()
  } catch (error) {
    console.error('로드맵 등록 실패:', error)
    alert('로드맵 등록에 실패했습니다.')
  }
}

// 마일스톤 등록
const handleSubmitMilestone = async (data) => { 
  try {
    await coreApi.post(`/study/roadmaps/${selectedRoadmap.value}/milestones`, {
      title: data.title,
      description: data.description,
      order: 1
    })
    
    alert(`마일스톤 등록 완료!\n제목: ${data.title}`)
    await fetchMilestones(selectedRoadmap.value)
    handleCloseModal()
  } catch (error) {
    console.error('마일스톤 등록 실패:', error)
    alert('마일스톤 등록에 실패했습니다.')
  }
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
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.roadmap-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 800px;
}

.header-text {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.roadmap-list {
  background: #fff;
  border: 1px solid #dbf4ff;
  border-radius: 12px;
  overflow: hidden;
  width: 800px;
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
}

.table-header .col.index {
  width: 60px;
  justify-content: center;
}

.table-header .col.title {
  flex: 1;
  min-width: 200px;
}

.table-header .col.desc {
  flex: 1;
  min-width: 200px;
}

.table-header .col.created {
  width: 120px;
}

.table-body {
  display: flex;
  flex-direction: column;
}

.table-row {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background 0.2s;
}

.table-row:hover {
  background: #f8faff;
}

.table-row.selected {
  background: #e8f4ff;
}

.table-row .col {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  font-size: 14px;
  color: #333;
}

.table-row .col.checkbox {
  width: 40px;
}

.table-row .col.index {
  width: 60px;
  justify-content: center;
  font-weight: 500;
}

.table-row .col.title {
  flex: 1;
  min-width: 200px;
  font-weight: 500;
}

.table-row .col.title.clickable {
  color: #1e90ff;
  cursor: pointer;
  text-decoration: underline;
}

.table-row .col.desc {
  flex: 1;
  min-width: 200px;
  color: #666;
}

.table-row .col.created {
  width: 120px;
  color: #999;
  font-size: 13px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  width: 800px;
}

/* 마일스톤 섹션 */
.milestone-section {
  width: 800px;
  margin-top: 40px;
  padding-top: 40px;
  border-top: 2px solid #e0e0e0;
}

.milestone-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.milestone-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.milestone-list {
  background: #fff;
  border: 1px solid #dbf4ff;
  border-radius: 12px;
  overflow: hidden;
}

.milestone-table-header {
  display: flex;
  align-items: center;
  background: #f8faff;
  font-weight: 600;
  font-size: 14px;
  color: #555;
  border-bottom: 2px solid #dbf4ff;
  padding: 12px 20px;
}

.milestone-col {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.milestone-col.checkbox {
  width: 40px;
}

.milestone-col.order {
  width: 60px;
  justify-content: center;
}

.milestone-col.title {
  flex: 1;
  min-width: 180px;
}

.milestone-col.desc {
  flex: 1;
  min-width: 180px;
}

.milestone-col.date {
  width: 120px;
}

.milestone-table-body {
  display: flex;
  flex-direction: column;
}

.milestone-row {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background 0.2s;
}

.milestone-row:hover {
  background: #f8faff;
}

.milestone-row.selected {
  background: #e8f4ff;
}

.milestone-row .milestone-col {
  font-size: 14px;
  color: #333;
}

.milestone-row .milestone-col.order {
  font-weight: 500;
}

.milestone-row .milestone-col.title {
  font-weight: 500;
}

.milestone-row .milestone-col.desc {
  color: #666;
}

.milestone-row .milestone-col.date {
  color: #999;
  font-size: 13px;
}

.milestone-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
}
</style>