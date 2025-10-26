<template>
  <div class="study-recruit-page">
    <div class="study-recruit-main">
      <!-- ✅ 페이지 타이틀 -->
      <TabTitle title="스터디 모집" />
      <!-- ✅ 배너 영역 -->
      <div class="banner-wrapper">
        <PageInfoBanner
          title="함께할 코알라를 찾아 성장하세요 🐨🌱"
          subtitle="코딩, 면접 준비해야 하는데… 의지가 부족하신가요?
          동료들을 찾아 같이 열심히 준비해보세요!"
          :image="bannerImage"
          bgColor="#f8fbff"
        />
      </div>

      <!-- ✅ 필터 / 검색 / 버튼 (한 줄) -->
      <div class="filter-search-action">
        <!-- 왼쪽: 필터 탭 (TabMenu 사용) -->
        <TabMenu
          :items="filterTabs"
          :onClick="handleFilterChange"
        />

        <!-- 중앙: 검색창 -->
        <div class="search-center">
          <SearchBar
            v-model="searchKeyword"
            placeholder="스터디명, 내용을 검색해보세요"
            buttonText="검색"
            @search="handleSearch"
          />
        </div>

        <!-- 오른쪽: 모집 버튼 -->
        <CustomButton
          text="+ 스터디 모집하기"
          variant="primary"
          size="md"
          @click="goToCreatePage"
        />
      </div>

      <!-- ✅ 구분선 -->
      <div class="divider"></div>

      <!-- ✅ 카드 리스트 -->
      <div class="cards-container">
        <div v-if="displayedStudies.length > 0" class="card-grid">
          <StudyRecruitCard
            v-for="study in displayedStudies"
            :key="study.id"
            :status="study.status"
            :title="study.title"
            :period="study.period"
            :authorName="study.authorName"
            :rankName="study.rankName"
            :members="study.members"
            :comments="study.comments"
            @click="handleCardClick(study.id)"
          />
        </div>

        <!-- 데이터 없을 때 -->
        <div v-else class="empty-state">
          <p>검색 결과가 없습니다.</p>
        </div>
      </div>

      <!-- ✅ 무한 스크롤 로딩 -->
      <div v-if="isLoading" class="loading-indicator">
        <div class="spinner"></div>
        <p>로딩 중...</p>
      </div>

      <!-- ✅ 데이터 끝 -->
      <div v-if="!hasMore && displayedStudies.length > 0" class="end-message">
        <p>모든 스터디를 확인했습니다.</p>
      </div>
    </div>

    <!-- ✅ Footer (전체 너비) -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import StudyRecruitCard from '@/components/study-recruit/component/StudyRecruitCard.vue'
import TabTitle from '@/components/common/TabTitle.vue'
import TabMenu from '@/components/common/TabMenu.vue'
import PageInfoBanner from '@/components/common/PageInfoBanner.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import CustomButton from '@/components/common/CustomButton.vue'
import Footer from '@/components/common/Footer.vue'
import bannerImage from '@/assets/images/banner_study_recruit.png'

const router = useRouter()

// 상태 관리
const searchKeyword = ref('')
const activeFilter = ref('ALL')
const currentPage = ref(1)
const isLoading = ref(false)
const hasMore = ref(true)

// 필터 탭 (TabMenu 형식)
const filterTabs = [
  { value: 'ALL', label: '전체' },
  { value: 'OPEN', label: '모집중' },
  { value: 'CLOSED', label: '모집완료' }
]

