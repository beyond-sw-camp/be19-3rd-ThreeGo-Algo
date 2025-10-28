<template>
  <div v-if="visible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h3>문제 선택</h3>

      <!-- 검색/필터 영역 -->
      <div class="filter-bar">
        <select v-model="selectedCategory" @change="fetchProblems">
          <option v-for="item in categoryItems" :key="item.value" :value="item.value">
            {{ item.label }}
          </option>
        </select>

        <input
          type="text"
          v-model="keyword"
          placeholder="문제명을 검색"
          @keyup.enter="fetchProblems"
        />
        <button @click="fetchProblems">검색</button>
      </div>

      <!-- 문제 카드 목록 -->
      <div class="problem-grid">
        <div
          v-for="problem in problems"
          :key="problem.problemId"
          class="problem-card"
          :class="{ selected: selectedProblem?.problemId === problem.problemId }"
          @click="selectProblem(problem)"
        >
          <strong>{{ problem.problemTitle }}</strong>
          <div>플랫폼: {{ problem.platform }}</div>
          <div>난이도: {{ problem.difficulty }}</div>
          <div>게시물 수: {{ problem.postCount }}</div>
        </div>

        <div v-if="!loading && problems.length === 0" class="no-data">
          등록된 문제가 없습니다
        </div>
      </div>

      

      <!-- 확인 버튼 -->
      <div class="modal-actions">
        <button @click="confirmSelection">확인</button>
        <button @click="closeModal">닫기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import coreApi from '@/api/coreApi'

const props = defineProps({
  visible: { type: Boolean, default: false }
})
const emit = defineEmits(['update:visible', 'select'])

const problems = ref([])
const keyword = ref('')
const selectedCategory = ref('ALL')
const loading = ref(false)
const selectedProblem = ref(null)
const page = ref(0)
const size = ref(20)
const totalPages = ref(1)

const categoryItems = [
  { value: 'ALL', label: '전체' },
  { value: 'PGS', label: '프로그래머스' },
  { value: 'BOJ', label: '백준' },
  { value: 'ETC', label: '리트코드' },
]

const fetchProblems = async () => {
  loading.value = true
  try {
    const params = {
      keyword: keyword.value || null,
      platform: selectedCategory.value === 'ALL' ? null : selectedCategory.value,
      sortBy: 'createdAt',
      page: page.value,
      size: size.value
    }
    const { data, headers } = await coreApi.get('/coding-problem/posts', { params })
    problems.value = data || []
    totalPages.value = headers['x-total-pages'] ? Number(headers['x-total-pages']) : 1
  } catch (err) {
    console.error('문제 목록 불러오기 실패:', err)
  } finally {
    loading.value = false
  }
}

const selectProblem = (problem) => {
  selectedProblem.value = problem
}

const confirmSelection = () => {
  if (selectedProblem.value) {
    emit('select', selectedProblem.value)
    emit('update:visible', false)
  } else {
    alert('문제를 선택해주세요')
  }
}

const closeModal = () => emit('update:visible', false)

const prevPage = () => {
  if (page.value > 0) {
    page.value--
    fetchProblems()
  }
}

const nextPage = () => {
  if (page.value + 1 < totalPages.value) {
    page.value++
    fetchProblems()
  }
}

watch([keyword, selectedCategory], () => {
  page.value = 0
  fetchProblems()
})

onMounted(() => fetchProblems())
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  width: 700px;
  max-height: 80vh;
  overflow-y: auto;
}
.filter-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.problem-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 12px;
}
.problem-card {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}
.problem-card:hover {
  background-color: #f0faff;
}
.problem-card.selected {
  border-color: #007bff;
  background-color: #e6f2ff;
}
.modal-actions {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 12px 0;
}
.no-data {
  text-align: center;
  color: #888;
  padding: 16px 0;
}
</style>
