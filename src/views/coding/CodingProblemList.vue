<template>
  <div class="problem-list-page">
    <!-- 상단 제목 -->
    <TabTitle title="코딩 문제 목록" />

    <div class="spacer"></div>

    <!-- 카테고리 탭 -->
    <TabMenu
      :items="categoryItems"
      :onClick="handleCategoryChange"
    />

    <div class="divider"></div>

    <!-- 필터/검색 영역 -->
    <div class="filter-bar">
      <Select
        :options="sortOptions"
        placeholder="정렬 기준"
        :onSelect="handleSortChange" />
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
        v-for="problem in filteredProblems"
        :key="problem.id"
        :platform="problem.platform"
        :difficulty="problem.difficulty"
        :problem-title="problem.title"
        :post-count="problem.postCount"
        :link="problem.link"
        @click="handleCardClick(problem)"
      />
    </div>

    <!-- 로딩 -->
    <div v-if="loading" class="loading">
      <el-empty description="문제 목록을 불러오는 중입니다..." />
    </div>

    <!-- 데이터 없을 때 -->
    <div v-if="!loading && filteredProblems.length === 0" class="no-data">
      <el-empty description="등록된 문제가 없습니다" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import TabTitle from '@/components/common/TabTitle.vue'
import TabMenu from '@/components/common/TabMenu.vue'
import ProblemCard from '@/components/coding/ProblemCard.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import Select from '@/components/common/Select.vue'
import axios from '@/plugins/axios.js'

// 상태
const problems = ref([
  {
    id: 1,
    platform: 'BOJ',
    difficulty: '실버3',
    title: '문제 제목 1',
    postCount: 5,
    link: 'https://www.acmicpc.net/problem/1',
  },
  {
    id: 2,
    platform: 'PGS',
    difficulty: '실버1',
    title: '문제 제목 2',
    postCount: 3,
    link: 'https://programmers.co.kr/learn/courses/30/lessons/1',
  },
  {
    id: 3,
    platform: 'ETC',
    difficulty: '브론즈2',
    title: '문제 제목 3',
    postCount: 0,
    link: '',
  },
  {
    id: 4,
    platform: 'BOJ',
    difficulty: '골드5',
    title: '문제 제목 4',
    postCount: 10,
    link: 'https://www.acmicpc.net/problem/2',
  },
  {
    id: 5,
    platform: 'PGS',
    difficulty: '브론즈1',
    title: '문제 제목 5',
    postCount: 2,
    link: 'https://programmers.co.kr/learn/courses/30/lessons/2',
  },
]);
const keyword = ref('')
const selectedCategory = ref('ALL')
const selectedSort = ref('recent')

const loading = ref(false)

// 카테고리 탭 데이터
const categoryItems = [
  { value: 'all', label: '전체' },
  { value: 'PGS', label: '프로그래머스' },
  { value: 'BOJ', label: '백준' },
  { value: 'ETC', label: '리트코드' }
]

// 정렬 옵션
const sortOptions = [
  { label: '최근 등록순', value: 'recent' },
  { label: '풀이 많은 순', value: 'popular' },
  { label: '난이도 낮은 순', value: 'easy' },
  { label: '난이도 높은 순', value: 'hard' },
]

// 문제 데이터 가져오기 (백엔드 API)
async function fetchProblems() {
  loading.value = true
  try {
    const response = await axios.get('/coding-problem/posts', {
      params: {
        keyword: keyword.value,
        platform: selectedCategory.value === 'ALL' ? null : selectedCategory.value,
        sort: selectedSort.value,
      },
    })
    problems.value = response.data
  } catch (error) {
    console.error('문제 목록 불러오기 실패:', error)
  } finally {
    loading.value = false
  }
}

// 정렬 변경 핸들러
function handleSortChange(value) {
  selectedSort.value = value
  fetchProblems()
}

// 카드 클릭 핸들러
function handleCardClick(problem) {
  console.log('문제 클릭:', problem.title)
  // 라우터 이동 가능 (예: 상세 페이지)
  // router.push(`/problems/${problem.id}`)
}

// 필터링된 문제 목록 계산
const filteredProblems = computed(() => {
  if (!keyword.value) return problems.value
  return problems.value.filter((p) =>
    p.title.toLowerCase().includes(keyword.value.toLowerCase())
  )
})

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

/* 카테고리 탭 영역 */
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

/* ✅ 카드 그리드 정렬 */
.problem-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 28px 22px; /* 가로세로 동일한 여백 */
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
  height: 36px; /* 상단 제목과 카테고리 탭 사이의 여백 */
}

.divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 16px 0; /* 구분선의 상하 여백 */
}
</style>

