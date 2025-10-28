<template>
  <div class="problem-detail-page">
    <!-- 상단 네비 -->
    <div class="top-row">
      <BackButton text="목록으로 돌아가기" to="/coding-problems" />
    </div>
    <div><TabTitle :title="problem?.problemTitle || '문제 상세'" /></div>

    <!-- 문제 제목 & 메타 -->
    <div class="problem-header" v-if="problem">
      <div class="problem-meta">
        <span class="problem-date">{{ problem.createdAt }} 등록됨</span>

        <div class="badge-row">
          <div class="platform-tag" :style="{ background: platformStyle }">
            <span class="tag-text">{{ platformLabel }}</span>
          </div>
          <div class="difficulty-tag" :style="{ background: difficultyStyle }">
            <span class="tag-text">{{ difficultyLabel }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 문제 상세 토글 -->
    <div class="problem-detail-section" v-if="problem">
      <div class="detail-toggle" @click="isDetailOpen = !isDetailOpen">
        <div class="toggle-left">
          <span class="toggle-text">문제 자세히보기</span>
        </div>
        <el-icon :class="{ rotated: isDetailOpen }" class="toggle-icon">
          <ArrowDown />
        </el-icon>
      </div>

      <el-collapse-transition>
        <div v-show="isDetailOpen" class="detail-content">
          <div class="detail-section">
            <h3>문제</h3>
            <p>{{ problem.content }}</p>
          </div>
          <div class="detail-section">
            <h3>입력</h3>
            <p>{{ problem.input }}</p>
          </div>
          <div class="detail-section">
            <h3>출력</h3>
            <p>{{ problem.output }}</p>
          </div>
          <div class="detail-section">
            <h3>제한사항</h3>
            <p>{{ problem.constraints }}</p>
          </div>
          <div class="detail-section">
            <h3>문제 링크</h3>
            <a :href="problem.problemUrl" target="_blank" rel="noopener noreferrer" class="problem-link">
              {{ problem.problemUrl }}
              <el-icon><Link /></el-icon>
            </a>
          </div>
        </div>
      </el-collapse-transition>
    </div>

    <!-- 풀이 목록 섹션 -->
    <div class="solution-section">
      <div class="solution-header-row">
        <div class="left">
          <h2 class="section-title">문제 풀이 목록</h2>
          <PostCount :count="solutions.length" label="풀이글" />
        </div>
        <div class="right">
          <CustomButton width="200px" iconSize="14" class="write-button" @click="handleWriteSolution">
            + 글 작성하기
          </CustomButton>
        </div>
      </div>

      <!-- 페이지 인포 배너 -->
      <div class="banner-wrap">
        <PageInfoBanner
          title="코테 풀이, 이제 혼자만 보지 마세요!"
          subtitle="AI가 리뷰하고, 코알라들과 함께 성장합니다 🐨"
          :image="bannercoding"
        />
      </div>

      <!-- 풀이 글 없을 때 -->
      <div v-if="solutions.length === 0" class="no-solutions">
        <div class="empty-robot">
          <el-icon :size="120"><DocumentDelete /></el-icon>
        </div>
        <h3>첫 풀이글을 등록해보세요!~ 🐨</h3>
      </div>

      <!-- 풀이 글 리스트 -->
      <div v-else class="solution-list">
        <PostListItem
          v-for="s in solutions"
          :key="s.postId"
          :id="s.postId"
          :title="s.postTitle"
          :nickname="s.nickname"
          :rankName="s.memberRank"
          :createdAt="s.createdAt"
          :status="s.status"
          :likeCount="s.likeCount"
          :commentCount="s.commentCount"
          @click="handleSolutionClick(s.postId)"
          class="solution-list-item"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowDown, Link, DocumentDelete } from '@element-plus/icons-vue'
import BackButton from '@/components/common/BackButton.vue'
import TabTitle from '@/components/common/TabTitle.vue'
import PageInfoBanner from '@/components/common/PageInfoBanner.vue'
import PostCount from '@/components/common/PostCount.vue'
import PostListItem from '@/components/common/PostListItem.vue'
import CustomButton from '@/components/common/CustomButton.vue'
import bannercoding from '@/assets/images/robot.png'
import coreApi from '@/api/coreApi'

