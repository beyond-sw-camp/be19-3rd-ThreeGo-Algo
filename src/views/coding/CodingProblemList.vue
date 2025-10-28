<template>
  <div class="problem-list-page">
    <!-- 상단 제목 -->
    <TabTitle title="코딩 문제 목록" />

    <div class="spacer"></div>

    <!-- 카테고리 탭 -->
    <TabMenu
      :items="categoryItems"
      :selected="selectedCategory"
      @click="handleCategoryChange"
      @onClick="handleCategoryChange"
    />

    <div class="divider"></div>

    <!-- 필터/검색 영역 -->
    <div class="filter-bar">
      <Select
        :options="sortOptions"
        placeholder="정렬 기준"
        :value="selectedSort"
        @change="handleSortChange"
        @onSelect="handleSortChange"
      />
      <div class="search-wrapper">
        <SearchBar
          placeholder="문제명을 검색해보세요"
          button-text="검색"
          v-model="keyword"
          @search="fetchProblems"
        />
      </div>
    </div>

    <!-- 문제 카드 목록 -->
    <div class="problem-grid">
      <ProblemCard
      v-for="problem in problems"
      :key="problem.problemId"
      :platform="problem.platform"
      :difficulty="problem.difficulty"
      :problem-title="problem.problemTitle"
      :post-count="problem.postCount"
      :link="problem.problemUrl"
      @click="handleCardClick(problem.problemId)" />
    </div>

    <!-- 로딩 -->
    <div v-if="loading" class="loading">
      <el-empty description="문제 목록을 불러오는 중입니다..." />
    </div>

    <!-- 데이터 없을 때 -->
    <div v-if="!loading && problems.length === 0" class="no-data">
      <el-empty description="등록된 문제가 없습니다" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import coreApi from '@/api/coreApi'
import TabMenu from '@/components/common/TabMenu.vue'
import Select from '@/components/common/CustomSelect.vue'
import ProblemCard from '@/components/coding/ProblemCard.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import TabTitle from '@/components/common/TabTitle.vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const problems = ref([])
const keyword = ref('')
const selectedCategory = ref('ALL')
const selectedSort = ref('createdAt')
const loading = ref(false)

// ✅ 플랫폼 탭 (백엔드 Platform enum 기반)
const categoryItems = [
  { value: 'ALL', label: '전체' },
  { value: 'PGS', label: '프로그래머스' },
  { value: 'BOJ', label: '백준' },
  { value: 'ETC', label: '리트코드' },
]

// ✅ 정렬 옵션
const sortOptions = [
  { label: '최신순', value: 'createdAt' },
  { label: '게시글 많은 순', value: 'postCount' },
  { label: '난이도 낮은 순', value: 'difficultyAsc' },
  { label: '난이도 높은 순', value: 'difficultyDesc' },
]

function handleCardClick(problemId) {
  router.push(`/coding-problems/${problemId}/solutions/`)
}

// ✅ 문제 목록 조회 API
async function fetchProblems() {
  loading.value = true
  try {
    const params = {
      keyword: keyword.value || null,
      platform: selectedCategory.value === 'ALL' ? null : selectedCategory.value,
      sortBy: selectedSort.value,
      page: 0,
      size: 100,
    }

    const { data } = await coreApi.get('/coding-problem/posts', { params })
    problems.value = data || []
  } catch (err) {
    console.error('문제 목록 불러오기 실패:', err)
  } finally {
    loading.value = false
  }
}

// ✅ 카테고리 변경
function handleCategoryChange(value) {
  console.log('카테고리 변경됨:', value)
  selectedCategory.value = value?.value || value // ✅ TabMenu가 객체/문자열 둘 다 가능
  fetchProblems()
}

// ✅ 정렬 변경
function handleSortChange(value) {
  console.log('정렬 기준 변경됨:', value)
  selectedSort.value = value?.value || value
  fetchProblems()
}

function handleSearch() {
  fetchProblems()
}

onMounted(() => {
  fetchProblems()
})
</script>

<style scoped>
.problem-list-page {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 40px 24px 60px;
  font-family: 'Noto Sans KR', sans-serif;
}

/* 카테고리 탭 */
.category-tabs {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 30px;
}

/* 필터 & 검색 */
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  gap: 12px;
}

.search-wrapper {
  flex-grow: 1;
  max-width: 400px;
}

/* 카드 그리드 */
.problem-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 28px 22px;
  justify-items: center;
}

/* 로딩/없을 때 */
.loading,
.no-data {
  margin-top: 60px;
  display: flex;
  justify-content: center;
}

.spacer {
  height: 36px;
}

.divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 16px 0;
}
</style>
