<template>
  <div class="post-detail-page">

    <!-- 상단: 뒤로가기 + 타이틀 -->
    <div class="post-header">
      
      <div class="post-info">
        <!-- <h1 class="post-title">{{ postTitle }}</h1> -->
         <!-- <h1 class="post-title">{{ post.postTitle }}</h1> -->
         <div><TabTitle title="두 수의 합" /></div>
        <div class="post-meta">
          <!-- <span class="problem-title">문제: {{ problemTitle }}</span>
          <span class="problem-platform">플랫폼: {{ problemPlatform }}</span>
          <span class="problem-difficulty">난이도: {{ problemDifficulty }}</span> -->
          <span class="problem-title">문제: {{ post.problemTitle }}에 대한 코딩풀이</span>
          
<!-- <span class="problem-platform">플랫폼: {{ post.problemPlatform }}</span>
<span class="problem-difficulty">난이도: {{ post.problemDifficulty }}</span> -->
        </div>
        <BackButton text="목록으로 돌아가기" to="/codingProblemList"/>
      </div>
      
    </div>

    <!-- 본문: 좌우 2단 구성 -->
    <div class="post-body">
      <!-- 왼쪽: 작성 내용 + AI 피드백 -->
      <div class="post-left">
        <div class="post-content">
          <div v-html="postContent"></div>
        </div>

        <!-- ✅ AI 피드백 영역 -->
        <div class="ai-feedback">
          <h2>코알라 피드백 🐨</h2>

          <div class="feedback-item">
            <h3>📈 시간 복잡도</h3>
            <p>{{ aiBigO || '-' }}</p>
          </div>

          <div class="feedback-item">
            <h3>👍 잘한 점</h3>
            <p>{{ aiGood || '-' }}</p>
          </div>

          <div class="feedback-item">
            <h3>👎 아쉬운 점</h3>
            <p>{{ aiBad || '-' }}</p>
          </div>

          <div class="feedback-item">
            <h3>🚀 개선 계획</h3>
            <p>{{ aiPlan || '-' }}</p>
          </div>
        </div>
      </div>

      <!-- 오른쪽: AI 캐릭터 + 기타 정보 -->
      <div class="post-right">
        <div class="ai-koala-card">
          <img src="@/assets/images/coding_feedback.png" alt="AI Koala" class="koala-img" />
          <p class="koala-quote">
            “오늘도 열심히 분석 중이에요!” 🧠✨
          </p>
        </div>

        <div class="extra-info">
          <p><strong>댓글 수:</strong> {{ commentCount }}</p>
          <p><strong>좋아요 수:</strong> {{ likeCount }}</p>
          <p><strong>제목:</strong> {{ problemTitle }} </p>
          <p><strong>작성일:</strong> {{ createdAt }}</p>
        </div>
      </div>
    </div>

    <!-- 댓글 섹션 -->
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
</template>

<script setup>
import BackButton from '@/components/common/BackButton.vue'
import TabTitle from '@/components/common/TabTitle.vue'
import Comment from '@/components/common/Comment.vue'
import MiniProfile from '@/components/common/MiniProfile.vue'

// props만 사용
const props = defineProps({
  problemTitle: String,
  problemPlatform: String,
  problemDifficulty: String,
  postTitle: String,
  postContent: String,
  aiBigO: String,
  aiGood: String,
  aiBad: String,
  aiPlan: String,
  commentCount: Number,
  likeCount: Number,
  nickname: String,
  memberRank: String,
  createdAt: String
})

// 현재 로그인한 유저 더미 (임시)
const currentUser = {
  id: 1,
  nickname: '알코알라',
  rankName: '코좀알'
}

// 실제 서버 연결 전, 화면 확인용 더미 데이터
const post = {
  problemTitle: 'DFS와 BFS',
  problemPlatform: 'BOJ',
  problemDifficulty: 'Silver II',
  postTitle: 'DFS와 BFS 탐색 로직 정리',
  postContent: `
    <p>그래프 탐색 문제에서 DFS와 BFS의 차이는 다음과 같습니다.</p>
    <pre><code>
    def dfs(v):
        visited[v] = True
        for nxt in graph[v]:
            if not visited[nxt]:
                dfs(nxt)
    </code></pre>
  `,
  aiBigO: 'O(V + E)',
  aiGood: '코드 구조가 명확하고 재귀 함수 사용이 깔끔합니다.',
  aiBad: 'BFS 부분에서 큐 초기화 부분이 중복됩니다.',
  aiPlan: 'BFS 함수 내 큐 로직을 분리하여 재사용성을 높입니다.',
  commentCount: 3,
  likeCount: 7,
  nickname: '코테고릴라',
  memberRank: 'Silver 1',
  createdAt: '2025-10-27'
}

const comments = [
  {
    id: 101,
    userId: 2,
    nickname: '알고리즘러버',
    rankName: '코신',
    content: '정리가 깔끔해서 이해가 잘 돼요!',
    createdAt: '2025-10-27T10:00:00',
    replies: [
      {
        id: 201,
        userId: 1,
        nickname: '코테고릴라',
        rankName: '코알못',
        content: '감사합니다! 😊',
        createdAt: '2025-10-27T11:00:00'
      }
    ]
  },
  {
    id: 102,
    userId: 3,
    nickname: '면접준비중',
    rankName: '코좀알',
    content: 'BFS랑 DFS 코드 예제 더 추가해주세요~',
    createdAt: '2025-10-27T09:00:00',
    replies: []
  }
]

// 댓글 관련 이벤트 핸들러 (임시)
const handleSubmitComment = (data) => console.log('📝 새 댓글 작성:', data)
const handleSubmitReply = (data) => console.log('↪️ 답글 작성:', data)
const handleEditComment = (data) => console.log('✏️ 댓글 수정:', data)
const handleDeleteComment = (id) => console.log('🗑️ 댓글 삭제:', id)
const handleEditReply = (data) => console.log('✏️ 답글 수정:', data)
const handleDeleteReply = (data) => console.log('🗑️ 답글 삭제:', data)
const handleReportComment = (comment) => console.log('🚨 댓글 신고:', comment)
const handleReportReply = (reply) => console.log('🚨 답글 신고:', reply)
</script>

<style scoped>
.post-detail-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px 80px;
  background-color: #f9fbff;
  min-height: 100vh;
}

.post-header {
  display: flex;
  align-items: center;
  gap: 20px;
}

.post-info {
  display: flex;
  flex-direction: column;
}

.post-title {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 8px;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #555;
  font-size: 15px;
}

.problem-title, .problem-platform, .problem-difficulty {
  background-color: #eef4ff;
  color: #4a6aff;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 500;
}

.post-body {
  display: flex;
  gap: 40px;
  margin-top: 20px;
}

.post-left {
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.post-content {
  background-color: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.ai-feedback {
  background-color: #ffffff;
  padding: 20px 24px;
  border-radius: 16px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}

.ai-feedback h2 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
}

.feedback-item {
  margin-bottom: 18px;
}

.feedback-item h3 {
  color: #4a6aff;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
}

.ai-loading {
  color: #888;
  font-style: italic;
}

.post-right {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.ai-koala-card {
  background-color: #eaf3ff;
  padding: 20px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.koala-img {
  width: 100px;
  margin-bottom: 12px;
}

.koala-quote {
  color: #555;
  font-size: 14px;
  font-style: italic;
}

.extra-info {
  background: white;
  border-radius: 12px;
  padding: 16px;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}
</style>
