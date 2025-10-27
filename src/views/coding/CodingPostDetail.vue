<template>
    <div class="solution-detail-page">

    <!-- 문제 정보 배너 -->
    <div class="problem-banner">
        <span class="banner-label">
        <span class="problem-name">{{ problemTitle }}</span>에 대한 코딩풀이 </span>
    </div>
    
    <!-- 뒤로가기 -->
    <BackButton text="목록으로 돌아가기" to="/codingProblemList" />

    <!-- 게시물 헤더 -->
    <div class="post-header">
        <h1 class="post-title">{{ postTitle }}</h1>
        <MiniProfile :nickname="nickname" :rankName="memberRank" />
        <span class="post-date">{{ createdAt }}</span>
    </div>

    <!-- 게시물 내용 -->
    <div class="post-content-section">
        <div v-html="postContent" class="post-content"></div>
    </div>

    <!-- AI 피드백 섹션 -->
    <div class="ai-feedback-section">
        <h2 class="section-title">AI 피드백</h2>

        <!-- AI 피드백 로딩 중 -->
        <div v-if="isAiLoading" class="ai-loading">
        
        <div class="loading-spinner">
            <el-icon class="is-loading" :size="60" color="#0AA2EB">
            <Loading />
            </el-icon>
        </div>
        <p class="loading-text">
            AI가 풀이를 열심히 분석하고 있어요 🤖<br />
            조금만 기다려주세요, 곧 피드백을 드릴게요!
        </p>
        </div>

        <!-- AI 피드백 완료 -->
        <div v-else class="ai-feedback-content">
        <!-- 시간 복잡도 -->
        <div class="feedback-card">
            <div class="card-header">
            <h3>⏱️ 시간 복잡도</h3>
            </div>
            <div class="card-content">
            <p class="big-o-badge">{{ aiBigO }}</p>
            </div>
        </div>

        <!-- 잘한 점 -->
        <div class="feedback-card good">
            <div class="card-header">
            <h3>👍 잘한 점</h3>
            </div>
            <div class="card-content">
            <ul>
                <li v-for="(item, index) in aiGood" :key="index">{{ item }}</li>
            </ul>
            </div>
        </div>

        <!-- 개선할 점 -->
        <div class="feedback-card bad">
            <div class="card-header">
            <h3>💡 개선할 점</h3>
            </div>
            <div class="card-content">
            <ul>
                <li v-for="(item, index) in aiBad" :key="index">{{ item }}</li>
            </ul>
            </div>
        </div>

        <!-- 개선 방향 -->
        <div class="feedback-card plan">
            <div class="card-header">
            <h3>🚀 개선 방향</h3>
            </div>
            <div class="card-content">
            <p>{{ aiPlan }}</p>
            </div>
        </div>
        </div>
    </div>

    <!-- 오른쪽 사이드바 -->
    <div class="right-sidebar">
        <!-- 다른 풀이 목록 -->
        <div class="other-solutions">
        <h3 class="sidebar-title">더 많은 <span class="highlight">{{ problemTitle }}</span> 풀이글 보기</h3>
        
        <div class="solution-list">
            <PostListItem
            v-for="solution in otherSolutions"
            :key="solution.id"
            :id="solution.id"
            :title="solution.title"
            :nickname="solution.nickname"
            :rankName="solution.rankName"
            :createdAt="solution.createdAt"
            :likeCount="solution.likeCount"
            :commentCount="solution.commentCount"/>
        </div>
        </div>

        <!-- AI 피드백 요청 카드 -->
        <div class="ai-request-card">
        <div class="koala-background"></div>
        <CustomButton
          variant="primary"
          height="md"
          width="100%"
          class="action-button"
          @click="handleRequestAiFeedback"
        >
          풀이글 작성하러 가기
        </CustomButton>
      </div>
    </div>

    <!-- 댓글 섹션 -->
    <div class="comment-wrapper">
      <h2 class="section-title">댓글 {{ commentCount }}</h2>
      <Comment
        :comments="comments"
        :currentUser="currentUser"
        @submit-comment="handleSubmitComment"
        @submit-reply="handleSubmitReply"
        @edit-comment="handleEditComment"
        @delete-comment="handleDeleteComment"
        @edit-reply="handleEditReply"
        @delete-reply="handleDeleteReply"
        @report-comment="handleReportComment"
        @report-reply="handleReportReply"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Loading } from '@element-plus/icons-vue'
import BackButton from '@/components/common/BackButton.vue'
import MiniProfile from '@/components/common/MiniProfile.vue'
import CustomButton from '@/components/common/CustomButton.vue'
import PostListItem from '@/components/common/PostListItem.vue'
import Comment from '@/components/common/Comment.vue'

import { useRouter } from 'vue-router'

const router = useRouter()

