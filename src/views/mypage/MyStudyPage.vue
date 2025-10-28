<template>
  <div class="my-study-page">
    <!-- 좌측 프로필 -->
    <aside class="left-panel">
        <StudyProfile
          :nickname="userNickname"
          :rankName="userRankName"
          role="member"/>
    </aside>

    <!-- 우측 메인 -->
    <main class="right-panel">
      <MyBanner title="스터디 그룹 공간" />

      <!-- 필터 및 검색 -->
      <div class="filter-section">
        <label class="checkbox-label">
          <input type="checkbox" v-model="showOnlyActive" />
          현재 진행 중인 스터디만 보기
        </label>
        <input
          v-model="searchQuery"
          class="search-input"
          placeholder="검색어를 입력해주세요."
        />
      </div>

      <!-- 스터디 카드 리스트 -->
      <div v-if="studies.length" class="study-list">
        <StudyCard
          v-for="study in filteredStudies"
          :key="study.studyId"
          :id="study.studyId"
          :name="study.studyName"
          :startDate="study.startDate"
          :endDate="study.endDate"
          :nickname="study.leaderName"
          :rankName="'코잘알'"
          :memberCount="study.memberCount"
        />
      </div>

      <!-- 로딩 중 -->
      <div v-else-if="isLoading" class="loading">불러오는 중...</div>

      <!-- 데이터 없음 -->
      <div v-else class="empty">가입한 스터디가 없습니다.</div>

      <!-- 페이지네이션 -->
      <div v-if="studies.length" class="pagination">
        <button :disabled="currentPage === 1" @click="prevPage">‹</button>
        <span>{{ currentPage }}</span>
        <button :disabled="currentPage === totalPages" @click="nextPage">›</button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import coreApi from '@/api/coreApi'
import MyBanner from '@/components/mypage/MyBanner.vue'
import StudyProfile from '@/components/study/StudyProfile.vue'
import StudyCard from '@/components/mypage/StudyCard.vue'

// ✅ 상태값
const studies = ref([])
const searchQuery = ref('')
const showOnlyActive = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)
const isLoading = ref(false)

// ✅ 사용자 정보 (localStorage에서 가져오기)
const userNickname = ref('')
const userRankName = ref('코뉴비')

// ✅ 필터링된 스터디 목록
const filteredStudies = computed(() => {
  const now = new Date()
  return studies.value.filter((s) => {
    const matchSearch = s.studyName.includes(searchQuery.value)
    const matchActive =
      !showOnlyActive.value ||
      (new Date(s.startDate) <= now && now <= new Date(s.endDate))
    return matchSearch && matchActive
  })
})

// ✅ 페이지 이동
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchMyStudies()
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchMyStudies()
  }
}

// ✅ API 연동
const fetchMyStudies = async () => {
  isLoading.value = true
  try {
    const response = await coreApi.get('/study-recruit/my-studies', {
      params: {
        page: currentPage.value - 1, // 백엔드가 0-based
        size: 9, // 한 페이지당 9개
      },
    })

    const data = response.data

    // ✅ 백엔드 응답 구조에 따라 매핑
    studies.value = Array.isArray(data.content) ? data.content : (Array.isArray(data) ? data : [])
    totalPages.value = data.totalPages ?? 1

    console.log('✅ 스터디 목록 조회 성공:', studies.value)
  } catch (error) {
    console.error('❌ 스터디 목록 조회 실패:', error)
  } finally {
    isLoading.value = false
  }
}

// ✅ 사용자 정보 로드
const loadUserInfo = () => {
  const nickname = localStorage.getItem('nickname')
  const rankName = localStorage.getItem('rankName')

  userNickname.value = nickname || '사용자'
  userRankName.value = rankName || '코뉴비'

  console.log('👤 사용자 정보:', userNickname.value, userRankName.value)
}

onMounted(() => {
  loadUserInfo()
  fetchMyStudies()
})
</script>

<style scoped>
/* 🧩 전체 레이아웃 */
.my-study-page {
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
  font-family: 'Noto Sans KR', sans-serif;
}

/* 🧩 좌측 패널 */
.left-panel {
  width: 260px;
  min-height: 100vh;
  background-color: #fff;
  border-right: 1px solid #eaeaea;
  padding: 40px 25px;
  box-sizing: border-box;
}

/* 🧩 우측 메인 */
.right-panel {
  flex: 1;
  padding: 40px 60px;
  background-color: #fafafa;
  box-sizing: border-box;
}

/* 🧱 배너 */
:deep(.my-banner) {
  width: 100%;
  background-color: #e4f5ff;
  border-radius: 6px;
  padding: 16px 24px;
  color: #222;
  font-size: 20px;
  font-weight: 600;
  text-align: left;
  margin-bottom: 24px;
}

/* 🔍 필터 */
.filter-section {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  margin-bottom: 28px;
}

.checkbox-label {
  font-size: 14px;
  color: #555;
  display: flex;
  align-items: center;
  gap: 6px;
  user-select: none;
}

.search-input {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  width: 230px;
  background-color: #fff;
}

/* 🧩 카드 영역 */
.study-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px 24px;
  justify-items: center;
}

/* 🧱 StudyCard 디자인 */
:deep(.study-card) {
  width: 100%;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 22px 24px;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: all 0.2s;
}

:deep(.study-card:hover) {
  transform: translateY(-3px);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

/* 📄 페이지네이션 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  gap: 6px;
}

.pagination button {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 28px;
  height: 28px;
  font-size: 13px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination button:hover:not(:disabled) {
  border-color: #00a8ff;
  color: #00a8ff;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination span {
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background-color: #00a8ff;
  color: #fff;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 로딩/빈 상태 */
.loading,
.empty {
  text-align: center;
  font-size: 15px;
  color: #777;
  margin-top: 60px;
}
</style>
