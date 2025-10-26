<template>
  <div class="problem-detail-page">
    <!-- 상단 네비: 뒤로가기 + 탭 타이틀 -->
    <div class="top-row">
      <BackButton text="목록으로 돌아가기" to="/codingProblemList" />
    </div>
    <div><TabTitle title="두 수의 합" /></div>

    <!-- 문제 제목 & 메타 -->
    <div class="problem-header">
      <div class="problem-meta">
        <span class="problem-date">{{ createdAt }} 등록됨</span>

        <!-- 플랫폼 / 난이도 뱃지 -->
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
    <div class="problem-detail-section">
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
      <p>{{ content }}</p>
    </div>
    <div class="detail-section">
      <h3>입력</h3>
      <p>{{ input }}</p>
    </div>
    <div class="detail-section">
      <h3>출력</h3>
      <p>{{ output }}</p>
    </div>
    <div class="detail-section">
      <h3>제한사항</h3>
      <p>{{ constraints }}</p>
    </div>
    <div class="detail-section">
      <h3>문제 링크</h3>
      <a :href="problemUrl" target="_blank" rel="noopener noreferrer" class="problem-link">
        {{ problemUrl }}
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
        <CustomButton  width="200px" iconSize="14" class="write-button" @click="handleWriteSolution">
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
        :bgColor="'#eaf3ff'"
      />
    </div>

      <div v-if="solutions.length === 0" class="no-solutions">
        <div class="empty-robot">
          <el-icon :size="120"><DocumentDelete /></el-icon>
        </div>
        <h3>코테 풀이, 아직 혼자만 보지 마세요!</h3>
        <p>AI가 리뷰하고, 코멘트들과 함께 성장합니다 🐨</p>
      </div>

      <div v-else class="solution-list">
        <PostListItem
          v-for="s in solutions"
          :key="s.id"
          :id="s.id"
          :title="s.title"
          :nickname="s.nickname"
          :rankName="s.rankName"
          :createdAt="s.date"
          :status="s.status"
          :likeCount="s.likes"
          :commentCount="s.comments"
          @click="handleSolutionClick(s.id)"
          class="solution-list-item"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ArrowDown, Link, DocumentDelete } from '@element-plus/icons-vue'
import BackButton from '@/components/common/BackButton.vue'
import TabTitle from '@/components/common/TabTitle.vue'
import PageInfoBanner from '@/components/common/PageInfoBanner.vue'
import PostCount from '@/components/common/PostCount.vue'
import PostListItem from '@/components/common/PostListItem.vue'
import bannercoding from '@/assets/images/robot.png'
import CustomButton from '@/components/common/CustomButton.vue'

const isDetailOpen = ref(false)

// 플랫폼과 난이도, 실제 API에서 받아올 props 대신, 예시 데이터로 작성
const props = defineProps({
  problemTitle: { type: String, default: '두 수의 합' },
  content: { type: String, default: '두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.' },
  platform: { type: String, default: 'BOJ' },
  difficulty: { type: String, default: '실버3' },
  input: { type: String, default: '첫째 줄에 A와 B가 주어진다. (0 < A, B < 10)' },
  output: { type: String, default: '첫째 줄에 A + B를 출력한다.' },
  constraints: { type: String, default: '시간제한: 2초 / 메모리 제한: 128MB' },
  problemUrl: { type: String, default: 'https://www.acmicpc.net/problem/1000' },
  postCount: { type: Number, default: 3 },
  createdAt: { type: String, default: '2025.07.13 14:06' },
})

/* 플랫폼 라벨 매핑 */
const platformLabel = computed(() => {
    switch (props.platform) {
    case 'BOJ': return '백준'
    case 'PGS': return '프로그래머스'
    case 'ETC': return '리트코드'
    default: return props.platform
  }
})

/* 플랫폼 색상 매핑 (목록 코드 그대로 사용) */
const platformStyle = computed(() => {
  switch (props.platform) {
    case 'BOJ':
      return 'linear-gradient(135deg, #0BB0FF, #1CCAFF)'
    case 'PGS':
      return 'linear-gradient(135deg, #66cc8a, #82d09a)'
    case 'ETC':
      return 'linear-gradient(135deg, #C96C6C, #E57B7B)'
    default:
      return '#bdbebe'
  }
})

/* ✅ 난이도 라벨 매핑 */
const difficultyLabel = computed(() => {
  switch (props.difficulty) {
    case '브론즈5':
    case '브론즈4':
    case '브론즈3':
    case '브론즈2':
    case '브론즈1':
    case '실버5':
    case '실버4':
    case '실버3':
    case '실버2':
    case '실버1':
    case '골드5':
    case '골드4':
    case '골드3':
    case '골드2':
    case '골드1':
    case '플래티넘5':
    case '플래티넘4':
    case '플래티넘3':
    case '플래티넘2':
    case '플래티넘1':
    case '다이아5':
    case '다이아4':
    case '다이아3':
    case '다이아2':
    case '다이아1':
    case '루비5':
    case '루비4':
    case '루비3':
    case '루비2':
    case '루비1':
    case 'Lv.0':
    case 'Lv.1':
    case 'Lv.2':
    case 'Lv.3':
    case 'Lv.4':
    case 'Lv.5':
    case 'EASY':
    case 'MEDIUM':
    case 'HARD':
    case '':
      return props.difficulty
    default:
      return props.difficulty || '난이도 미지정'
  }
})

const difficultyStyle = computed(() => {
  return '#bdbebe';
})

/* 샘플 풀이 데이터 */
const solutions = ref([
  { id: 1, title: '입출력의 시작, 두 수를 더해보자 (A+B 풀이)', nickname: '리아리아리아이야', rankName: '코좀알', date: '2025.10.13', status: '', likes: 123, comments: 123 },
  { id: 2, title: '가장 단순하지만 가장 중요하다 — A+B 문제 분석', nickname: '안안라이', rankName: '코신', date: '2025.10.13', likes: 123, comments: 123 },
  { id: 3, title: 'Hello Algorithm! 첫 문제 A+B', nickname: '리이긴', rankName: '코알못', date: '2025.10.13', status: '', likes: 123, comments: 123 }
])

/* 이벤트 핸들러 */
const handleWriteSolution = () => console.log('풀이 작성하기 클릭')
const handleSolutionClick = (id) => console.log('풀이 상세보기:', id)
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