// Props 정의
const props = defineProps({
  problemTitle: {
    type: String,
    default: '두 수의 합'
  },
  problemPlatform: {
    type: String,
    default: 'BOJ'
  },
  problemDifficulty: {
    type: String,
    default: '실버3'
  },
  postTitle: {
    type: String,
    default: '입출력의 시작, 두 수를 더해보자 (A+B 풀이)'
  },
  postContent: {
    type: String,
    default: ''
  },
  aiBigO: {
    type: String,
    default: 'O(1)'
  },
  aiGood: {
    type: Array,
    default: () => []
  },
  aiBad: {
    type: Array,
    default: () => []
  },
  aiPlan: {
    type: String,
    default: ''
  },
  commentCount: {
    type: Number,
    default: 0
  },
  likeCount: {
    type: Number,
    default: 0
  },
  nickname: {
    type: String,
    default: '리아이긴'
  },
  memberRank: {
    type: String,
    default: '코알못'
  },
  createdAt: {
    type: String,
    default: '2025.07.13 14:06'
  }
})

// 상태
const isAiLoading = ref(true)

// 더미 데이터
const postContent = ref(`
  <p>오늘은 백준의 가장 기본 문제인데, 알고리즘의 첫걸음인 A+B (1000번) 문제를 풀어보려고 해요.</p>
  <p>정말 간단한 문제지만 입출력 형식을 정확하게 이해하는 게 중요한 문제입니다. ^^</p>
  <br>
  <pre><code>import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int A = sc.nextInt();
        int B = sc.nextInt();
        System.out.println(A + B);
    }
}</code></pre>
  <br>
  <p>사실상 "Hello, Algorithm 🎉" 수준의 문제지만,</p>
  <p>백준 입출력 구조에 익숙해지는 데는 꽤 괜찮은 문제라고 생각합니다!</p>
  <br>
  <p>다들 풀어보세요 ~~</p>
`)

const aiGood = ref([
  '코드 구조가 깔끔하고 읽기 쉽습니다',
  '적절한 변수명을 사용하여 가독성이 좋습니다',
  '입출력 처리가 정확합니다'
])

const aiBad = ref([
  'Scanner 사용 후 close()를 호출하지 않았습니다',
  '예외 처리가 없어 잘못된 입력 시 에러가 발생할 수 있습니다'
])

const aiPlan = ref('Scanner를 try-with-resources 구문으로 감싸서 자동으로 close되도록 하고, 입력값 검증 로직을 추가하면 더 안정적인 코드가 될 것입니다.')

const currentUser = ref({
  id: 1,
  nickname: '김멍띠',
  rankName: '코신'
})

const comments = ref([
  {
    id: 1,
    userId: 2,
    nickname: '라이언',
    rankName: '코잘알',
    content: '코테 준비가 막막했는데 공유 감사합니다! 감사합니다 많이 배워갑니다 👍👍',
    createdAt: '2025.07.13 18:06',
    replies: [
      {
        id: 101,
        userId: 3,
        nickname: '머스크스',
        rankName: '코알못',
        content: '좋은 내용 감사합니다~',
        createdAt: '2025.07.14 09:12'
      }
    ]
  },
  {
    id: 2,
    userId: 4,
    nickname: '뀨아이',
    rankName: '코뉴비',
    content: '덕분에 이해가 쏙쏙 되었습니다! 감사한다 잘 참고해 갈 것 같어요!',
    createdAt: '2025.11.14 18:12',
    replies: []
  }
])

const otherSolutions = ref([
  {
    id: 2,
    title: '가장 단순하지만 가장 중요하다 — A+B 문제 분석',
    nickname: '안안라이',
    rankName: '코좀알',
    createdAt: '2025.10.13',
    likeCount: 123,
    commentCount: 123
  },
  {
    id: 3,
    title: 'Hello Algorithm! 첫 문제 A+B',
    nickname: '리이긴',
    rankName: '코신',
    createdAt: '2025.10.13',
    likeCount: 123,
    commentCount: 123
  },
  {
    id: 4,
    title: 'A+B로 시작하는 나의 코딩 여정 📚',
    nickname: '하이긴',
    rankName: '코알못',
    createdAt: '2025.10.13',
    likeCount: 123,
    commentCount: 123
  }
])

// AI 피드백 로딩 시뮬레이션
onMounted(() => {
  setTimeout(() => {
    isAiLoading.value = false
  }, 3000)
})

// 이벤트 핸들러
const handleRequestAiFeedback = () => {
  router.push(`/codingpost`)
}

const handleSubmitComment = (data) => {
  console.log('댓글 작성:', data)
}

const handleSubmitReply = (data) => {
  console.log('답글 작성:', data)
}

const handleEditComment = (data) => {
  console.log('댓글 수정:', data)
}

const handleDeleteComment = (commentId) => {
  console.log('댓글 삭제:', commentId)
}

const handleEditReply = (data) => {
  console.log('답글 수정:', data)
}

const handleDeleteReply = (data) => {
  console.log('답글 삭제:', data)
}