// 더미 데이터
const allStudies = ref([
  {
    id: 1,
    status: 'OPEN',
    title: '그래프 탐색 알고리즘 4주 완벽 정복 스터디',
    period: '2025.10.13 - 2025.10.31',
    authorName: '후드라이언',
    rankName: '코뉴비',
    members: 20,
    comments: 0
  },
  {
    id: 2,
    status: 'CLOSED',
    title: 'DP 마스터하기 스터디',
    period: '2025.09.01 - 2025.09.30',
    authorName: '알고마스터',
    rankName: '코좀알',
    members: 15,
    comments: 5
  },
  {
    id: 3,
    status: 'OPEN',
    title: '백준 골드 문제 정복하기',
    period: '2025.10.20 - 2025.11.20',
    authorName: '코딩왕',
    rankName: '코잘알',
    members: 12,
    comments: 3
  },
  {
    id: 4,
    status: 'OPEN',
    title: '프로그래머스 SQL 완전정복',
    period: '2025.10.15 - 2025.11.15',
    authorName: 'SQL마스터',
    rankName: '코좀알',
    members: 8,
    comments: 2
  },
  {
    id: 5,
    status: 'CLOSED',
    title: '자료구조 기초부터 심화까지',
    period: '2025.09.10 - 2025.10.10',
    authorName: '자구왕',
    rankName: '코신',
    members: 25,
    comments: 10
  },
  {
    id: 6,
    status: 'OPEN',
    title: '알고리즘 이론 스터디',
    period: '2025.10.18 - 2025.11.18',
    authorName: '알고리즘러',
    rankName: '코뉴비',
    members: 18,
    comments: 7
  },
  {
    id: 7,
    status: 'OPEN',
    title: '코딩테스트 대비반',
    period: '2025.10.22 - 2025.12.22',
    authorName: '취준생',
    rankName: '코알못',
    members: 30,
    comments: 15
  },
  {
    id: 8,
    status: 'CLOSED',
    title: '트리/그래프 집중 스터디',
    period: '2025.08.01 - 2025.09.01',
    authorName: '그래프맨',
    rankName: '코잘알',
    members: 10,
    comments: 4
  },
  {
    id: 9,
    status: 'OPEN',
    title: '매일 한 문제씩 풀기',
    period: '2025.10.01 - 2025.12.31',
    authorName: '꾸준러',
    rankName: '코뉴비',
    members: 50,
    comments: 20
  }
])

// 필터링된 스터디 목록
const filteredStudies = computed(() => {
  let result = allStudies.value
  if (activeFilter.value !== 'ALL') {
    result = result.filter(study => study.status === activeFilter.value)
  }
  if (searchKeyword.value) {
    result = result.filter(study =>
      study.title.toLowerCase().includes(searchKeyword.value.toLowerCase())
    )
  }
  return result
})

const displayedStudies = computed(() => {
  const itemsPerPage = 9
  const endIndex = currentPage.value * itemsPerPage
  return filteredStudies.value.slice(0, endIndex)
})

const handleScroll = () => {
  const scrollTop = window.scrollY
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  if (scrollTop + windowHeight >= documentHeight - 200) {
    loadMoreStudies()
  }
}

const loadMoreStudies = () => {
  if (isLoading.value || !hasMore.value) return
  const itemsPerPage = 9
  const totalItems = filteredStudies.value.length
  const currentDisplayed = displayedStudies.value.length
  if (currentDisplayed >= totalItems) {
    hasMore.value = false
    return
  }
  isLoading.value = true
  setTimeout(() => {
    currentPage.value++
    isLoading.value = false
    if (displayedStudies.value.length >= totalItems) {
      hasMore.value = false
    }
  }, 500)
}

const handleFilterChange = (item) => {
  activeFilter.value = item.value
  currentPage.value = 1
  hasMore.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleSearch = (keyword) => {
  searchKeyword.value = keyword
  currentPage.value = 1
  hasMore.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleCardClick = (studyId) => {
  router.push(`/study-recruit/${studyId}`)
}

const goToCreatePage = () => {
  router.push('/study-recruit/post')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.study-recruit-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.study-recruit-main {
  flex: 1;
  background-color: #fff;
  padding: 50px 20px 60px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* ✅ 배너 */
.banner-wrapper {
  margin-top: 12px;
  margin-bottom: 36px;
  max-width: 1200px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

/* ✅ 필터 / 검색 / 버튼 (한 줄) */
.filter-search-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto 24px;
  padding: 0 20px;
  box-sizing: border-box;
}

.search-center {
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 500px;
}

.divider {
  height: 1px;
  background-color: #e6e6e6;
  margin-bottom: 30px;
  max-width: 1200px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

/* ✅ 카드 영역 */
.cards-container {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto 60px;
  padding: 0 20px;
  box-sizing: border-box;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  row-gap: 26px;
}

.empty-state {
  text-align: center;
  color: #999;
  font-size: 15px;
  padding: 100px 0;
}

.loading-indicator,
.end-message {
  text-align: center;
  color: #888;
  font-size: 14px;
  margin-top: 20px;
}

.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #f0f0f0;
  border-top: 3px solid #0aa2eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 8px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ✅ 반응형 */
@media (max-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .filter-search-action {
    max-width: 100%;
    padding: 0 20px;
  }
}

@media (max-width: 768px) {
  .study-recruit-main {
    padding: 32px 16px 80px;
  }

  .filter-search-action {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    padding: 0;
  }

  .filter-tabs {
    justify-content: center;
    flex-wrap: wrap;
  }

  .search-center {
    max-width: 100%;
  }

  .card-grid {
    grid-template-columns: 1fr;
  }
}
</style>