const route = useRoute()
const router = useRouter()
const problemId = Number(route.params.problemId)
const isDetailOpen = ref(false)
const problem = ref(null)
const solutions = ref([])

/* 플랫폼/난이도 */
const platformLabel = computed(() => {
  switch (problem.value?.platform) {
    case 'BOJ': return '백준'
    case 'PGS': return '프로그래머스'
    case 'ETC': return '리트코드'
    default: return problem.value?.platform || ''
  }
})
const platformStyle = computed(() => {
  switch (problem.value?.platform) {
    case 'BOJ': return 'linear-gradient(135deg, #0BB0FF, #1CCAFF)'
    case 'PGS': return 'linear-gradient(135deg, #66cc8a, #82d09a)'
    case 'ETC': return 'linear-gradient(135deg, #C96C6C, #E57B7B)'
    default: return '#bdbebe'
  }
})
const difficultyLabel = computed(() => problem.value?.difficulty || '난이도 미지정')
const difficultyStyle = computed(() => '#bdbebe')

/* API 호출 */
const fetchProblemDetail = async () => {
  try {
    const { data } = await coreApi.get(`/coding-problem/posts/${problemId}`)
    problem.value = data
  } catch (err) {
    console.error('문제 상세 조회 실패:', err)
  }
}

const fetchSolutions = async () => {
  try {
    const { data } = await coreApi.get(`/coding-problem/${problemId}/posts`, {
      params: { page: 0, size: 100 }
    })
    solutions.value = (data || []).map(s => ({
      postId: s.postId,
      postTitle: s.postTitle,
      nickname: s.nickname,
      memberRank: s.memberRank,
      createdAt: s.createdAt,
      visibility : s.visibility,
      likeCount: s.likeCount,
      commentCount: s.commentCount
    }))
  } catch (err) {
    console.error('문제 풀이 목록 조회 실패:', err)
  }
}

/* 이벤트 */
const handleWriteSolution = () => {
  if (!problem.value) {
    alert('문제 정보를 불러오는 중입니다.')
    return
  }

  // problemId를 경로에 포함하여 전달
  router.push({
    path: `/coding-problems/${problemId}/solutions/new`,
    query: {
      problemTitle: problem.value.problemTitle
    }
  })
}

const handleSolutionClick = (id) => {
  router.push(`/coding-problems/${problemId}/solutions/${id}`)
}

/* 마운트 시 */
onMounted(() => {
  if (!problemId || isNaN(problemId)) {
    alert('잘못된 접근입니다.')
    router.push('/coding-problems')
    return
  }
  
  fetchProblemDetail()
  fetchSolutions()
})
</script>

<style scoped>
.problem-detail-page {
  max-width: 1024px;
  margin: 0 auto;
  padding: 28px 16px;
  font-family: 'Noto Sans KR', sans-serif;
  color: #303133;
}

.top-row {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 8px;
}

.problem-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 18px 0 26px;
}

.problem-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.badge-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.platform-tag,
.difficulty-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  padding: 0 10px;
  border-radius: 20px;
}

.difficulty-tag {
  background-color: #bdbebe;
}

.tag-text {
  color: white;
  font-weight: 700;
  font-size: 11px;
  font-family: 'Noto Sans KR', sans-serif;
}

.problem-detail-section {
  background: #fff;
  border: 1px solid #DCDFE6;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 28px;
}
.detail-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  cursor: pointer;
  user-select: none;
}
.toggle-text {
  font-size: 16px;
  font-weight: 700;
  color: #303133;
}
.el-icon {
  transition: transform 0.28s ease;
}
.el-icon.rotated {
  transform: rotate(180deg);
}
.detail-content {
  padding: 18px;
  border-top: 1px solid #EBEEF5;
  background: #f7fbff;
}
.detail-section + .detail-section {
  margin-top: 16px;
}
.detail-section h3 {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 8px;
}
.detail-section p {
  margin: 0;
  color: #606266;
  line-height: 1.6;
}
.banner-wrap {
  margin-bottom: 22px;
  display: flex;
  justify-content: center;
}

.solution-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.solution-header-row .right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.write-button {
  margin-left: auto;
}
</style>