const handleReportComment = (comment) => {
  console.log('댓글 신고:', comment)
}

const handleReportReply = (reply) => {
  console.log('답글 신고:', reply)
}
</script>

<style scoped>
.solution-detail-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 24px;
  font-family: 'Noto Sans KR', sans-serif;
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 40px;
  position: relative;
}

/* 왼쪽 메인 컨텐츠 */
.solution-detail-page > *:not(.right-sidebar) {
  grid-column: 1;
}

.right-sidebar {
  grid-column: 2;
  grid-row: 1 / span 10;
}

/* 문제 배너 */
.problem-banner {
  margin: 24px 0 16px;
}

.banner-label {
  font-size: 20px;
  font-weight: 400;
  color: #606266;
  line-height: 1.5;
}

.problem-name {
  color: #0AA2EB;
  font-weight: 600;
}

/* 게시물 헤더 */
.post-header {
  margin: 32px 0;
}

.post-title {
  font-size: 28px;
  font-weight: 700;
  color: #303133;
  margin-bottom: 16px;
  line-height: 1.4;
}

.post-date {
  font-size: 13px;
  color: #909399;
  margin-left: 12px;
}

/* 게시물 내용 */
.post-content-section {
  background: #fff;
  border: 1px solid #E4E7ED;
  border-radius: 8px;
  padding: 32px;
  margin-bottom: 40px;
  min-height: 400px;
}

.post-content {
  font-size: 16px;
  line-height: 1.8;
  color: #303133;
}

.post-content pre {
  background: #F5F7FA;
  border: 1px solid #DCDFE6;
  border-radius: 6px;
  padding: 16px;
  overflow-x: auto;
  margin: 16px 0;
}

.post-content code {
  font-family: 'Courier New', monospace;
  font-size: 16px;
  color: #E83E8C;
}

.post-content pre code {
  color: #303133;
}

/* AI 피드백 섹션 */
.ai-feedback-section {
  background: #fff;
  border: 1px solid #E4E7ED;
  border-radius: 8px;
  padding: 32px;
  margin-bottom: 40px;
}

.section-title {
  font-size: 22px;
  font-weight: 700;
  color: #303133;
  margin-bottom: 24px;
}

/* AI 로딩 */
.ai-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  gap: 20px;
}

.koala-image-center {
  width: 200px;
  height: 200px;
  object-fit: contain;
}

.loading-spinner {
  margin-bottom: 0;
}

.loading-text {
  font-size: 16px;
  color: #606266;
  text-align: center;
  line-height: 1.6;
}

/* AI 피드백 카드 */
.ai-feedback-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.feedback-card {
  background: #F8F9FA;
  border: 1px solid #E4E7ED;
  border-radius: 8px;
  padding: 20px;
}

.feedback-card.good {
  background: #F0F9FF;
  border-color: #BAE7FF;
}

.feedback-card.bad {
  background: #FFF7E6;
  border-color: #FFD591;
}

.feedback-card.plan {
  background: #F6FFED;
  border-color: #B7EB8F;
}

.card-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 12px;
}

.card-content {
  font-size: 15px;
  color: #606266;
  line-height: 1.6;
}

.big-o-badge {
  display: inline-block;
  background: #0AA2EB;
  color: #fff;
  padding: 2px 16px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
}

.card-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.card-content li {
  padding: 8px 0;
  padding-left: 20px;
  position: relative;
}

.card-content li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #0AA2EB;
  font-weight: 700;
}

/* 오른쪽 사이드바 */
.right-sidebar {
  position: sticky;
  top: 24px;
  height: fit-content;
}

.other-solutions {
  background: #fff;
  border: 1px solid #E4E7ED;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.sidebar-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 16px;
}

.highlight {
  color: #0AA2EB;
}

.solution-list {
  display: flex;
  flex-direction: column;
}

/* AI 요청 카드 */
.ai-request-card {
  
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  min-height: 300px;
  overflow: hidden;
}

.koala-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/images/coding_feedback.png');
  background-size: 70%;
  background-position: center 20px;
  background-repeat: no-repeat;
  z-index: 0;
}

.action-button {
  position: relative;
  z-index: 1;
}

/* 댓글 섹션 */
.comment-wrapper {
  grid-column: 1 / -1;
  background: #fff;
  border: 1px solid #E4E7ED;
  border-radius: 8px;
  padding: 32px;
  margin-top: 40px;
}

/* 반응형 */
@media (max-width: 1200px) {
  .solution-detail-page {
    grid-template-columns: 1fr;
  }

  .right-sidebar {
    grid-column: 1;
    grid-row: auto;
    position: static;
  }

  .comment-wrapper {
    grid-column: 1;
  }
}

@media (max-width: 768px) {
  .post-title {
    font-size: 22px;
  }

  .post-content-section {
    padding: 20px;
  }

  .ai-feedback-section {
    padding: 20px;
  }

  .comment-wrapper {
    padding: 20px;
  }
}
</style>